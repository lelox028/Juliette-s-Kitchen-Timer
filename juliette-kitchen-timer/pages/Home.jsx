import usePomodoroTimer from "../hooks/usePomodoroTimer"
import formatTime from "../utils/formatTime"

export default function Home() {

  const timer = usePomodoroTimer()

  return (
    <div className="flex flex-col items-center gap-6">

      <h1 className="text-3xl font-bold">
        Juliette's Kitchen Timer
      </h1>

      <div className="text-5xl font-mono">
        {formatTime(timer.remainingTime)}
      </div>

      <div className="flex gap-4">

        <button
          onClick={timer.start}
          className="px-4 py-2 bg-pink-300 rounded"
        >
          Start
        </button>

        <button
          onClick={timer.reset}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Reset
        </button>

      </div>

    </div>
  )
}