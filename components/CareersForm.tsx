"use client";

import { useActionState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitCareer, type CareerState } from "@/app/actions/careers";
import { WhatsAppIcon } from "@/components/Icons";
import { btnPrimary, btnWhatsapp, fieldClass, labelClass } from "@/components/styles";
import { lines, whatsappLink } from "@/lib/whatsapp";

const initial: CareerState | null = null;

export function CareersForm() {
  const t = useTranslations("careers.form");
  const roles = useTranslations("careers").raw("roles") as { value: string; label: string }[];
  const experiences = useTranslations("careers").raw("experiences") as { value: string; label: string }[];
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(submitCareer, initial);

  function sendOnWhatsApp() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const data = new FormData(form);
    const roleValue = String(data.get("role") || "");
    const experienceValue = String(data.get("experience") || "");
    const role = roles.find((item) => item.value === roleValue)?.label ?? roleValue;
    const experience = experiences.find((item) => item.value === experienceValue)?.label ?? experienceValue;
    const message = String(data.get("message") || "").trim();
    const text = lines([
      t("waHello"),
      `${t("waName")} ${data.get("name")}`,
      `${t("waPhone")} ${data.get("phone")}`,
      `${t("waEmail")} ${data.get("email")}`,
      `${t("waRole")} ${role}`,
      `${t("waExperience")} ${experience}`,
      message,
    ]);
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  const error =
    state?.status === "error"
      ? state.code === "rate"
        ? t("rate")
        : state.code === "file"
          ? t("file")
          : state.code === "send"
            ? t("send")
            : state.code === "mail"
              ? t("mail")
              : t("invalid")
      : null;

  return (
    <form ref={formRef} action={action} className="rounded-[1.75rem] bg-card p-5 shadow-card sm:p-7">
      <input type="hidden" name="locale" value={locale} />
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>{t("name")}</span>
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block">
          <span className={labelClass}>{t("phone")}</span>
          <input name="phone" type="tel" required autoComplete="tel" className={fieldClass} />
        </label>
        <label className="block sm:col-span-2">
          <span className={labelClass}>{t("email")}</span>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
        <label className="block">
          <span className={labelClass}>{t("role")}</span>
          <select name="role" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {t("choose")}
            </option>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelClass}>{t("experience")}</span>
          <select name="experience" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {t("choose")}
            </option>
            {experiences.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 block">
        <span className={labelClass}>{t("message")}</span>
        <textarea name="message" rows={4} dir="auto" placeholder={t("messagePlaceholder")} className={fieldClass} />
      </label>
      <label className="mt-4 block">
        <span className={labelClass}>{t("cv")}</span>
        <input name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf" className={`${fieldClass} file:me-3 file:rounded-full file:border-0 file:bg-orange-soft file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-ink max-[380px]:file:me-2 max-[380px]:file:px-2`} />
      </label>
      <p className="mt-3 text-sm leading-relaxed text-muted">{t("privacy")}</p>
      {state?.status === "success" ? (
        <p className="mt-4 rounded-2xl bg-orange-soft px-4 py-3 text-sm font-semibold text-ink" role="status">
          {t("success")}
        </p>
      ) : null}
      {error ? (
        <div className="mt-4 rounded-2xl bg-orange-soft px-4 py-3 text-sm font-semibold text-ink" role="alert">
          <p>{error}</p>
          {state?.whatsapp ? (
            <a href={state.whatsapp} className="mt-2 inline-flex font-extrabold text-ember underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          ) : null}
        </div>
      ) : null}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="submit" className={btnPrimary} disabled={pending}>
          {pending ? t("sending") : t("submit")}
        </button>
        <button type="button" className={btnWhatsapp} onClick={sendOnWhatsApp}>
          <WhatsAppIcon className="h-5 w-5" />
          {t("whatsapp")}
        </button>
      </div>
    </form>
  );
}
