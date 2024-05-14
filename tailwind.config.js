/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#190482",
        secondary: "#C2D9FF",
        yellow: "#FACC2D",
        grey: "#807E78",
      },
      fontFamily: {
        Raleway: "Raleway",
      },
    },
  },
  plugins: [],
};
