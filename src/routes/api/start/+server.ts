import { type RequestHandler } from "@sveltejs/kit";
import { state } from "$lib/server";

export const GET: RequestHandler = ({ cookies }) => {
    const session = cookies.get("session");

    if (!session) {
        return new Response("No session", { status: 400 });
    }

    if (state.get().state === "watch") {
        return new Response("Session exists already", { status: 400 });
    }

    if (state.get().state === "idle") {
        state.setState("watch", session);
        return new Response("Session started")
    };

    // FIXME: My gf told me to write this status code here

    return new Response("Pashalko", { status: 444 })
}