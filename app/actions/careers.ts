"use server";

import { headers } from "next/headers";
import { z } from "zod";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import { emailShell, escapeHtml, mailReady, sendSchoolMail } from "@/lib/mail";
import { tooMany } from "@/lib/rate";
import { experienceLabelFr, experienceValues, roleLabelFr, roleValues } from "@/lib/site";
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
  email: z.string().trim().email().max(120),
  role: z.string().refine((value): value is (typeof roleValues)[number] => (roleValues as readonly string[]).includes(value)),
  experience: z
    .string()
    .refine((value): value is (typeof experienceValues)[number] => (experienceValues as readonly string[]).includes(value)),
  message: z.string().trim().max(1500),
  locale: z.enum(["fr", "en", "ar"]),
});

export type CareerState = {
  status: "success" | "error";
  code?: "invalid" | "rate" | "send" | "mail" | "file";
  whatsapp?: string;
} | null;

export async function submitCareer(_prev: CareerState, formData: FormData): Promise<CareerState> {
  if (String(formData.get("website") || "").trim()) return { status: "success" };

  const parsed = schema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    role: formData.get("role"),
    experience: formData.get("experience"),
    message: formData.get("message") || "",
    locale: formData.get("locale") === "en" || formData.get("locale") === "ar" ? formData.get("locale") : "fr",
  });

  if (!parsed.success) return { status: "error", code: "invalid" };
  const data = parsed.data;
  const copy = catalogs[data.locale].careers.form;
  const roleLabel = catalogs[data.locale].careers.roles.find((item) => item.value === data.role)?.label;
  const experienceLabel = catalogs[data.locale].careers.experiences.find((item) => item.value === data.experience)?.label;
  const text = lines([
    copy.waHello,
    `${copy.waName} ${data.name}`,
    `${copy.waPhone} ${data.phone}`,
    `${copy.waEmail} ${data.email}`,
    `${copy.waRole} ${roleLabel || roleLabelFr[data.role]}`,
    `${copy.waExperience} ${experienceLabel || experienceLabelFr[data.experience]}`,
    data.message,
  ]);
  const whatsapp = whatsappLink(text);

  const file = formData.get("cv");
  let attachment: { filename: string; content: Buffer } | undefined;
  if (file instanceof File && file.size > 0) {
    const safeName = file.name.replace(/[^\w.\- ]+/g, "") || "cv";
    if (file.size > 4 * 1024 * 1024 || !/\.(pdf|doc|docx)$/i.test(safeName)) {
      return { status: "error", code: "file", whatsapp };
    }
    attachment = { filename: safeName, content: Buffer.from(await file.arrayBuffer()) };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (tooMany(`career:${ip}`)) return { status: "error", code: "rate", whatsapp };
  if (!mailReady()) return { status: "error", code: "mail", whatsapp };

  const html = emailShell(
    "Nouvelle candidature enseignant",
    `<p><strong>Nom :</strong> ${escapeHtml(data.name)}</p>
     <p><strong>Téléphone :</strong> ${escapeHtml(data.phone)}</p>
     <p><strong>E-mail :</strong> ${escapeHtml(data.email)}</p>
     <p><strong>Cycle :</strong> ${escapeHtml(roleLabelFr[data.role])}</p>
     <p><strong>Expérience :</strong> ${escapeHtml(experienceLabelFr[data.experience])}</p>
     <p><strong>Message :</strong><br>${escapeHtml(data.message || "—").replaceAll("\n", "<br>")}</p>
     <p><strong>CV :</strong> ${attachment ? escapeHtml(attachment.filename) : "non joint"}</p>
     <p><strong>Langue du site :</strong> ${data.locale}</p>
     <p style="margin-top:20px"><a href="https://wa.me/${toWhatsAppNumber(data.phone)}" style="color:#C24E02;font-weight:700">Répondre sur WhatsApp</a></p>`,
  );

  try {
    const sent = await sendSchoolMail({
      subject: `Candidature — ${roleLabelFr[data.role]} — ${data.name}`.replace(/[\r\n]+/g, " "),
      html,
      replyTo: data.email,
      attachments: attachment ? [attachment] : undefined,
    });
    if (!sent) return { status: "error", code: "send", whatsapp };
  } catch {
    return { status: "error", code: "send", whatsapp };
  }

  return { status: "success", whatsapp };
}
