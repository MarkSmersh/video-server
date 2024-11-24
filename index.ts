import express from 'express';
import { webSocketServer } from './socket';

const app = express();

if ((process.env.NODE_ENV == 'production')) {
	import('./build/handler').then((h) => {
		app.use(h.handler);
	});
}

const PORT = 1488;

const server = app.listen(PORT, () => {
	console.log('Server started at port ' + PORT);
});

webSocketServer(server);
