import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#FC6703",
          deep: "#E05600",
          soft: "#FFF1E6",
        },
        ember: "#C24E02",
        navy: {
          DEFAULT: "#232E40",
          deep: "#161E2B",
        },
        muted: "#5E6D7E",
        paper: "#FFF8F4",
        sky: "#E7F1F8",
        line: "#E8DFD6",
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
