import express from "express";
import cors from "cors";
import fs from "fs";
import { randomUUID } from "crypto";

import {  } from "express";

const PORT = 8080;
// const HOST = "localhost";

const app = express();
const r = express.Router()

app.use(cors());
app.use(express.json())
app.use('/api', r);

class FunctionEvent {
    private callback: (
        data: any
    ) => Promise<void>

    constructor(
        callback: (
            data: any
        ) => Promise<void>
    ) {
        this.callback = callback;
    }

    async apply(data: any) {
        await this.callback(
            data
        );
    }
}

interface FunctionEmitterFunctions {
    update: {
        id: string,
        f: FunctionEvent
    }[]
}

class FunctionEmitter {
    private functions: FunctionEmitterFunctions = {
        update: [],
    }

    add(state: keyof FunctionEmitterFunctions, func: FunctionEvent) {
        const id = randomUUID();
        this.functions[state].push({
            id: id,
            f: func
        });
        return { state: state, id: id };
    }

    remove(state: keyof FunctionEmitterFunctions, id: string) {
        this.functions[state] = this.functions[state].filter((_v, _i) => _v.id !== id)
    }

    emit(state: keyof FunctionEmitterFunctions, data: any) {
        this.functions[state].forEach(async (v, i) => {
            v.f.apply(data);
            this.functions[state] = this.functions[state].filter((_v, _i) => _v.id !== v.id)
        })
    }
}

const fe = new FunctionEmitter();

interface State { // VERY SAFE LOL XD
    state: "idle" | "watch",
    video: string | null,
    time: number,
    isPaused: boolean,
}

interface Track {
    src: string,
    type: "video" | "captions"
}

let state: State = {
    state: "idle",
    video: null,
    time: 0,
    isPaused: true
}

r.get("/player", (req, res) => {
    const { time, pause } = req.query;

    if (parseInt(time as string) === state.time) {
        res.sendStatus(208);
        return;
    }

    if (time) {
        state["time"] = parseInt(time as string);
        fe.emit("update", "time")
        res.status(200).send("Time is updated");
        return;
    }

    if (pause) {
        state["isPaused"] = (pause === "true") ? true : false;
        fe.emit("update", "pause")
        res.status(200).send("Pause is updated");
        return;
    }

    res.status(400).send("No mama? (no player data)");
})

// r.get("/info", (req, res) => {
//     console.log(res)
//     res.status(200).send(state);
// })

r.get("/info", (req, res) => {
    console.log(res)
    res.sendFile(__dirname + "/media/Some gachi/gachi.mp4");
})

r.get("/videos", (req, res) => {
    let videos: Record<string, Array<Track>> = {};
    
    fs.readdirSync("./media").forEach((folder) => {
        fs.readdirSync(`./media/${folder}`).forEach((file) => {

            const [, ext] = file.split(".");
            const fileDest = `${folder}/${file}`;
            const vidExt = ["mp4", "webm"];
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

    res.status(200).send(videos);
})

r.get("/set", (req, res) => {
    const { video } = req.query;

    if (!video) {
        res.status(400).send("No video?");
        return;
    }

    const videos = fs.readdirSync("./media");

    if (!videos.includes(video as string)) {
        res.status(404).send("No a such video.")
        return;
    }

    state["video"] = video as string;
    state["time"] = 0;
    state["isPaused"] = true;

    fe.emit("update", "video")

    res.status(200).send("Video set succesfully");
})

r.get("/start", (req, res) => {
    if (state.state === "watch") {
        res.status(400).send("Session exists");
        return;
    }

    if (state.state === "idle") {
        state["state"] = "watch";
        fe.emit("update", "state");
        res.status(200).send("Session started");
        return;
    }
})

r.get("/end", (req, res) => {
    if (state.state === "watch") {
        state["state"] = "idle";
        fe.emit("update", "state");
        res.status(200).send("Session is end");
        return;
    }

    if (state.state === "idle") {
        res.status(400).send("No existing session");
        return;
    }
})

r.post("/updates", async (req, res) => {
    const userState = req.body;

    if (!userState) {
        res.status(400).send("Unless laggy")
        return;
    }

    if (
        JSON.stringify(userState) !== JSON.stringify(state)
    ) {
        await new Promise((resolve) => {
            setTimeout(() => resolve("SOSICHUNCOIJAHJF"), 500);
        })
        res.status(200).send({ "update": "state", "state": state })
        return;
    }

    const update = await new Promise((resolve, reject) => {
        const f_info = fe.add(
            "update", 
            new FunctionEvent(
                async (s) => {
                    resolve({ "update": s, "state": state })
                }
            )
        )

        setTimeout(() => {
            fe.remove(f_info.state, f_info.id)
            resolve(undefined)
            // listener.
        }, 60000);
    })

    if (update) {
        res.status(200).send(update)
        return;
    }

    res.status(204).send({})
})

r.get("/media", (req, res) => {
    const { video } = req.query;

    const uri = (__dirname + `/media/${video}`).replaceAll("/", "\\")

    if (!fs.existsSync(uri)) {
        res.status(404).send("No a such video.")
        return;
    }

    res.sendFile(uri)
})

app.listen(PORT, () => {
    const date = new Date().toLocaleString();
    console.log(`Server has started (${date})`);
})