import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        primary: "#005293", // Custom primary color (e.g., WEF blue)
        secondary: "#89CFF0", // Custom secondary color (light blue)
        accent: "#4D4D4D", // Accent color (gray)
        neutral: "#333333", // Neutral color
        "base-100": "#FFFFFF", // Base color for backgrounds
        info: "#3ABFF8", // Info color
        success: "#36D399", // Success color
        warning: "#FBBD23", // Warning color
        error: "#F87272", // Error color
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Apercu"', "sans-serif"],
        serif: ['"Merriweather"', "serif"],
      },
      colors: {
        "wef-blue": "#005293",
        "wef-light-blue": "#89CFF0",
        "wef-dark-blue": "#003C71",
        "wef-white": "#FFFFFF",
        "wef-gray": "#4D4D4D",
        "wef-light-gray": "#EAEAEA",
      },
      backgroundImage: {
        "wef-gradient":
          "linear-gradient(to bottom right, #2563eb, #1d4ed8, #005293)",
      },
    },
  },
  plugins: [require("daisyui")],
};

export default config;
