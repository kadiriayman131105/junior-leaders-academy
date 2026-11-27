import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CareersForm } from "@/components/CareersForm";
import { Link } from "@/i18n/navigation";
import { alternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("careersTitle"),
    description: t("careersDescription"),
    alternates: alternates(locale, "recrutement"),
  };
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("careers");

  return (
    <section className="shell grid gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-10 lg:py-16">
      <div className="min-w-0">
        <p className="text-sm font-bold text-ember">{t("eyebrow")}</p>
        <h1 className="display-lg mt-2 font-extrabold text-ink">{t("title")}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{t("lead")}</p>
        <Link href="/" className="mt-6 inline-flex text-sm font-extrabold text-ember">
          {t("back")}
        </Link>
      </div>
      <CareersForm />
    </section>
  );
}
