/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      main: ["Product sans"],
    },
    colors: {
      black: "#171717",
      greyLight: "#2C2C2C",
      bg: "#222222",
      lime: "#CCFF00",
      yellow: "#FFD600",
    },
    extend: {},
  },
  plugins: [],
};
