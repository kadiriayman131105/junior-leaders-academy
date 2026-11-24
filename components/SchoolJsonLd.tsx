import { site, siteUrl } from "@/lib/site";

export function SchoolJsonLd({ locale, description }: { locale: string; description: string }) {
  const base = siteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "School",
    name: site.name,
    slogan: site.motto,
    description,
    url: `${base}/${locale}`,
    image: `${base}/brand/cover.jpg`,
    telephone: site.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lotissement Al Tayssir, n° 01",
      addressLocality: "Deroua",
      addressRegion: "Nouaceur",
      addressCountry: "MA",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:30",
    },
    sameAs: [site.facebook, site.instagram],
    knowsLanguage: ["ar", "fr", "en"],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
