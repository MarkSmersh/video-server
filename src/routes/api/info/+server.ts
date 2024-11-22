import { json, type RequestHandler } from "@sveltejs/kit";
import { state } from "$lib/server";

export const GET: RequestHandler = ({ cookies }) => {
    const session = cookies.get("session");

    if (!session) {
        cookies.set("session", crypto.randomUUID(), { path: "/" });
    }

    return json(state.get());
}