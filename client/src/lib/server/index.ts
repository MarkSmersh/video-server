import { FunctionEmitter } from "./functionEmitter";
export {  
    getMediaDir,
    getMediaFile,
    readMedia 
} from "./media";

class State {
    private state: "idle" | "watch" = "idle";
    private video: string | null = null;
    private time: number = 0;
    private isPaused: boolean = false;

    setState(s: "idle" | "watch") {
        this.state = s;
        fe.emit("update", "state");
    }

    setVideo(v: string | null) {
        this.video = v;
        fe.emit("update", "video");
    }

    setTime(t: number) {
        this.time = t;
        fe.emit("update", "time");
    }

    setPause(isPaused: boolean) {
        this.isPaused = isPaused;
        fe.emit("update", "pause");
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

export const fe = new FunctionEmitter();

export const state = new State();
