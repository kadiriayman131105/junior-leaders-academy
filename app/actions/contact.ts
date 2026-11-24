"use server";

import { headers } from "next/headers";
import { z } from "zod";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import { emailShell, escapeHtml, mailReady, sendParentMail, sendSchoolMail } from "@/lib/mail";
import { tooMany } from "@/lib/rate";
import { levelLabelFr, levelValues, site } from "@/lib/site";
import { lines, toWhatsAppNumber, whatsappLink } from "@/lib/whatsapp";

const catalogs = { fr, en, ar };

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(30)
    .refine((value) => value.replace(/\D/g, "").length >= 8),
  email: z
    .string()
    .trim()
    .max(120)
    .refine((value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)),
  level: z.string().refine((value): value is (typeof levelValues)[number] => (levelValues as readonly string[]).includes(value)),
  area: z.string().trim().max(80),
  message: z.string().trim().max(1000),
  locale: z.enum(["fr", "en", "ar"]),
});

export type FormState = {
  status: "success" | "error";
  code?: "invalid" | "rate" | "send" | "mail";
  whatsapp?: string;
} | null;

function fill(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (String(formData.get("website") || "").trim()) return { status: "success" };

  const parsed = schema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") || "",
    level: formData.get("level"),
    area: formData.get("area") || "",
    message: formData.get("message") || "",
    locale: formData.get("locale") === "en" || formData.get("locale") === "ar" ? formData.get("locale") : "fr",
  });

  if (!parsed.success) return { status: "error", code: "invalid" };

  const data = parsed.data;
  const copy = catalogs[data.locale].contact.form;
  const levelLabel = copy && catalogs[data.locale].contact.levels.find((item) => item.value === data.level)?.label;
  const text = lines([
    copy.waHello,
    `${copy.waParent} ${data.name}`,
    `${copy.waPhone} ${data.phone}`,
    `${copy.waLevel} ${levelLabel || levelLabelFr[data.level]}`,
    data.area ? `${copy.waArea} ${data.area}` : "",
    data.message,
  ]);
  const whatsapp = whatsappLink(text);
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (tooMany(`contact:${ip}`)) return { status: "error", code: "rate", whatsapp };
  if (!mailReady()) return { status: "error", code: "mail", whatsapp };

  const parentLink = `https://wa.me/${toWhatsAppNumber(data.phone)}`;
  const html = emailShell(
    "Nouvelle demande d'inscription",
    `<p><strong>Parent :</strong> ${escapeHtml(data.name)}</p>
     <p><strong>Téléphone :</strong> ${escapeHtml(data.phone)}</p>
     <p><strong>E-mail :</strong> ${escapeHtml(data.email || "—")}</p>
     <p><strong>Niveau :</strong> ${escapeHtml(levelLabelFr[data.level])}</p>
     <p><strong>Quartier :</strong> ${escapeHtml(data.area || "—")}</p>
     <p><strong>Message :</strong><br>${escapeHtml(data.message || "—").replaceAll("\n", "<br>")}</p>
     <p><strong>Langue du site :</strong> ${data.locale}</p>
     <p style="margin-top:20px"><a href="${parentLink}" style="color:#C24E02;font-weight:700">Répondre au parent sur WhatsApp</a></p>`,
  );

  try {
    const sent = await sendSchoolMail({
      subject: oneLine(`Inscription — ${levelLabelFr[data.level]} — ${data.name}`),
      html,
      replyTo: data.email || undefined,
    });
    if (!sent) return { status: "error", code: "send", whatsapp };
  } catch {
    return { status: "error", code: "send", whatsapp };
  }

  if (data.email) {
    const hello = fill(copy.parentHello, { name: data.name });
    const body = fill(copy.parentBody, { level: levelLabel || levelLabelFr[data.level], phone: data.phone });
    try {
      await sendParentMail({
        to: data.email,
        subject: copy.parentSubject,
        html: emailShell(
          escapeHtml(copy.parentSubject),
          `<p>${escapeHtml(hello)}</p><p>${escapeHtml(body)}</p><p><a href="${whatsappLink(catalogs[data.locale].whatsapp.hero)}" style="color:#C24E02;font-weight:700">WhatsApp ${site.phoneDisplay}</a></p>`,
        ),
      });
    } catch {
      // The school already has the request.
    }
  }

  return { status: "success", whatsapp };
}
