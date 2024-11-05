import { j as json } from "../../../../chunks/index2.js";
import { s as state } from "../../../../chunks/index3.js";
const GET = ({ url }) => {
  return json(state.get());
};
export {
  GET
};
