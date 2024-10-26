import express from "express";
import cors from "cors";
import fs from "fs";
import { EventEmitter } from "stream";
import { randomUUID } from "crypto";

const PORT = 8080;
// const HOST = "localhost";

const app = express();

app.use(cors());
app.use(express.json())

type state = "idle" | "watch";

const event = new EventEmitter();

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
        console.log(this.functions);
        this.functions[state].forEach(async (v, i) => {
            v.f.apply(data);
            this.functions[state] = this.functions[state].filter((_v, _i) => _v.id !== v.id)
        })
    }
}

const fe = new FunctionEmitter();

interface State { // VERY SAFE LOL XD
    state: state,
    video: string | null,
    time: number,
    isPaused: boolean,
}

let state: State = {
    state: "idle",
    video: null,
    time: 0,
    isPaused: true
}

app.get("/player", (req, res) => {
    const { time, pause } = req.query;

    if (time && parseInt(time as string) !== state.time) {
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

app.get("/info", (req, res) => {
    res.status(200).send(state);
})

app.get("/videos", (req, res) => {
    const videos = fs.readdirSync("./media");

    res.status(200).send(videos);
})

app.get("/set", (req, res) => {
    const { sex, video } = req.query;

    if (sex) {
        res.status(400).send("Sex is bad. Kill sex. NOW.");
        return;
    }

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

    fe.emit("update", "video")

    res.status(200).send("Video set succesfully");
})

app.get("/start", (req, res) => {
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

app.get("/end", (req, res) => {
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

app.post("/updates", async (req, res) => {
    const timestamp = Date.now();
    console.log(`| ${timestamp} listens`);
    
    const userState = req.body;

    if (!userState) {
        res.status(400).send("Unless laggy")
        return;
    }

    if (
        JSON.stringify(userState) !== JSON.stringify(state)
    ) {
        console.log(`| ${timestamp} isnt same`);
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

    console.log(`| ${timestamp} ends`);

    if (update) {
        console.log("Update sent")
        res.status(200).send(update)
        return;
    }

    res.sendStatus(204);
})

app.get("/media", (req, res) => {
    const { video } = req.query;

    const videos = fs.readdirSync("./media");

    if (!videos.includes(video as string)) {
        res.status(404).send("No a such video.")
        return;
    }

    res.sendFile( __dirname + `/media/${video}`)
})

app.listen(PORT, () => {
    console.log("Server has been started");
})