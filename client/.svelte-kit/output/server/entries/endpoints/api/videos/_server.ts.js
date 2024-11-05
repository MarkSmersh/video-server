import { j as json } from "../../../../chunks/index2.js";
import { r as readMedia } from "../../../../chunks/media.js";
const GET = ({ url }) => {
  const videos = readMedia();
  return json(videos);
};
export {
  GET
};
