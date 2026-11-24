"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { SchoolPhoto } from "@/lib/photos";

const cadreFocus = ["object-[center_46%]", "object-center", "object-[center_20%]", "object-[center_38%]", "object-[center_62%]", "object-[center_42%]"];

export function PhotoGrid({ photos, variant = "grid" }: { photos: SchoolPhoto[]; variant?: "grid" | "cadre" }) {
  const t = useTranslations("photos");
  const locale = useLocale();
  const rtl = locale === "ar";
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index == null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setIndex(null);
      if (event.key === "ArrowRight") setIndex((current) => shift(current, rtl ? -1 : 1));
      if (event.key === "ArrowLeft") setIndex((current) => shift(current, rtl ? 1 : -1));
    }

    function shift(current: number | null, step: number) {
      if (current == null) return current;
      return (current + step + photos.length) % photos.length;
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, photos.length, rtl]);

  const current = index == null ? null : photos[index];

  function tile(photo: SchoolPhoto, photoIndex: number, frame: string) {
    return (
      <li key={`${photo.src}-${photoIndex}`}>
        <button type="button" onClick={() => setIndex(photoIndex)} className="group block w-full rounded-2xl bg-white p-1 text-start shadow-card ring-1 ring-orange/30 sm:rounded-[1.35rem] sm:p-2">
          <span className={`block overflow-hidden rounded-[0.85rem] sm:rounded-[0.95rem] ${frame}`}>
            <img
              src={photo.src}
              alt={photo.alt}
              referrerPolicy="no-referrer"
              loading={photoIndex < 2 ? "eager" : "lazy"}
              className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${cadreFocus[photoIndex] ?? "object-center"}`}
            />
          </span>
        </button>
      </li>
    );
  }

  return (
    <>
      {variant === "cadre" ? (
        <div className="grid gap-2 sm:gap-4">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-6 sm:gap-4">
            {photos.slice(0, 3).map((photo, photoIndex) => (
              <li key={`${photo.src}-${photoIndex}`} className={photoIndex === 0 ? "col-span-2 sm:col-span-4 sm:row-span-2" : "sm:col-span-2"}>
                <button type="button" onClick={() => setIndex(photoIndex)} className="group relative block h-full w-full rounded-2xl bg-white p-1 text-start shadow-card ring-1 ring-orange/30 sm:rounded-[1.35rem] sm:p-2">
                  <span className={`block overflow-hidden rounded-[0.85rem] sm:rounded-[0.95rem] ${photoIndex === 0 ? "aspect-[4/3] sm:absolute sm:inset-2 sm:aspect-auto" : "aspect-[4/3]"}`}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      referrerPolicy="no-referrer"
                      loading={photoIndex < 2 ? "eager" : "lazy"}
                      className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${cadreFocus[photoIndex]}`}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {photos.length > 3 ? (
            <ul className="cadre-rest grid grid-cols-2 gap-2 min-[480px]:grid-cols-3 min-[480px]:gap-3 sm:gap-4">
              {photos.slice(3).map((photo, offset) => tile(photo, offset + 3, "aspect-[3/4]"))}
            </ul>
          ) : null}
        </div>
      ) : (
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {photos.map((photo, photoIndex) => {
          const featured = photos.length >= 3 && photoIndex === 0;
          return (
            <li key={`${photo.src}-${photoIndex}`} className={featured ? "col-span-2" : undefined}>
              <button
                type="button"
                onClick={() => setIndex(photoIndex)}
                className={`group relative w-full overflow-hidden rounded-3xl bg-sky ${featured ? "aspect-[16/10]" : "aspect-square"}`}
              >
                <span className="contents">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    referrerPolicy="no-referrer"
                    loading={photoIndex < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      )}

      {current ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4" role="dialog" aria-modal="true" aria-label={current.alt}>
          <button type="button" className="absolute inset-0 cursor-default" aria-label={t("close")} onClick={() => setIndex(null)} />
          <div className="relative z-10 w-full max-w-3xl">
            <img src={current.src} alt={current.alt} referrerPolicy="no-referrer" className="max-h-[68vh] w-full rounded-2xl bg-navy object-contain sm:max-h-[78vh] sm:rounded-3xl" />
            <div className="mt-3 flex flex-col gap-3 text-white sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-white/85">{current.caption || current.alt}</p>
              <div className="flex flex-wrap gap-2">
                {photos.length > 1 ? (
                  <>
                    <button type="button" className="min-h-11 rounded-full bg-white/10 px-4 py-2 text-sm font-bold" onClick={() => setIndex((value) => (value == null ? value : (value - 1 + photos.length) % photos.length))}>
                      {t("prev")}
                    </button>
                    <button type="button" className="min-h-11 rounded-full bg-white/10 px-4 py-2 text-sm font-bold" onClick={() => setIndex((value) => (value == null ? value : (value + 1) % photos.length))}>
                      {t("next")}
                    </button>
                  </>
                ) : null}
                {current.href ? (
                  <a href={current.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-orange px-4 py-2 text-sm font-extrabold text-navy">
                    {t("openPost")}
                  </a>
                ) : null}
                <button type="button" className="min-h-11 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-navy" onClick={() => setIndex(null)}>
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
