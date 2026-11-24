export const site = {
  name: "Junior Leaders Academy",
  legalName: "Junior Leaders Academy Privé",
  motto: "Where Leaders Begin Their Journey",
  phoneDisplay: "06 61 10 75 11",
  phoneTel: "+212661107511",
  whatsapp: "212661107511",
  addressFr:
    "Lotissement Al Tayssir, n° 01, derrière la mosquée Al Madina, Deroua, province de Nouaceur",
  legalAddress: "67, rue Aziz Bellal, 2e étage, n° 3, quartier Maarif, Casablanca",
  facebook: "https://www.facebook.com/people/Junior-Leaders-Academy/61590663478248/",
  facebookPhotos:
    "https://www.facebook.com/people/Junior-Leaders-Academy/61590663478248/?sk=photos",
  instagram: "https://www.instagram.com/juniorleadersacademy/",
  instagramHandle: "@juniorleadersacademy",
  mapsQuery: "Lotissement Al Tayssir Deroua Nouaceur",
  year: "2026-2027",
} as const;

export const levelValues = ["ps3", "ps4", "ps5", "ap1", "ap2", "ap3", "ap4", "ap5", "ap6"] as const;

export const levelLabelFr: Record<(typeof levelValues)[number], string> = {
  ps3: "Préscolaire · 3 ans",
  ps4: "Préscolaire · 4 ans",
  ps5: "Préscolaire · 5 ans",
  ap1: "1re année primaire",
  ap2: "2e année primaire",
  ap3: "3e année primaire",
  ap4: "4e année primaire",
  ap5: "5e année primaire",
  ap6: "6e année primaire",
};

export const roleValues = ["preschool", "primary", "both"] as const;
export const roleLabelFr: Record<(typeof roleValues)[number], string> = {
  preschool: "Préscolaire",
  primary: "Primaire",
  both: "Préscolaire et primaire",
};

export const experienceValues = ["under3", "y3", "y4to5", "y6to10", "y10plus"] as const;
export const experienceLabelFr: Record<(typeof experienceValues)[number], string> = {
  under3: "Moins de 3 ans",
  y3: "3 ans",
  y4to5: "4 à 5 ans",
  y6to10: "6 à 10 ans",
  y10plus: "Plus de 10 ans",
};

export function mapsEmbed(locale: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=15&hl=${locale}&output=embed`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;
}

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
