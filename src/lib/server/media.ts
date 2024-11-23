import fs from "fs";

const folder = "/_media/"

export function getMediaDir() {
    return fs.readdirSync(import.meta.dirname + folder);
}

export async function getMediaFile(file: string, start: number = 0) {
    const fileDir = import.meta.dirname + `${folder}${file}`;

    if (!fs.existsSync(fileDir)) {
        return undefined;
    }

    const size = fs.statSync(fileDir).size;

    const fileStream = fs.createReadStream(fileDir, { start: start, end: size - 1 })

    return {
        data: fileStream,
        size: size,
    }
}

export function readMedia() {
    const videos: Record<string, Array<Track>> = {};

    const mediaDir = import.meta.dirname + folder

    fs.readdirSync(mediaDir).forEach((folder) => {
        fs.readdirSync(`${mediaDir}${folder}`).forEach((file) => {

            const [, ext] = file.split(".");
            const fileDest = `${folder}/${file}`;
            const vidExt = ["mp4"];
            const capExt = ["vtt"];

            if (!videos[folder])
                videos[folder] = []

            if (vidExt.includes(ext)) {
                videos[folder].push({
                    type: "video",
                    src: fileDest
                })
            }

            if (capExt.includes(ext)) {
                videos[folder].push({
                    type: "captions",
                    src: fileDest
                })
            }
        })
    })

    return videos;
}

export interface Track {
    src: string,
    type: "video" | "captions"
}