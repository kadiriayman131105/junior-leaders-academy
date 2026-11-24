"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { CloseIcon, MenuIcon } from "@/components/Icons";

const sections = [
  { hash: "ecole", key: "school" },
  { hash: "cycles", key: "programs" },
  { hash: "photos", key: "photos" },
  { hash: "contact", key: "contact" },
] as const;

const locales = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "ar", label: "ع" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="shell flex h-16 items-center gap-2 sm:h-[4.5rem] sm:gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image
            src="/brand/logo.jpg"
            alt=""
            width={48}
            height={48}
            className="h-10 w-10 shrink-0 rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl"
            priority
          />
          <span className="hidden min-w-0 leading-tight min-[480px]:block">
            <span className="block truncate text-[15px] font-extrabold text-navy">Junior Leaders</span>
            <span className="block truncate text-[11px] font-bold uppercase tracking-[0.18em] text-ember">Academy</span>
          </span>
        </Link>

        <nav className="ms-4 hidden min-w-0 items-center gap-4 xl:ms-6 xl:gap-6 lg:flex">
          {sections.map((section) => (
            <a key={section.hash} href={`/${locale}#${section.hash}`} className="whitespace-nowrap text-sm font-bold text-navy/80 hover:text-navy">
              {t(section.key)}
            </a>
          ))}
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="flex rounded-full bg-white p-0.5 shadow-sm ring-1 ring-navy/10 sm:p-1">
            {locales.map((item) => (
              <button
                key={item.code}
                type="button"
                lang={item.code}
                onClick={() => router.replace(pathname, { locale: item.code })}
                className={`min-h-9 min-w-9 rounded-full px-2 py-1 text-[11px] font-extrabold sm:min-h-0 sm:min-w-0 sm:px-2.5 sm:text-xs ${
                  locale === item.code ? "bg-navy text-white" : "text-navy hover:bg-orange-soft"
                }`}
                aria-current={locale === item.code ? "true" : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
          <a href={`/${locale}#contact`} className="hidden rounded-full bg-orange px-4 py-2 text-sm font-extrabold text-navy hover:bg-orange-deep sm:inline-flex">
            {t("enroll")}
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-navy lg:hidden"
            aria-expanded={open}
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="max-h-[calc(100dvh-4.5rem-env(safe-area-inset-top))] overflow-y-auto border-t border-line bg-white py-3 lg:hidden">
          <div className="shell">
            {sections.map((section) => (
              <a
                key={section.hash}
                href={`/${locale}#${section.hash}`}
                className="block rounded-2xl px-3 py-3 text-base font-bold text-navy hover:bg-orange-soft"
                onClick={() => setOpen(false)}
              >
                {t(section.key)}
              </a>
            ))}
            <a
              href={`/${locale}#contact`}
              className="mt-2 block rounded-full bg-orange px-4 py-3 text-center text-base font-extrabold text-navy sm:hidden"
              onClick={() => setOpen(false)}
            >
              {t("enroll")}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
