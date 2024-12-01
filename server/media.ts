import fs from 'fs';

// FIXME: This is very bad. Rewrite with database

const MEDIA_SRC = './media';
const VIDEO_EXT = ['mp4'];
const CAPTION_EXT = ['vtt'];

export function getMovies() {
	const folders = fs.readdirSync(MEDIA_SRC);
	return folders;
}

export function getChapters(movie: string) {
	const movies = getMovies();

	if (!movies.includes(movie)) {
		return;
	}

	const series = fs.readdirSync(`${MEDIA_SRC}/${movie}`);
	return series;
}

export function getMedia(movie: string, chapter: string) {
	const files: Array<Track> = [];

	const chapters = getChapters(movie);

	if (!chapters || !chapters.includes(chapter)) {
		return;
	}

	fs.readdirSync(`${MEDIA_SRC}/${movie}/${chapter}`).forEach((file) => {
		const [, ext] = file.split('.');

		if (VIDEO_EXT.includes(ext)) {
			files.push({
				type: 'video',
				name: file
			});
		}

		if (CAPTION_EXT.includes(ext)) {
			files.push({
				type: 'captions',
				name: file
			});
		}
	});

	if (files.length <= 0) {
		return;
	}

	return files;
}

export function getFile(movie: string, chapter: string, file: string) {
	const files = getMedia(movie, chapter);

	if (!files) {
		return;
	}

	const track = files.find((f) => f.name === file);

	if (!track) {
		return;
	}

	return `/${MEDIA_SRC}/${movie}/${chapter}/${track.name}`;
}

export interface Track {
	name: string;
	type: 'video' | 'captions';
}
