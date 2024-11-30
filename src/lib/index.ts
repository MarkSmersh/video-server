// export type Videos = Record<
// 	string,
// 	Array<{
// 		src: string;
// 		type: 'video' | 'captions';
// 	}>
// >;

export interface Track {
	name: string;
	type: 'video' | 'captions';
}

// FIXME: Base64 slug can be buggy

export async function getMediaFile(path: string) {
	const res = await fetch(`${path}`);
	return res;
}

export function getTrackLinks(
	movie: string | null,
	chapter: string | null,
	media: Array<Track>
): SortedTracks {
	const tracks: SortedTracks = { video: [], captions: [] };

	if (!media || !movie || !chapter) return tracks;

	media.forEach((v) => {
		if (v.type === 'video') {
			tracks.video.push(`/api/media/${movie}/${chapter}/${v.name}`);
		}

		if (v.type === 'captions') {
			tracks.captions.push(`/api/media/${movie}/${chapter}/${v.name}`);
		}
	});

	return tracks;
}

export interface SortedTracks {
	video: Array<string>;
	captions: Array<string>;
}
