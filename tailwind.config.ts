import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#FFB300",
          amber: "#FF6F00",
          brown: "#7C4D00",
          deep: "#4E3B00",
          cream: "#FFF3E0",
        },
      },
      boxShadow: {
        gold: "0 4px 24px rgba(255, 179, 0, 0.25)",
        "gold-lg": "0 8px 48px rgba(255, 179, 0, 0.35)",
      },
    },
  },
};

export default config;
