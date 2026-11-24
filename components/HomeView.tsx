import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { CompassIcon, FacebookIcon, InstagramIcon, LanguagesIcon, PhoneIcon, SparkIcon, StarIcon, WhatsAppIcon } from "@/components/Icons";
import { PhotoGrid } from "@/components/PhotoGrid";
import { btnPrimary, btnWhatsapp } from "@/components/styles";
import type { SchoolPhoto } from "@/lib/photos";
import { mapsEmbed, mapsLink, site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

const whyIcons = [LanguagesIcon, CompassIcon, SparkIcon, StarIcon];

export async function HomeView({
  gallery,
  instagram,
}: {
  gallery: SchoolPhoto[];
  instagram: SchoolPhoto[];
}) {
  const hero = await getTranslations("hero");
  const facts = await getTranslations("facts");
  const why = await getTranslations("why");
  const programs = await getTranslations("programs");
  const approach = await getTranslations("approach");
  const photos = await getTranslations("photos");
  const steps = await getTranslations("steps");
  const faq = await getTranslations("faq");
  const contact = await getTranslations("contact");
  const wa = await getTranslations("whatsapp");
  const locale = await getLocale();

  const whyItems = why.raw("items") as { title: string; text: string }[];
  const stepItems = steps.raw("items") as { title: string; text: string }[];
  const faqItems = faq.raw("items") as { q: string; a: string }[];
  const points = approach.raw("points") as string[];
  const chat = whatsappLink(wa("hero"));

  return (
    <>
      <section className="overflow-x-clip">
        <div className="shell grid items-center gap-8 py-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 md:py-14 xl:py-20">
        <div className="min-w-0">
          <p className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-orange px-3 py-1 text-sm font-extrabold text-navy">
            <span className="h-2 w-2 shrink-0 rounded-full bg-navy" />
            {hero("badge")}
          </p>
          <p className="mt-5 text-sm font-bold text-ember">{hero("kicker")}</p>
          <h1 className="display-lg mt-2 font-extrabold text-navy">
            {hero("title")}
          </h1>
          {hero("motto") ? <p className="mt-3 text-sm font-semibold text-navy/70">{hero("motto")}</p> : null}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{hero("lead")}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#contact" className={btnPrimary}>
              {hero("enroll")}
            </a>
            <a href={chat} target="_blank" rel="noopener noreferrer" className={btnWhatsapp}>
              <WhatsAppIcon className="h-5 w-5" />
              {hero("whatsapp")}
            </a>
          </div>
          <a href={`tel:${site.phoneTel}`} dir="ltr" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-navy">
            <PhoneIcon className="h-4 w-4 text-ember" />
            {site.phoneDisplay}
          </a>
        </div>
        <div className="relative min-w-0">
          <div className="absolute -end-2 -top-4 -z-10 hidden h-28 w-28 rounded-full bg-orange/25 blur-2xl sm:block" aria-hidden="true" />
          <div className="relative aspect-[1220/756] overflow-hidden rounded-[1.25rem] shadow-card sm:rounded-[2rem]">
            <Image
              src="/brand/cover.jpg"
              alt={hero("photoAlt")}
              fill
              priority
              sizes="(min-width: 1800px) 720px, (min-width: 768px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="absolute bottom-3 start-3 max-w-[calc(100%-1.5rem)] rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-navy shadow sm:bottom-4 sm:start-4">
            {hero("chip")}
          </p>
        </div>
        </div>
      </section>

      <section className="shell grid gap-3 sm:grid-cols-3" aria-label={facts("langs")}>
        {[
          [facts("langs"), facts("langsSub")],
          [facts("cycles"), facts("cyclesSub")],
          [facts("place"), facts("placeSub")],
        ].map(([title, text]) => (
          <div key={title} className="rounded-3xl bg-white px-5 py-4 shadow-card">
            <p className="text-lg font-extrabold text-navy">{title}</p>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </div>
        ))}
      </section>

      <section id="ecole" className="scroll-mt-28 bg-white py-14 sm:py-20 xl:py-24">
        <div className="shell">
          <p className="text-sm font-bold text-ember">{why("eyebrow")}</p>
          <h2 className="display mt-2 max-w-2xl font-extrabold text-navy">{why("title")}</h2>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4">
            {whyItems.map((item, index) => {
              const Icon = whyIcons[index] ?? SparkIcon;
              return (
                <article key={item.title} className="rounded-[1.35rem] border border-line bg-paper p-5 sm:rounded-[1.75rem] sm:p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-soft text-ember">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold text-navy">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="cycles" className="scroll-mt-28 py-14 sm:py-20 xl:py-24">
        <div className="shell">
          <p className="text-sm font-bold text-ember">{programs("eyebrow")}</p>
          <h2 className="display mt-2 max-w-2xl font-extrabold text-navy">{programs("title")}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{programs("lead")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 sm:mt-10">
            <article className="rounded-[1.35rem] bg-orange-soft p-5 sm:rounded-[1.75rem] sm:p-7">
              <p className="text-sm font-extrabold text-ember">{programs("preKicker")}</p>
              <h3 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl">{programs("preTitle")}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-navy/80">{programs("preText")}</p>
              <a href="#contact" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-extrabold text-white sm:w-auto">
                {programs("cta")}
              </a>
            </article>
            <article className="rounded-[1.35rem] bg-navy p-5 text-white sm:rounded-[1.75rem] sm:p-7">
              <p className="text-sm font-extrabold text-orange">{programs("priKicker")}</p>
              <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">{programs("priTitle")}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-white/80">{programs("priText")}</p>
              <a href="#contact" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-extrabold text-navy sm:w-auto">
                {programs("cta")}
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 text-white sm:py-20 xl:py-24">
        <div className="shell">
          <p className="text-sm font-bold text-orange">{approach("eyebrow")}</p>
          <h2 className="display-lg mt-2 max-w-3xl font-extrabold">{approach("title")}</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{approach("text")}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-3 sm:mt-10">
            {points.map((point, index) => (
              <li key={point} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <span className="text-sm font-extrabold text-orange">0{index + 1}</span>
                <p className="mt-3 text-lg font-bold">{point}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="photos" className="scroll-mt-28 bg-white py-14 sm:py-20 xl:py-24">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-ember">{photos("eyebrow")}</p>
            <h2 className="display mt-2 font-extrabold text-navy">{photos("title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{photos("lead")}</p>
          </div>

          <div className="mt-8 rounded-[1.25rem] bg-paper p-2 sm:mt-10 sm:rounded-[2rem] sm:p-5">
            <PhotoGrid
              variant="cadre"
              photos={[
                { src: "/activities/tea.jpg", alt: photos("tea"), source: "gallery" },
                { src: "/activities/flags.jpg", alt: photos("flags"), source: "gallery" },
                { src: "/activities/caftan.jpg", alt: photos("caftan"), source: "gallery" },
                { src: "/activities/paint.jpg", alt: photos("paint"), source: "gallery" },
                { src: "/activities/pomegranate-girl.jpg", alt: photos("girl"), source: "gallery" },
                { src: "/activities/pomegranate-boy.jpg", alt: photos("boy"), source: "gallery" },
              ]}
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:max-w-md">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-3 py-3 text-center text-sm font-bold text-navy transition hover:border-ember hover:bg-orange-soft sm:text-base">
              <InstagramIcon className="h-5 w-5 shrink-0" /> {photos("instagram")}
            </a>
            <a href={site.facebookPhotos} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-3 py-3 text-center text-sm font-bold text-navy transition hover:border-ember hover:bg-orange-soft sm:text-base">
              <FacebookIcon className="h-5 w-5 shrink-0" /> {photos("facebook")}
            </a>
          </div>

          {instagram.length > 0 ? (
            <div className="mt-10">
              <h3 className="mb-4 text-lg font-extrabold text-navy">{photos("latest")}</h3>
              <PhotoGrid photos={instagram} />
            </div>
          ) : null}

          {gallery.length > 0 ? (
            <div className="mt-10">
              <h3 className="mb-4 text-lg font-extrabold text-navy">{photos("album")}</h3>
              <PhotoGrid photos={gallery} />
            </div>
          ) : null}

          {instagram.length === 0 || gallery.length === 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {instagram.length === 0 ? (
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="min-w-0 rounded-[1.35rem] bg-paper p-5 ring-1 ring-line transition hover:-translate-y-0.5 sm:rounded-[1.75rem] sm:p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-ember shadow-sm">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold text-navy">{photos("igTitle")}</h3>
                  <p className="mt-2 text-muted">{photos("igText")}</p>
                  <p className="mt-4 break-all text-sm font-extrabold text-ember">{photos("igCta")} · {site.instagramHandle}</p>
                </a>
              ) : null}
              {gallery.length === 0 ? (
                <a href={site.facebookPhotos} target="_blank" rel="noopener noreferrer" className="min-w-0 rounded-[1.35rem] bg-navy p-5 text-white transition hover:-translate-y-0.5 sm:rounded-[1.75rem] sm:p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                    <FacebookIcon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold">{photos("fbTitle")}</h3>
                  <p className="mt-2 text-white/75">{photos("fbText")}</p>
                  <p className="mt-4 text-sm font-extrabold text-orange">{photos("fbCta")}</p>
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section id="inscription" className="scroll-mt-28 py-14 sm:py-20 xl:py-24">
        <div className="shell">
          <p className="text-sm font-bold text-ember">{steps("eyebrow")}</p>
          <h2 className="display mt-2 max-w-2xl font-extrabold text-navy">{steps("title")}</h2>
          <ol className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {stepItems.map((item, index) => (
              <li key={item.title} className="rounded-[1.75rem] bg-white p-6 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-orange text-lg font-extrabold text-navy">0{index + 1}</span>
                <h3 className="mt-5 text-xl font-extrabold text-navy">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20 xl:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold text-ember">{faq("eyebrow")}</p>
          <h2 className="display mt-2 font-extrabold text-navy">{faq("title")}</h2>
          <div className="mt-8 divide-y divide-line">
            {faqItems.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-extrabold text-navy sm:items-center sm:gap-4 sm:text-lg">
                  {item.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-soft text-xl text-ember transition group-open:rotate-45">+</span>
                </summary>
                <p className="pe-12 pt-3 leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 py-14 sm:py-20 xl:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-bold text-ember">{contact("eyebrow")}</p>
            <h2 className="display mt-2 font-extrabold text-navy">{contact("title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{contact("lead")}</p>
            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="font-extrabold text-navy">{contact("addressLabel")}</dt>
                <dd className="mt-1 leading-relaxed text-muted">{contact("address")}</dd>
                <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-bold text-ember">
                  {contact("directions")}
                </a>
              </div>
              <div>
                <dt className="font-extrabold text-navy">{contact("hoursLabel")}</dt>
                <dd className="mt-1 text-muted">{contact("hours")}</dd>
              </div>
              <div>
                <dt className="font-extrabold text-navy">{contact("phoneLabel")}</dt>
                <dd className="mt-1">
                  <a href={`tel:${site.phoneTel}`} dir="ltr" className="inline-block font-extrabold text-navy">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-6 overflow-hidden rounded-[1.75rem] bg-sky shadow-card">
              <iframe title={contact("mapTitle")} src={mapsEmbed(locale)} className="h-52 w-full border-0 sm:h-64 lg:h-80" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
