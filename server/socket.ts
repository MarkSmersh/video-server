import { Server } from 'socket.io';
import { ClientState, state } from './state';
import http2 from 'http2';
import https from 'https';
import http from 'http';

export function webSocketServer(
	httpServer: http.Server | https.Server | http2.Http2SecureServer | http2.Http2Server
) {
	const io = new Server(httpServer);

	io.on('connection', (socket) => {
		socket.emit('server:connect', state.get());

		socket.on('client:update', async (e: ClientState) => {
			if (e.state) {
				state.setState(e.state);
			}

			if (e.movie !== undefined) {
				state.setMovie(e.movie);
				state.setChapter(null);
			}

			if (e.chapter !== undefined) {
				state.setTime(0);
				state.setChapter(e.chapter);
			}

			if (e.time) {
				state.setTime(e.time);
			}

			if (e.isPaused !== undefined) {
				state.setPause(e.isPaused);
			}

			// FIXME: Because of issues on the client side
			// there should be some time for client to get
			// and deal with new state

			await new Promise((resolve) => {
				setTimeout(() => resolve(true), 200);
			});

			io.emit('server:update', state.get());
		});
	});
}
