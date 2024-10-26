// import type { PageLoad } from "./$types";

// type state = "idle" | "watch";

// interface State { // VERY SAFE LOL XD
//     state: state,
//     video: string | null,
//     time: number,
//     isPaused: boolean,
// }

// export const load: PageLoad = async ({ }) => {
//     const info: State = await (await fetch("http://localhost:8080/info")).json();

//     return {
//         state: info.state,
//         video: info.video,
//         time: info.time,
//         isPaused: info.isPaused,
//     }
// }