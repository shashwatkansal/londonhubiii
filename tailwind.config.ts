import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // WEF primary color palette
        "wef-blue": "#005293", // Primary blue
        "wef-light-blue": "#89CFF0", // Lighter shade of blue
        "wef-dark-blue": "#003C71", // Darker shade of blue
        "wef-white": "#FFFFFF", // White
        "wef-gray": "#4D4D4D", // Gray used in typography and accents
        "wef-light-gray": "#EAEAEA", // Light gray for backgrounds and borders

        // Additional custom colors
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        // Use a font that closely matches the WEF branding
        sans: ['"Helvetica Neue"', "Arial", "sans-serif"],
        serif: ['"Times New Roman"', "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
