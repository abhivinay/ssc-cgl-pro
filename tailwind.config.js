/** @type {import('tailwindcss').Config} */
const ice = {
  50: "#edf8fa",
  100: "#d8edf1",
  200: "#b4dce5",
  300: "#b4dce5",
  400: "#a4cbd4",
  500: "#88aeb8",
  600: "#5a7a87",
  700: "#405b68",
  800: "#293e4d",
  900: "#20333f",
  950: "#15242f",
};
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { cyan: ice, violet: ice },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
