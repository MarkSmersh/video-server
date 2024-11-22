import { type RequestHandler } from "@sveltejs/kit";
import { getMediaDir, state } from "$lib/server";

export const GET: RequestHandler = ({ url, cookies }) => {
    const video = url.searchParams.get("video")

    const session = cookies.get("session");

    if (!session) {
        return new Response("No session", { status: 400 });
    }

    if (!video) {
        return new Response("No video?", { status: 400 });
    }

    const videos = getMediaDir();

    if (!videos.includes(video as string)) {
        return new Response("No such video", { status: 404 })
    }

    // FIXME: Writed by parazhka
    // 3 unneccesery updates, when want only 1

    state.setVideo(video, session);
    state.setTime(0, session);
    state.setPause(true, session);

    return new Response("Video set succesfully");
}