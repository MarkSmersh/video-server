import "../../../../chunks/index2.js";
import { s as state } from "../../../../chunks/index3.js";
const GET = ({ url }) => {
  if (state.get().state === "watch") {
    return new Response("Session exists already", { status: 400 });
  }
  if (state.get().state === "idle") {
    state.setState("watch");
    return new Response("Session started");
  }
  return new Response("Pashalko", { status: 444 });
};
export {
  GET
};
