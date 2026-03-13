import { useEffect, useState } from "react"

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-pixel-pink border-4 border-pixel-brown shadow-lg rounded-xl px-6 py-4 flex items-center gap-4 z-50">
      <span className="material-symbols-outlined text-2xl text-pixel-brown">download</span>
      <span className="font-pixel text-pixel-brown text-sm">
        ¡Instala la app para una mejor experiencia!
      </span>
      <button
        className="ml-4 px-3 py-1 bg-pixel-brown text-white font-pixel rounded shadow active:translate-y-1"
        onClick={async () => {
          if (deferredPrompt) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            if (outcome === "accepted") setVisible(false)
          }
        }}
      >
        Instalar
      </button>
      <button
        className="ml-2 text-pixel-brown hover:text-pixel-pink"
        onClick={() => setVisible(false)}
        title="Cerrar"
      >
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  )
}