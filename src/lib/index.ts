// place files you want to import through the `$lib` alias in this folder.

export {
    req
} from "./req";

export {
    type State,
    update
} from "./updates";

export type VideoSub = Record<string, Array<{
    src: string,
    type: "video" | "captions"
}>>