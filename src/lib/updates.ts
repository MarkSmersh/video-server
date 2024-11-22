import { req } from "$lib";

export async function update(oldState: State, callback: (newState: State) => void) {
    let newState: State | null = null;
    
    try {
        console.log(JSON.stringify(oldState));

        const { status, data, contentType } = await req("updates", "POST", oldState);

        if (status === 200 && contentType === "application/json") {
            newState = data as State;
            
            callback(newState);
        }
    } catch (e) {
        console.log(e);
        await new Promise((resolve) => {
            setTimeout(() => resolve(null), 5000);
        })
    }

    update(newState || oldState, callback);
}

export interface State {
    state: "idle" | "watch",
    video: string | null,
    time: number,
    isPaused: boolean,
}