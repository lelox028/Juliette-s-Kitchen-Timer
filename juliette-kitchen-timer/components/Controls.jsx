

export default function Controls({ timer }) {
    return (
        <div className="flex w-full gap-4 max-w-xs">
            <button
                onClick={timer?.start}
                className="flex-1 h-14 bg-pixel-pink border-4 border-pixel-brown text-pixel-brown font-pixel text-[10px] shadow-[4px_4px_0px_0px_rgba(93,64,55,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
            >
                <span className="material-symbols-outlined">play_arrow</span>
                
                START
            </button>

            <button
                onClick={timer?.reset}
                className="flex-1 h-14 bg-white border-4 border-pixel-brown text-pixel-brown font-pixel text-[10px] shadow-[4px_4px_0px_0px_rgba(93,64,55,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
            >
                <span className="material-symbols-outlined">restart_alt</span>
                RESET
            </button>
        </div>
    )
}