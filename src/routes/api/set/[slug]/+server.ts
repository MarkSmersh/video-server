import { getMediaDir } from "$lib/server";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ params }) => {
    const video = params.slug;

    const videos = getMediaDir();

    if (!videos.includes(video as string)) {
        return new Response("No such video", { status: 404 })
    }

    return new Response("Video set succesfully");
}