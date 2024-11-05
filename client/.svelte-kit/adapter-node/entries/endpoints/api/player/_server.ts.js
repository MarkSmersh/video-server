import "../../../../chunks/index2.js";
import { s as state } from "../../../../chunks/index3.js";
const GET = ({ url }) => {
  const time = url.searchParams.get("time");
  const pause = url.searchParams.get("pause");
  if (parseInt(time) === state.get().time) {
    return new Response("Time is already same", { status: 208 });
  }
  if (time) {
    state.setTime(parseInt(time));
    return new Response("Time is updated", { status: 200 });
  }
  if (pause) {
    const pauseBool = pause === "true" ? true : false;
    if (pauseBool === state.get().isPaused) {
      return new Response("", { status: 208 });
    }
    state.setPause(pauseBool);
    return new Response("Pause is updated", { status: 200 });
  }
  return new Response("No params", { status: 400 });
};
export {
  GET
};
