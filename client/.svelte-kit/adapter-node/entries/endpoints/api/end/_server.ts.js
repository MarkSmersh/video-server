import "../../../../chunks/index2.js";
import { s as state } from "../../../../chunks/index3.js";
const GET = ({ url }) => {
  if (state.get().state === "idle") {
    return new Response("Session not exists", { status: 400 });
  }
  if (state.get().state === "watch") {
    state.setState("idle");
    return new Response("Session ended");
  }
  return new Response("Pashalko", { status: 444 });
};
export {
  GET
};
