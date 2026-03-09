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
        "primary": "#FFF9C4",
        "background-light": "#FFFDE7",
        "pixel-brown": "#5D4037",
        "pixel-pink": "#F48FB1",
        "pixel-pink-light": "#FCE4EC",
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