import { req } from "$lib";

export class Updates {
    private callback: (update: State) => void;
    private state: State;

    constructor(callback: (update: State) => void, state: State) {
        this.callback = callback;
        this.state = state;
    }

    listen() {
        this.updates();
    }

    async updates() {
        try {
            console.log(JSON.stringify(this.state));

            const { status, data, contentType } = await req("updates", "POST", this.state);
    
            if (status === 200 && contentType === "application/json") {
                const newState = data as State;
                
                this.state = newState;
                this.callback(newState);
            }
        } catch (e) {
            console.log(e);
            await new Promise((resolve) => {
                setTimeout(() => resolve(null), 5000);
            })
        }
    
        await this.updates();
    }
}

export interface State {
    state: "idle" | "watch",
    video: string | null,
    time: number,
    isPaused: boolean,
}