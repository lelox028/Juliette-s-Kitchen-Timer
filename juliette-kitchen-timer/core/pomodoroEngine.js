export const STATES = {
    IDLE: "IDLE",
    FOCUS: "FOCUS",
    SHORT_BREAK: "SHORT_BREAK",
    LONG_BREAK: "LONG_BREAK",
}

export default class PomodoroEngine {

    constructor(config = {}) {

        this.config = {
            focusDuration: config.focusDuration ?? 25 * 60,
            shortBreakDuration: config.shortBreakDuration ?? 5 * 60,
            longBreakDuration: config.longBreakDuration ?? 15 * 60,
            cyclesBeforeLongBreak: config.cyclesBeforeLongBreak ?? 4
        }

        this.state = STATES.IDLE
        this.currentCycle = 0
        this.remainingTime = this.config.focusDuration
    }

    start() {

        if (this.state === STATES.IDLE) {
            this.state = STATES.FOCUS
            this.remainingTime = this.config.focusDuration
        }

    }

    tick() {

        if (this.state === STATES.IDLE) return

        this.remainingTime -= 1

        if (this.remainingTime <= 0) {
            this.handleSessionEnd()
        }

    }

    handleSessionEnd() {

        if (this.state === STATES.FOCUS) {

            this.currentCycle += 1

            if (this.currentCycle >= this.config.cyclesBeforeLongBreak) {

                this.state = STATES.LONG_BREAK
                this.remainingTime = this.config.longBreakDuration
                this.currentCycle = 0

            } else {

                this.state = STATES.SHORT_BREAK
                this.remainingTime = this.config.shortBreakDuration

            }

        }

        else {

            this.state = STATES.FOCUS
            this.remainingTime = this.config.focusDuration

        }

    }

    reset() {

        this.state = STATES.IDLE
        this.currentCycle = 0
        this.remainingTime = this.config.focusDuration

    }

    getState() {

        return {
            state: this.state,
            remainingTime: this.remainingTime,
            currentCycle: this.currentCycle
        }

    }

    updateConfig(newConfig) {

        this.config = {
            ...this.config,
            ...newConfig
        }

        this.reset()
    }

}