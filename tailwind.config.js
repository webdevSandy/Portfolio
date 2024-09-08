/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      Ubuntu: ["Ubuntu", "sans-serif"],
      Roboto_Mono: ["Roboto Mono", "monospace"],
    },
  },
  plugins: [],
}

