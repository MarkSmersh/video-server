import { json, type RequestHandler } from "@sveltejs/kit";
import { readMedia } from "$lib/server";

export const GET: RequestHandler = () => {
    const videos = readMedia();

    return json(videos);
}