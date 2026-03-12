let startTime = 0
let duration = 0
let timerInterval = null

self.onmessage = (event) => {
  const { action, payload } = event.data

  if (action === 'START') {
    startTime = payload.startTime
    duration = payload.duration
    
    // Limpiar interval previo si existe
    if (timerInterval) {
      clearInterval(timerInterval)
    }
    
    // Actualizar cada 100ms
    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const remaining = Math.max(0, duration - elapsed)
      
      self.postMessage({
        type: 'TICK',
        remainingTime: remaining,
        isFinished: remaining === 0
      })

      if (remaining === 0) {
        clearInterval(timerInterval)
        timerInterval = null
      }
    }, 100)
  }

  if (action === 'STOP') {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
    startTime = 0
    duration = 0
  }
}