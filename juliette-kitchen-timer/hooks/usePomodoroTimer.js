import { useState, useEffect, useRef } from "react"
import PomodoroEngine from "../core/pomodoroEngine"

export default function usePomodoroTimer(config) {

    const engineRef = useRef(null)
    const targetTimeRef = useRef(null)

    if (!engineRef.current) {
        engineRef.current = new PomodoroEngine(config)
    }

    const [engineState, setEngineState] = useState(
        engineRef.current.getState()
    )

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

    function start() {

        const engine = engineRef.current

        engine.start()

        targetTimeRef.current =
            Date.now() + engine.remainingTime * 1000

        setEngineState(engine.getState())

    }

    function reset() {

        const engine = engineRef.current
        engine.reset()

        setEngineState(engine.getState())

    }

    return {
        ...engineState,
        start,
        reset
    }

}