import formatTime from "../utils/formatTime"
import Juliette from "./Juliette"

export default function Timer({ pomodoro, config }) {
    return (
        <div className="relative w-72 h-80 flex flex-col items-center justify-center border-4 border-pixel-pink bg-white shadow-[4px_4px_0px_0px_rgba(160,102,137,1)]">
            {/* juliette component */}
            <Juliette state={pomodoro.state} />
            <div className="flex flex-col items-center gap-2">
                <span className="text-3xl font-bold text-pixel-pink tracking-tighter">
                    {formatTime(pomodoro?.remainingTime)}
                </span>
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] uppercase text-pixel-pink-light font-pixel">
                        {pomodoro?.state}
                    </span>
                    <span className="text-[10px] text-pixel-pink/80 font-pixel">
                        Cycle {pomodoro?.currentCycle + 1} of {config.cyclesBeforeLongBreak}
                    </span>
                </div>
            </div>
        </div>
    )
}

