import { type RequestHandler } from "@sveltejs/kit";
import { getMediaDir, state } from "$lib/server";

export const GET: RequestHandler = ({ url }) => {
    const video = url.searchParams.get("video")

    if (!video) {
        return new Response("No video?", { status: 400 });
    }

    const videos = getMediaDir();

    if (!videos.includes(video as string)) {
        return new Response("No such video", { status: 404 })
    }

    // FIXME: Writed by parazhka
    // 3 unneccesery updates, when want only 1

    state.setVideo(video);
    state.setTime(0);
    state.setPause(true);

    return new Response("Video set succesfully");
}