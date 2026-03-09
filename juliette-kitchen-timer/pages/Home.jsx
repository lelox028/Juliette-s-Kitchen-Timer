import usePomodoroTimer from "../hooks/usePomodoroTimer"
import formatTime from "../utils/formatTime"
import Timer from "../components/Timer"
import { useState } from "react"

export default function Home() {

    const [config, setConfig] = useState({
        workDuration: 30 * 60,
        shortBreakDuration: 5 * 60,
        longBreakDuration: 15 * 60,
        cyclesBeforeLongBreak: 4
    })
    const timer = usePomodoroTimer(config)
    console.log(timer)

    return (
        <div className="relative flex h-auto min-h-screen w-full max-w-[480px] flex-col bg-background-light overflow-x-hidden p-6 gap-8 mx-auto font-pixel">

            <header className="flex items-center justify-center py-4">
                <h1 className="text-pixel-brown text-sm leading-tight tracking-tight text-center font-pixel">
                    Juliette's Kitchen Timer
                </h1>
            </header>

            <Timer pomodoro={timer} config={config} />

            <div className="flex w-full gap-4 max-w-xs">
                <button
                    onClick={timer.start}
                    className="flex-1 h-14 bg-pixel-pink border-4 border-pixel-brown text-pixel-brown font-pixel text-[10px] shadow-[4px_4px_0px_0px_rgba(93,64,55,1)] active:translate-y-1 active:shadow-none transition-all"
                >
                    START
                </button>

                <button
                    onClick={timer.reset}
                    className="flex-1 h-14 bg-white border-4 border-pixel-brown text-pixel-brown font-pixel text-[10px] shadow-[4px_4px_0px_0px_rgba(93,64,55,1)] active:translate-y-1 active:shadow-none transition-all"
                >
                    RESET
                </button>
            </div>
        </div>
    )
}