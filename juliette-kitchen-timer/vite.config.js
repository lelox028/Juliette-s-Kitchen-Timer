import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Juliette's Kitchen Timer",
        short_name: "Juliette Timer",
        description: "A cozy pixel-art pomodoro timer with Juliette the baker cat",
        theme_color: "#f8e8ff",
        background_color: "#f8e8ff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
})