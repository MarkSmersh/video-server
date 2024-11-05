import { json, type RequestHandler } from "@sveltejs/kit";
import { state } from "$lib/server";

export const GET: RequestHandler = ({ url }) => {    
    const time = url.searchParams.get("time");
    const pause = url.searchParams.get("pause")
    
    if (parseInt(time as string) === state.get().time) {
        return new Response("Time is already same", { status: 208 });
    }
    // TODO: Check is good


    if (time) {
        state.setTime(parseInt(time as string));
        return new Response("Time is updated", { status: 200 });
    }

    if (pause) {
        const pauseBool = pause === "true" ? true : false

        if (pauseBool === state.get().isPaused) {
            return new Response("", { status: 208 });
        }

        state.setPause(pauseBool);
        return new Response("Pause is updated", { status: 200 });
    }

    return new Response("No params", { status: 400 });
}