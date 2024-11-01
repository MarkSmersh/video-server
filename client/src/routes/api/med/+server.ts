import { type RequestHandler } from "@sveltejs/kit";
import { getMediaFile } from "$lib/server";

// Godlike

export const GET: RequestHandler = async ({ url, request }) => {
    const file = url.searchParams.get("file");
    const range = request.headers.get("range");

    const [start, rangeEnd] = range ? range.replace("bytes=", "").split("-").map((v) => parseInt(v, 10)) as number[] : [0,0]

    if (!file)
        return new Response("No file?", { status: 400 });

    const fileData = await getMediaFile(file, start);

    if (!fileData)
        return new Response("No a such video.", { status: 404 });

    const { data, size } = fileData;

    const end = rangeEnd ? rangeEnd : size - 1

    if (range) {
        return new Response(data as any, {
            headers: {
                'Content-Type': 'video/mp4',
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': `${(end) - start + 1}`,
            },
            status: 206
        });

    }

    return new Response(data as any, {
        headers: {
            'Content-Length': size.toString(),
            'Content-Type': 'video/mp4',
        },
        status: 200
    });
}