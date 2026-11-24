export function alternates(locale: string, path = "") {
  const suffix = path ? `/${path}` : "";
  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      fr: `/fr${suffix}`,
      en: `/en${suffix}`,
      ar: `/ar${suffix}`,
    },
  };
}
