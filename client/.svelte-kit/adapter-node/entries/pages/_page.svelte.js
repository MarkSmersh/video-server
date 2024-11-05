import { E as pop, B as push } from "../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  $$payload.out += `<div class="root svelte-1xbwlx8"><h1>Video Player Server</h1> `;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button class="main svelte-1xbwlx8">Start the session</button>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
