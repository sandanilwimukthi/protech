import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#bd24df",
        secondary: "#2d6ade",
        'body-bg': "#ffffff",
        'body-bg-dark': "#040D26",
        'darkmode': "#f8fafc",
        'darkmode-dark': "#0c1b44",
        'tablebg': "#ffffff",
        'tablebg-dark': "#091335",
        'border': "#e2e8f0",
        'border-dark': "#091945",
        'lightblue': "#475569",
        'lightblue-dark': "#8a9bca",
        'lightsky': "#0f172a",
        'lightsky-dark': "#ECF2FF",
        'lightpurple': "#B4C7ED",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft': '0px 4px 20px rgba(110, 127, 185, 0.1)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.2)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #bd24df, #2d6ade 97.15%)',
        'gradient-simple': 'linear-gradient(90deg, rgba(189, 36, 223, 0.1), rgba(45, 106, 222, 0.1) 97.15%)',
      },
    },
  },
  plugins: [],
};
export default config;
