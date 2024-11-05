import "../../../../chunks/index2.js";
import { s as state } from "../../../../chunks/index3.js";
import { a as getMediaDir } from "../../../../chunks/media.js";
const GET = ({ url }) => {
  const video = url.searchParams.get("video");
  if (!video) {
    return new Response("No video?", { status: 400 });
  }
  const videos = getMediaDir();
  if (!videos.includes(video)) {
    return new Response("No such video", { status: 404 });
  }
  state.setVideo(video);
  state.setTime(0);
  state.setPause(true);
  return new Response("Video set succesfully");
};
export {
  GET
};
