module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black33: "#333333",
        redff4: "#ff424e",
        orangeee4: "#ee4d2d",
        gray999: "#999",
        blue08f: "#08f",
      },
      fontFamily: {
        dm: ['"DM Sans"', " sans-serif"],
      },
      backgroundImage: {
        linearfef5: "linear-gradient(0, #fe6433, #f53e2d)",
      },
      screens: {
        max5se: { max: "320.98px" },
        maxsm: { max: "768.98px" },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
