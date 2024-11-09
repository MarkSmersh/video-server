import { ee } from ".";

export class State {
    private state: "idle" | "watch" = "idle";
    private video: string | null = null;
    private time: number = 0;
    private isPaused: boolean = false;

    setState(s: "idle" | "watch") {
        this.state = s;
        ee.emit("update", "state");
    }

    setVideo(v: string | null) {
        this.video = v;
        ee.emit("update", "video");
    }

    setTime(t: number) {
        this.time = t;
        ee.emit("update", "time");
    }

    setPause(isPaused: boolean) {
        this.isPaused = isPaused;
        ee.emit("update", "pause");
    }

    get() {
        return {
            state: this.state,
            video: this.video,
            time: this.time,
            isPaused: this.isPaused
        }
    }
}