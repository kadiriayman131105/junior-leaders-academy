import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Junior Leaders Academy",
    short_name: "JLA",
    description: "École privée de préscolaire et primaire à Deroua",
    start_url: "/fr",
    display: "standalone",
    background_color: "#FFF8F4",
    theme_color: "#232E40",
    lang: "fr",
    icons: [{ src: "/brand/logo.jpg", sizes: "150x150", type: "image/jpeg" }],
  };
}
