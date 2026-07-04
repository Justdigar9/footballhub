import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          950: "#06110b",
          900: "#0a1f14",
          800: "#0f3320",
          700: "#154a2d",
          600: "#1c6339",
        },
        chalk: "#f2f7f2",
        line: "#274d33",
        live: "#ff4d4f",
        accent: "#d6ff3c",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "pitch-lines": "repeating-linear-gradient(90deg, rgba(242,247,242,0.035) 0px, rgba(242,247,242,0.035) 1px, transparent 1px, transparent 64px)",
      },
    },
  },
  plugins: [],
};

export default config;
