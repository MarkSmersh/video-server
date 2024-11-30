<script lang="ts">
	import { scale } from 'svelte/transition';
	import Video from './Video.svelte';
	import Media from './Media.svelte';
	import { localState, type State } from '$lib/state';
	import { getTrackLinks, type SortedTracks, type Track } from '$lib';

	interface PlayerProps {
		s: State;
	}

	const { s }: PlayerProps = $props();

	async function getMedia(): Promise<Array<Track>> {
		const res = await (await fetch(`/api/media/${s.movie}/${s.chapter}`)).json();

		return res ? res : [];
	}

	let media: Array<Track> = $state([]);

	let tracks: SortedTracks = $derived(getTrackLinks(s.movie, s.chapter, media));

	$effect(() => {
		if (s.movie && s.chapter) {
			getMedia().then((m) => (media = m));
		} else {
			media = [];
		}
	});
</script>

<div class="player" transition:scale>
	{#if s.chapter !== null}
		<Video
			updatePause={async (p) => localState.setPause(p)}
			updateTime={async (t) => localState.setTime(t)}
			videos={tracks.video}
			captions={tracks.captions}
			time={s.time}
			isPause={s.isPaused}
		/>
	{:else}
		<div class="dummy">Video is not chosen</div>
	{/if}

	<Media
		movie={s.movie}
		chapter={s.chapter}
		updateChapter={(c) => localState.setChapter(c)}
		updateMovie={(m) => localState.setMovie(m)}
	/>
</div>

<style>
	.player {
		background-color: violet;
		border-radius: 16px;
		width: fit-content;
		/* width: 100%; */
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 16px;
		gap: 16px;
		max-height: 50%;
		min-height: 200px;
	}

	.dummy {
		height: 100%;
		background-color: #222222;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 16px;
		height: 200px;
		width: calc(200px / 9 * 16);
	}
</style>
