export type Videos = Record<
	string,
	Array<{
		src: string;
		type: 'video' | 'captions';
	}>
>;

// FIXME: Base64 slug can be buggy

export async function getMediaFile(base64: string) {
	const res = await fetch(`/api/media/${base64}`);
	return res;
}

export function getTrackLinks(video: Videos[keyof Videos] | null): Tracks {
	const tracks: Tracks = { video: [], captions: [] };

	if (!video) return tracks;

	video.forEach((v) => {
		if (v.type === 'video') {
			tracks.video.push('/api/media/' + btoa(v.src));
		}

		if (v.type === 'captions') {
			tracks.captions.push('/api/media/' + btoa(v.src));
		}
	});

	return tracks;
}

interface Tracks {
	video: Array<string>;
	captions: Array<string>;
}
