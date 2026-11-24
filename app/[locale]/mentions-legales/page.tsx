import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("legalTitle"),
    description: t("description"),
    alternates: alternates(locale, "mentions-legales"),
  };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const contact = await getTranslations("contact");

  return (
    <article className="shell max-w-3xl py-12 sm:py-16">
      <p className="text-sm font-bold text-ember">Junior Leaders Academy</p>
      <h1 className="display mt-2 font-extrabold text-navy">{t("title")}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{t("intro")}</p>
      <dl className="mt-8 space-y-5 leading-relaxed">
        <div>
          <dt className="font-extrabold text-navy">{t("legalLabel")}</dt>
          <dd className="text-muted">{site.legalName}</dd>
          <dd className="text-muted">{t("activity")}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-navy">{t("seatLabel")}</dt>
          <dd className="text-muted">{site.legalAddress}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-navy">{t("schoolLabel")}</dt>
          <dd className="text-muted">{contact("address")}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-navy">{t("phoneLabel")}</dt>
          <dd>
            <a className="inline-block font-bold text-navy" dir="ltr" href={`tel:${site.phoneTel}`}>
              {site.phoneDisplay}
            </a>
          </dd>
        </div>
      </dl>
      <p className="mt-8 leading-relaxed text-muted">{t("fees")}</p>
      <Link href="/" className="mt-8 inline-flex text-sm font-extrabold text-ember">
        {t("back")}
      </Link>
    </article>
  );
}
