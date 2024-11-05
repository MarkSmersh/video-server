import { json, type RequestHandler } from "@sveltejs/kit";
import { state, fe } from "$lib/server";

export const POST: RequestHandler = async ({ request }) => {    
    const userState = await request.json();

    if (!userState) 
        return new Response("Unless laggy", { status: 200 })

    if (JSON.stringify(userState) !== JSON.stringify(state)) {
        // FIXME: REMOVE THIS AND YOU WILL GOT A MACHINGE GUN SIMULATOR
        await new Promise((resolve) => {
            setTimeout(() => resolve(undefined), 500);
        })
        return json({ "update": "state", "state": state });
    }

    const update = await new Promise((resolve, reject) => {
        const f_info = fe.add(
            "update", 
            async (s) => {
                resolve({ "update": s, "state": state })
            }
        )

        setTimeout(() => {
            fe.remove(f_info.state, f_info.id)
            resolve(undefined)
        }, 5000);
    })

    if (update)
        return json(update)

    return new Response("");
}