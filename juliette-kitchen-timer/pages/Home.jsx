import usePomodoroTimer from "../hooks/usePomodoroTimer"
import formatTime from "../utils/formatTime"
import Timer from "../components/Timer"
import Controls from "../components/Controls"
import { useState } from "react"

export default function Home() {

    const [config, setConfig] = useState({
        focusDuration: 0.1 * 60,
        shortBreakDuration: 0.1 * 60,
        longBreakDuration: 0.1 * 60,
        cyclesBeforeLongBreak: 4
    })
    const timer = usePomodoroTimer(config)
    console.log(timer)

    return (
        <div className="bg-background-light font-pixel text-pixel-brown min-h-screen flex flex-col items-center">
            <div className="relative flex h-auto min-h-screen w-full max-w-[480px] flex-col bg-background-light overflow-x-hidden p-6 gap-8 mx-auto font-pixel">

                <header className="flex items-center justify-center py-4">
                    <h1 className="text-pixel-brown text-sm leading-tight tracking-tight text-center font-pixel">
                        Juliette's Kitchen Timer
                    </h1>
                </header>
                <main className="flex flex-col items-center gap-8 flex-grow justify-center">


                    <Timer pomodoro={timer} config={config} />

                    <Controls timer={timer} />
                </main>
            </div>
        </div>
    )
}