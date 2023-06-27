/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "mobile-s": "320px",
      "mobile-m": "375px",
      "mobile-l": "425px",
      tablet: "768px",
      laptop: "1024px",
      "laptop-m": "1440px",
      "laptop-l": "2560px",
    },
  },
  plugins: [],
};
