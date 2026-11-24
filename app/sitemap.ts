import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = ["", "/recrutement", "/mentions-legales"];
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((item) => [item, `${base}/${item}${path}`])),
      },
    })),
  );
}
