let startTime = 0
let duration = 0

self.onmessage = (event) => {
  const { action, payload } = event.data

  if (action === 'START') {
    startTime = payload.startTime
    duration = payload.duration
    
    // Actualizar cada 100ms
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const remaining = Math.max(0, duration - elapsed)
      
      self.postMessage({
        type: 'TICK',
        remainingTime: remaining,
        isFinished: remaining === 0
      })

      if (remaining === 0) {
        clearInterval(interval)
      }
    }, 100)
  }

  if (action === 'STOP') {
    startTime = 0
    duration = 0
  }
}