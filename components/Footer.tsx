import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "@/components/Icons";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const contact = await getTranslations("contact");
  const locale = await getLocale();

  return (
    <footer className="bg-navy text-white">
      <div className="shell grid gap-8 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-10">
        <div>
          <p className="text-lg font-extrabold">Junior Leaders Academy</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">{t("tagline")}</p>
          <p className="mt-4 text-sm font-semibold text-orange">{t("motto")}</p>
        </div>
        <div className="text-sm leading-relaxed text-white/80">
          <p className="font-bold text-white">{t("visit")}</p>
          <p className="mt-2">{contact("address")}</p>
          <a className="mt-3 inline-block font-bold text-white underline decoration-orange decoration-2 underline-offset-4" dir="ltr" href={`tel:${site.phoneTel}`}>
            {site.phoneDisplay}
          </a>
        </div>
        <div className="flex flex-col items-start gap-3 text-sm font-bold">
          <div className="grid w-full max-w-sm grid-cols-2 gap-2">
            <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-3 py-2 hover:bg-white/15" href={site.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-5 w-5 shrink-0" />
              {t("instagram")}
            </a>
            <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-3 py-2 hover:bg-white/15" href={site.facebook} target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="h-5 w-5 shrink-0" />
              {t("facebook")}
            </a>
          </div>
          <Link href="/recrutement" className="hover:text-orange">
            {t("recruit")}
          </Link>
          <Link href="/mentions-legales" className="hover:text-orange">
            {t("legal")}
          </Link>
          <a href={`/${locale}#contact`} className="hover:text-orange">
            {nav("contact")}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="shell py-4 text-xs leading-relaxed text-white/60">
          © {new Date().getFullYear()} {site.legalName}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
