import { useState } from "react"

export default function TimerConfig({ config, onConfigChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const [tempConfig, setTempConfig] = useState(config)

    const handleInputChange = (key, value) => {
        setTempConfig({
            ...tempConfig,
            [key]: key === 'cyclesBeforeLongBreak' ? parseInt(value) : parseFloat(value) * 60
        })
    }

    const handleSave = () => {
        onConfigChange(tempConfig)
        setIsOpen(false)
    }

    const handleClose = () => {
        setTempConfig(config)
        setIsOpen(false)
    }

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="p-3 border-4 border-pixel-pink bg-background-light shadow-[4px_4px_0px_0px_rgba(160,102,137,1)] text-pixel-pink hover:translate-y-[-2px] transition-transform flex items-center justify-center"
            >
                <span className="material-symbols-outlined text-2xl font-bold">settings</span>
            </button>

            {isOpen && (
                <div className="fixed absolute inset-x-6 bottom-24 bg-white border-4 border-pixel-pink shadow-[8px_8px_0px_0px_rgba(93,64,55,1)] p-6 z-50">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[12px] font-pixel text-pixel-brown">Timer Settings</h3>
                        <button 
                            onClick={handleClose}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[8px] font-pixel text-pixel-brown text-opacity-70 uppercase">Focus Period</label>
                            <input 
                                type="number" 
                                value={tempConfig.focusDuration / 60}
                                onChange={(e) => handleInputChange('focusDuration', e.target.value)}
                                className="w-full bg-background-light border-2 border-pixel-brown rounded-none p-2 text-[10px] font-pixel text-pixel-brown focus:ring-0 focus:border-pixel-pink"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[8px] font-pixel text-pixel-brown text-opacity-70 uppercase">Short Rest</label>
                            <input 
                                type="number" 
                                value={tempConfig.shortBreakDuration / 60}
                                onChange={(e) => handleInputChange('shortBreakDuration', e.target.value)}
                                className="w-full bg-background-light border-2 border-pixel-brown rounded-none p-2 text-[10px] font-pixel text-pixel-brown focus:ring-0 focus:border-pixel-pink"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[8px] font-pixel text-pixel-brown text-opacity-70 uppercase">Long Rest</label>
                            <input 
                                type="number" 
                                value={tempConfig.longBreakDuration / 60}
                                onChange={(e) => handleInputChange('longBreakDuration', e.target.value)}
                                className="w-full bg-background-light border-2 border-pixel-brown rounded-none p-2 text-[10px] font-pixel text-pixel-brown focus:ring-0 focus:border-pixel-pink"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[8px] font-pixel text-pixel-brown text-opacity-70 uppercase">Cycles</label>
                            <input 
                                type="number" 
                                value={tempConfig.cyclesBeforeLongBreak}
                                onChange={(e) => handleInputChange('cyclesBeforeLongBreak', e.target.value)}
                                className="w-full bg-background-light border-2 border-pixel-brown rounded-none p-2 text-[10px] font-pixel text-pixel-brown focus:ring-0 focus:border-pixel-pink"
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleSave}
                        className="w-full mt-6 py-3 bg-pixel-pink border-4 border-pixel-brown text-pixel-brown font-pixel text-[10px] shadow-[4px_4px_0px_0px_rgba(93,64,55,1)] active:translate-y-1 active:shadow-none"
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </>
    )
}