import { ee } from ".";

export class State {
    private state: "idle" | "watch" = "idle";
    private video: string | null = null;
    private time: number = 0;
    private isPaused: boolean = false;

    constructor() {
        this.counter();
    }

    setState(s: "idle" | "watch", session: string) {
        this.state = s;
        ee.emit(session, "state");
    }

    setVideo(v: string | null, session: string) {
        this.video = v;
        ee.emit(session, "video");
    }

    setTime(t: number, session: string) {
        this.time = t;
        ee.emit(session, "time");
    }

    setPause(isPaused: boolean, session: string) {
        this.isPaused = isPaused;
        ee.emit(session, "pause");
    }

    get() {
        return {
            state: this.state,
            video: this.video,
            time: this.time,
            isPaused: this.isPaused
        }
    }

    private async counter() {
        await new Promise((resolve) => {
            setTimeout(() => resolve(null), 1000);
        })

        if (!this.isPaused) {
            this.time += 1;
        }

        await this.counter();
    }
}