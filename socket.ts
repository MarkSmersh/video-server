import { Server } from "socket.io";
import type { ViteDevServer } from "vite";
import { state } from "./state";

export function socketServer(server: ViteDevServer) {
    if (!server.httpServer) return;

    const io = new Server(server.httpServer);

    io.on("connection", (socket) => {
        socket.emit("server:connect", state.get())

        socket.on("client:update", async (e: ClientState) => {                        
            if (e.state) {
                state.setState(e.state)
            }

            if (e.video) {
                state.setVideo(e.video)
            }

            if (e.time) {
                state.setTime(e.time)
            }

            if (e.isPaused !== undefined) {
                state.setPause(e.isPaused)
            }

            // FIXME: Because of issues on the client side
            // there should be some time for client to get
            // and deal with new state

            await new Promise((resolve) => {
                setTimeout(() => resolve(true), 200)
            })

            io.emit("server:update", state.get())
        })
    })
}

interface ClientState {
    state?: "idle" | "watch";
    video?: string | null;
    time?: number;
    isPaused?: boolean;
}