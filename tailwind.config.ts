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
      fontFamily: {
        sans: ['"Poppins"', "sans-serif"],
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
    },
  },
  plugins: [require("daisyui")],
};

export default config;
