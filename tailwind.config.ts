import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#003C71",
          secondary: "#89CFF0",
          accent: "#3A3A3A",
          neutral: "#2C2C2C",
          "base-100": "#FFFFFF",
          info: "#1E90FF",
          success: "#28A745",
          warning: "#FFC107",
          error: "#DC3545",
        },
      }
    ]
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Apercu"', "sans-serif"],
        serif: ['"Merriweather"', "serif"],
      },
      colors: {
        "wef-blue": "#003C71",
        "wef-light-blue": "#89CFF0",
        "wef-dark-blue": "#001F3F",
        "wef-white": "#FFFFFF",
        "wef-gray": "#3A3A3A",
        "wef-light-gray": "#F5F5F5",
        "wef-dark-gray": "#2C2C2C"
      },
      backgroundImage: {
        "wef-gradient":
          "linear-gradient(to bottom right, #005293, #003C71, #001F3F)",
      },
    },
  },
  plugins: [require("daisyui")],
};

export default config;
