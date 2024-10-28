import { json, type RequestHandler } from "@sveltejs/kit";
import { state } from "$lib/server";

export const GET: RequestHandler = ({ url }) => {
    return json(state.get());
}