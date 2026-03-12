import { useState, useEffect } from "react"
import usePomodoroTimer from "../hooks/usePomodoroTimer"
import Timer from "../components/Timer"
import Controls from "../components/Controls"
import TimerConfig from "../components/TimerConfig"

const DEFAULT_CONFIG = {
    focusDuration: 40 * 60,
    shortBreakDuration: 5 * 60,
    longBreakDuration: 15 * 60,
    cyclesBeforeLongBreak: 4
}

export default function Home() {
    const [config, setConfig] = useState(() => {
        const savedConfig = localStorage.getItem('pomodoroConfig')
        if (savedConfig) {
            try {
                return JSON.parse(savedConfig)
            } catch (error) {
                console.error('Error loading config from localStorage:', error)
                return DEFAULT_CONFIG
            }
        }
        return DEFAULT_CONFIG
    })
    
    const timer = usePomodoroTimer(config)

    // Guardar config en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem('pomodoroConfig', JSON.stringify(config))
        timer.updateConfig(config)
    }, [config])

    const handleConfigChange = (newConfig) => {
        setConfig(newConfig)
    }

    return (
        <div className="bg-background-light font-pixel text-pixel-brown min-h-screen flex flex-col items-center">
            <div className="relative flex h-auto min-h-screen w-full max-w-[480px] flex-col bg-background-light overflow-x-hidden p-6 gap-8 mx-auto font-pixel">

                <header className="flex items-center justify-center py-4">
                    <h1 className="text-pixel-pink text-sm leading-tight tracking-tight text-center font-pixel">
                        Juliette's Kitchen Timer
                    </h1>
                </header>

                <main className="flex flex-col items-center gap-8 flex-grow justify-center">
                    <Timer pomodoro={timer} config={config} />
                    <Controls timer={timer} />
                </main>

                <footer className="flex justify-center pb-8">
                    <TimerConfig config={config} onConfigChange={handleConfigChange} />
                </footer>
            </div>
        </div>
    )
}