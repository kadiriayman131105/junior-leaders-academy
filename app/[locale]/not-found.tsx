import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { btnPrimary } from "@/components/styles";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="shell max-w-lg py-16 text-center sm:py-24">
      <p className="text-sm font-extrabold text-ember">404</p>
      <h1 className="display mt-3 font-extrabold text-ink">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("text")}</p>
      <Link href="/" className={`${btnPrimary} mt-8`}>
        {t("back")}
      </Link>
    </div>
  );
}
