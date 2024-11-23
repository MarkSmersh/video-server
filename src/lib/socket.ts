import { io } from "socket.io-client";

interface ClientState {
    state?: "idle" | "watch";
    video?: string | null;
    time?: number;
    isPaused?: boolean;
}

export const socket = io({
    autoConnect: true,
});

export function sendUpdate(s: ClientState) {
    socket.emit("client:update", s);
}