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
        primary: "#003C71", // Deep blue for strong brand presence
        secondary: "#89CFF0", // Softer light blue for highlights
        accent: "#3A3A3A", // Dark gray for accents
        neutral: "#2C2C2C", // Dark neutral for backgrounds
        "base-100": "#FFFFFF", // White for base backgrounds
        info: "#1E90FF", // Bright blue for info highlights
        success: "#28A745", // Green for success messages
        warning: "#FFC107", // Yellow for warnings
        error: "#DC3545", // Red for errors
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Apercu", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      colors: {
        "wef-blue": "#003C71", // Darker blue for a more sophisticated tone
        "wef-light-blue": "#89CFF0",
        "wef-dark-blue": "#001F3F", // Even deeper blue for emphasis
        "wef-white": "#FFFFFF",
        "wef-gray": "#3A3A3A", // Darker gray for improved contrast
        "wef-light-gray": "#F5F5F5", // Lighter gray for subtle backgrounds
        "wef-dark-gray": "#2C2C2C", // For dark mode or high contrast sections
      },
      backgroundImage: {
        "wef-gradient":
          "linear-gradient(to bottom right, #005293, #003C71, #001F3F)", // Gradient with a blend of blues for depth
      },
    },
  },
  plugins: [require("daisyui")],
};

export default config;
