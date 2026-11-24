import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeView } from "@/components/HomeView";
import { getLocalPhotos } from "@/lib/gallery";
import { getInstagramPosts } from "@/lib/instagram";
import { alternates } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: alternates(locale),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [gallery, instagram] = await Promise.all([Promise.resolve(getLocalPhotos()), getInstagramPosts(8)]);
  return <HomeView gallery={gallery} instagram={instagram} />;
}
