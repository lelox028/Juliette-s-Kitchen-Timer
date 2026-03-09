import formatTime from "../utils/formatTime"

export default function Timer({ pomodoro, config }) {
    return (
        <div className="relative w-72 h-80 flex flex-col items-center justify-center border-4 border-pixel-brown bg-white shadow-[4px_4px_0px_0px_rgba(93,64,55,1)]">
            {/* juliette component */}
            <div className="flex flex-col items-center gap-2">
                <span className="text-3xl font-bold text-pixel-brown tracking-tighter">
                    {formatTime(pomodoro.remainingTime)}
                </span>
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] uppercase text-pixel-brown/60 font-pixel">
                        {pomodoro.state}
                    </span>
                    <span className="text-[10px] text-pixel-brown/80 font-pixel">
                        Cycle {pomodoro.currentCycle + 1} of {config.cyclesBeforeLongBreak ?? 4}
                    </span>
                </div>
            </div>
        </div>
    )
}

