class State {
    private state: "idle" | "watch" = "idle";
    private video: string | null = null;
    private time: number = 0;
    private isPaused: boolean = true;

    constructor() {
        this.counter();
    }

    setState(s: "idle" | "watch") {
        this.state = s;
    }

    setVideo(v: string | null) {
        this.video = v;
    }

    setTime(t: number) {
        this.time = t;
    }

    setPause(isPaused: boolean) {
        this.isPaused = isPaused;
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
};

export const state = new State();