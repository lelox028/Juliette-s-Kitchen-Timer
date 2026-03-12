import { useState, useEffect, useRef } from "react"
import PomodoroEngine from "../core/pomodoroEngine"

export default function usePomodoroTimer(config) {

    const engineRef = useRef(null)
    const targetTimeRef = useRef(null)
    const workerRef = useRef(null)
    const wakeLockRef = useRef(null)

    if (!engineRef.current) {
        engineRef.current = new PomodoroEngine(config)
    }

    const [engineState, setEngineState] = useState(
        engineRef.current.getState()
    )

    // Inicializar Web Worker
    useEffect(() => {
        const worker = new Worker(new URL('../src/workers/timerWorker.js', import.meta.url), { type: 'module' })
        
        worker.onmessage = (event) => {
            const { type, remainingTime, isFinished } = event.data
            
            if (type === 'TICK') {
                const engine = engineRef.current
                engine.remainingTime = remainingTime
                
                if (isFinished) {
                    engine.handleSessionEnd()
                    targetTimeRef.current = Date.now() + engine.remainingTime * 1000
                    notifyTimerComplete(engine)
                }
                
                setEngineState(engine.getState())
            }
        }

        workerRef.current = worker

        return () => worker.terminate()
    }, [])

    // Pedir permisos de notificación
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission()
        }
    }, [])

    // Función para notificaciones nativas
    const notifyTimerComplete = (engine) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('¡Tiempo!', {
                body: engine.state === 'FOCUSING' ? 'Descansa un poco' : 'Vuelve a trabajar',
                icon: '/icon-192.png',
                badge: '/icon-192.png',
                tag: 'pomodoro',
                requireInteraction: true
            })
        }
    }

    useEffect(() => {

        const interval = setInterval(() => {

            const engine = engineRef.current

            if (!targetTimeRef.current) return

            if (engine.state === "IDLE") return

            const remaining =
                Math.max(
                    0,
                    Math.floor((targetTimeRef.current - Date.now()) / 1000)
                )

            engine.remainingTime = remaining

            if (remaining === 0) {

                engine.handleSessionEnd()

                targetTimeRef.current =
                    Date.now() + engine.remainingTime * 1000

            }

            setEngineState(engine.getState())

        }, 250)

        return () => clearInterval(interval)

    }, [])

    async function start() {

        const engine = engineRef.current

        engine.start()

        targetTimeRef.current =
            Date.now() + engine.remainingTime * 1000

        // Mantener pantalla encendida
        if ('wakeLock' in navigator) {
            try {
                wakeLockRef.current = await navigator.wakeLock.request('screen')
            } catch (err) {
                console.log('Wake Lock error:', err)
            }
        }

        // Enviar timestamp al worker
        if (workerRef.current) {
            workerRef.current.postMessage({
                action: 'START',
                payload: {
                    startTime: Date.now(),
                    duration: engine.remainingTime
                }
            })
        }

        setEngineState(engine.getState())

    }

    function reset() {

        const engine = engineRef.current
        engine.reset()

        // Detener worker
        if (workerRef.current) {
            workerRef.current.postMessage({ action: 'STOP' })
        }

        // Liberar wake lock
        if (wakeLockRef.current) {
            wakeLockRef.current.release()
            wakeLockRef.current = null
        }

        setEngineState(engine.getState())

    }

    function updateConfig(newConfig){
        const engine = engineRef.current
        engine.updateConfig(newConfig)

        // Detener worker si es necesario
        if (workerRef.current) {
            workerRef.current.postMessage({ action: 'STOP' })
        }

        // Liberar wake lock
        if (wakeLockRef.current) {
            wakeLockRef.current.release()
            wakeLockRef.current = null
        }

        setEngineState(engine.getState())
    }

    return {
        ...engineState,
        start,
        reset,
        updateConfig
    }

}