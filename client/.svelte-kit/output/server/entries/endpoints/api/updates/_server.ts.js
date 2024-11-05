import { j as json } from "../../../../chunks/index2.js";
import { s as state, f as fe } from "../../../../chunks/index3.js";
const POST = async ({ request }) => {
  const userState = await request.json();
  console.log(userState);
  if (!userState)
    return new Response("Unless laggy", { status: 200 });
  if (JSON.stringify(userState) !== JSON.stringify(state)) {
    await new Promise((resolve) => {
      setTimeout(() => resolve(void 0), 500);
    });
    return json({ "update": "state", "state": state });
  }
  const update = await new Promise((resolve, reject) => {
    const f_info = fe.add(
      "update",
      async (s) => {
        resolve({ "update": s, "state": state });
      }
    );
    setTimeout(() => {
      fe.remove(f_info.state, f_info.id);
      resolve(void 0);
    }, 6e4);
  });
  if (update)
    return json(update);
  return new Response("");
};
export {
  POST
};
