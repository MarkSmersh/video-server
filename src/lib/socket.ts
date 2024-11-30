import { io } from 'socket.io-client';
import type { State } from './state';

export const socket = io({
	autoConnect: true
});

export function sendUpdate(s: Partial<State>) {
	socket.emit('client:update', s);
}
