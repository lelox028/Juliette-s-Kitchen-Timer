import "../src/styles/juliette.css"


export default function Juliette({ state }) {

    const getAnimationClass = () => {
        switch (state) {
            case "IDLE":
                return "juliette-idle"
            case "FOCUS":
                return "juliette-focus"
            case "SHORT_BREAK":
                return "juliette-short-break"
            case "LONG_BREAK":
                return "juliette-short-break"
            default:
                return "juliette-idle"
        }
    }

    return (
        <div className={`mb-4 ${getAnimationClass()}`} data-alt="Cute pixel art cat chef wearing a small white hat"></div>
    )
}