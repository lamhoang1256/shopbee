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
        blue1a: "#1a94ff",
        redff4: "#ff424e",
      },
      backgroundImage: {
        linearfef5: "linear-gradient(0, #fe6433, #f53e2d)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
