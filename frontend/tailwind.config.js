export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      container: { center: true, padding: "1rem" },
      borderRadius: { "2xl": "1.25rem" },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,0.06)" }
    }
  },
  plugins: []
};
