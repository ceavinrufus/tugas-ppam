/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#190482",
        secondary: "#C2D9FF",
        yellow: "#FACC2D",
        lightgrey: "#D9D9D9",
        grey: "#807E78",
      },
      fontFamily: {
        RalewayBold: "Raleway_700Bold",
        ProximaNovaReg: "ProximaNovaReg",
        ProximaNovaBold: "ProximaNovaBold",
        ProximaNovaMedium: "ProximaNovaMedium",
      },
    },
  },
  plugins: [],
};
