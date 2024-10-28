import { type RequestHandler } from "@sveltejs/kit";
import { state } from "$lib/server";

export const GET: RequestHandler = ({ url }) => {
    if (state.get().state === "idle") {
        return new Response("Session not exists", { status: 400 });
    }

    if (state.get().state === "watch") {
        state.setState("idle");
        return new Response("Session ended")
    };

    // FIXME: My gf told me to write this status code here

    return new Response("Pashalko", { status: 444 })
}