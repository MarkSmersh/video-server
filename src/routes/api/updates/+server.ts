import { json, type RequestHandler } from "@sveltejs/kit";
import { state, ee } from "$lib/server";

export const POST: RequestHandler = async ({ request, cookies }) => {
    let session = cookies.get("session");

    if (!session) {
        cookies.set("session", crypto.randomUUID(), { path: "/" });
        session = cookies.get("session");
    }

    if (!session) {
        return new Response("Bebra", { status: 500 });
    }
    
    const userState = (await request.json());
    
    if (!userState) {
        await new Promise((resolve) => {
            setTimeout(() => resolve(undefined), 500);
        })
        return new Response("No user state", { status: 400 })
    }

    if (JSON.stringify(userState) !== JSON.stringify(state)) {
        // FIXME: REMOVE THIS AND YOU WILL GOT A MACHINGE GUN SIMULATOR
        await new Promise((resolve) => {
            setTimeout(() => resolve(undefined), 500);
        })
        return json(state);
    }

    const update = await new Promise((resolve) => {
        ee.add(
            session, 
            async () => {
                resolve(state)
            }
        )

        setTimeout(() => {
            ee.remove(session)
            resolve(undefined)
        }, 5000);
    })

    if (update)
        return json(update)

    return new Response();
}