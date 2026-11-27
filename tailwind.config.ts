import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#FC6703",
          deep: "#E05600",
          soft: "rgb(var(--c-soft) / <alpha-value>)",
        },
        ember: "rgb(var(--c-ember) / <alpha-value>)",
        navy: {
          DEFAULT: "#232E40",
          deep: "#161E2B",
        },
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        band: "rgb(var(--c-band) / <alpha-value>)",
        card: "rgb(var(--c-card) / <alpha-value>)",
        sky: "rgb(var(--c-sky) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        whatsapp: "#0E7A45",
      },
      boxShadow: {
        card: "0 24px 50px -28px rgba(35, 46, 64, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
