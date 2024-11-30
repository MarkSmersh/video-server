import express from 'express';
import { webSocketServer } from './server/socket';
import { getFile, getMedia, getChapters, getMovies } from './server/media';
import path from 'path';

const app = express();
const r = express.Router();

const PORT = 1488;

if (process.env.NODE_ENV == 'production') {
	import('./build/handler').then((h) => {
		app.use(h.handler);
	});
}

r.get('/media/:movie?/:chapter?/:file?', (req, res) => {
	const { movie, chapter, file } = req.params;

	if (file && chapter && movie) {
		const mediaPath = getFile(movie, chapter, file);

		if (!path) {
			res.status(404).send('File not found.');
			return;
		}

		const absolutePath = path.resolve(import.meta.dirname + mediaPath);
		res.sendFile(absolutePath);
		return;
	}

	if (chapter && movie) {
		const chapterFiles = getMedia(movie, chapter);

		if (!chapterFiles) {
			res.status(404).send('No files in this chapter or no such chapter.');
			return;
		}

		res.send(chapterFiles);
		return;
	}

	if (movie) {
		const chapters = getChapters(movie);

		if (!chapters) {
			res.status(404).send('No such movie.');
			return;
		}

		res.send(chapters);
		return;
	}

	const movies = getMovies();

	res.send(movies);
});

app.use('/api', r);

const server = app.listen(PORT, () => {
	console.log('Server started at port ' + PORT);
});

webSocketServer(server);
