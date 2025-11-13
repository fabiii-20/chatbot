/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enables class-based dark mode in v4 compat

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [
    require("tailwindcss/preset-compat")(), // <-- THIS IS THE MAGIC
  ],

  theme: {
    extend: {},
  },
};
