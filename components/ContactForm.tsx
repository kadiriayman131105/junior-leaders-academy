"use client";

import { useActionState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitContact, type FormState } from "@/app/actions/contact";
import { WhatsAppIcon } from "@/components/Icons";
import { btnPrimary, btnWhatsapp, fieldClass, labelClass } from "@/components/styles";
import { lines, whatsappLink } from "@/lib/whatsapp";

const initial: FormState | null = null;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const levels = useTranslations("contact").raw("levels") as { value: string; label: string }[];
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(submitContact, initial);

  useEffect(() => {
    if (state?.status === "success") formRef.current?.reset();
  }, [state]);

  function sendOnWhatsApp() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const data = new FormData(form);
    const levelValue = String(data.get("level") || "");
    const level = levels.find((item) => item.value === levelValue)?.label ?? levelValue;
    const area = String(data.get("area") || "").trim();
    const message = String(data.get("message") || "").trim();
    const text = lines([
      t("waHello"),
      `${t("waParent")} ${data.get("name")}`,
      `${t("waPhone")} ${data.get("phone")}`,
      `${t("waLevel")} ${level}`,
      area ? `${t("waArea")} ${area}` : "",
      message,
    ]);
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  const error =
    state?.status === "error"
      ? state.code === "rate"
        ? t("rate")
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
          {t("website")}
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
        <label className="block">
          <span className={labelClass}>{t("email")}</span>
          <input name="email" type="email" autoComplete="email" className={fieldClass} />
        </label>
        <label className="block">
          <span className={labelClass}>{t("area")}</span>
          <input name="area" autoComplete="address-level2" placeholder={t("areaPlaceholder")} className={fieldClass} />
        </label>
      </div>

      <label className="mt-4 block">
        <span className={labelClass}>{t("level")}</span>
        <select name="level" required defaultValue="" className={fieldClass}>
          <option value="" disabled>
            {t("levelPlaceholder")}
          </option>
          {levels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block">
        <span className={labelClass}>{t("message")}</span>
        <textarea name="message" rows={4} dir="auto" placeholder={t("messagePlaceholder")} className={fieldClass} />
      </label>

      <p className="mt-3 text-sm leading-relaxed text-muted">{t("privacy")}</p>

      {state?.status === "success" ? (
        <div className="mt-4 rounded-2xl bg-orange-soft px-4 py-3 text-sm font-semibold text-ink" role="status">
          <p>{t("success")}</p>
          {state.whatsapp ? (
            <a href={state.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex font-extrabold text-ember underline underline-offset-4">
              {t("whatsappContinue")}
            </a>
          ) : null}
        </div>
      ) : null}

      {error ? (
        <div className="mt-4 rounded-2xl bg-orange-soft px-4 py-3 text-sm font-semibold text-ink" role="alert">
          <p>{error}</p>
          {state?.whatsapp ? (
            <a href={state.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex font-extrabold text-ember underline underline-offset-4">
              {t("whatsappContinue")}
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
