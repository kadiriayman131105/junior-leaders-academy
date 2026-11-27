"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MoonIcon, SunIcon } from "@/components/Icons";

const storageKey = "jla-theme";

export function ThemeToggle() {
  const t = useTranslations("nav");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains("dark"));
    sync();

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      if (localStorage.getItem(storageKey)) return;
      apply(media.matches);
    };
    media.addEventListener("change", onSystem);
    return () => media.removeEventListener("change", onSystem);
  }, []);

  function apply(next: boolean) {
    const root = document.documentElement;
    root.classList.toggle("dark", next);
    root.style.colorScheme = next ? "dark" : "light";
    const color = next ? "#0C0F14" : "#FFF8F4";
    document.querySelectorAll('meta[name="theme-color"]').forEach((node) => {
      node.setAttribute("content", color);
      node.removeAttribute("media");
    });
    setDark(next);
  }

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    localStorage.setItem(storageKey, next ? "dark" : "light");
    apply(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? t("themeLight") : t("themeDark")}
      className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink ring-1 ring-line transition hover:bg-orange-soft"
    >
      <SunIcon className="absolute h-[1.15rem] w-[1.15rem] scale-50 -rotate-90 opacity-0 transition duration-300 dark:scale-100 dark:rotate-0 dark:opacity-100" />
      <MoonIcon className="absolute h-[1.15rem] w-[1.15rem] scale-100 rotate-0 opacity-100 transition duration-300 dark:scale-50 dark:rotate-90 dark:opacity-0" />
    </button>
  );
}
