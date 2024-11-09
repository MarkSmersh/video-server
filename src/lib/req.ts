import type { VideoSub } from "$lib";
import type { State } from "./updates";

export async function req(
    route: string,
    method: string = "GET",
    body: State | null = null
) {
    const res = await fetch("/api/" + route, {
        method: method,
        headers: body ? {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } : {},
        body: body ? JSON.stringify(body) : null
    })

    type ContentType = "text/plain;charset=UTF-8" | "application/json" | null;

    const contentType: ContentType | unknown = res.headers.get("content-type");

    let data: State | VideoSub | string;

    if (contentType === "text/plain;charset=UTF-8")
        data = await res.text();
    else if (contentType === "application/json")
        //TODO: make function, that checks
        // is json object State or VideoSub or sth else
        data = await res.json() as State | VideoSub;
    else
        data = "";

    return { status: res.status, contentType: contentType, data: data }
}