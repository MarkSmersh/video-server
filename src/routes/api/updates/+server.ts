import { json, type RequestHandler } from "@sveltejs/kit";
import { state, ee } from "$lib/server";

export const POST: RequestHandler = async ({ request, cookies }) => {
    let session = cookies.get("session");

    if (!session) {
        session = cookies.get("session");
        return new Response("No session", { status: 400 });
    }
    
    const userState = (await request.json());
    console.log(userState);
    
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
        const uuid = ee.add(
            session, 
            async () => {
                resolve(state)
            }
        )

        setTimeout(() => {
            ee.remove(session, uuid);
            resolve(undefined);
        }, 60000);
    })

    if (update)
        return json(update)

    return new Response();
}