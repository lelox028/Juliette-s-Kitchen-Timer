/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./core/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#ffffdb",
        "background-light": "#ffffdb",
        "background-dark": "#d4d4b6",
        "pixel-brown": "#5D4037",
        "pixel-pink": "#ff99a1",
        "pixel-pink-light": "#ffc5bb",
        "pixel-pink-dark": "#a06689",
      },
      fontFamily: {
        "pixel": ["'Press Start 2P'", "cursive"],
        "silkscreen": ["'Silkscreen'", "sans-serif"]
      },
      borderWidth: {
        "4": "4px",
      }
    },
  },
  plugins: [],
}