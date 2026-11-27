import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cairo, Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { SchoolJsonLd } from "@/components/SchoolJsonLd";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { routing, type Locale } from "@/i18n/routing";
import { themeBoot } from "@/components/theme-boot";
import { siteUrl } from "@/lib/site";
import "../globals.css";

const outfit = Outfit({ subsets: ["latin"], display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF8F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0F14" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: t("title"),
      template: "%s · Junior Leaders Academy",
    },
    description: t("description"),
    applicationName: "Junior Leaders Academy",
    openGraph: {
      siteName: "Junior Leaders Academy",
      images: [{ url: "/brand/cover.jpg", width: 1220, height: 756, alt: "Junior Leaders Academy" }],
      locale: locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_MA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: ["/brand/cover.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("nav");
  const meta = await getTranslations("meta");
  const font = locale === "ar" ? cairo.className : outfit.className;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className={`${font} bg-paper text-ink pb-[calc(4.75rem+env(safe-area-inset-bottom))] lg:pb-0`}>
        <NextIntlClientProvider messages={messages}>
          <SchoolJsonLd locale={locale as Locale} description={meta("description")} />
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:text-ink"
          >
            {t("skip")}
          </a>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <WhatsAppFab />
          <MobileCallBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
