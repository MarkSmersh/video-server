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

<div class="player-bg">
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
</div>

<style>
	.player-bg {
		background: linear-gradient(
			45deg,
			rgba(44, 255, 0, 1) 0%,
			rgba(0, 0, 0, 0) 50%,
			rgba(255, 0, 0, 1) 100%
		);
		display: flex;
		width: calc(75% - 8px);
		padding: 4px;
		border-radius: 16px;
	}

	.player {
		background-color: var(--secondary);
		border-radius: 16px;
		width: calc(100% - 32px);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 16px;
		gap: 16px;
		max-height: 50%;
		min-height: 200px;
	}

	.dummy {
		background-color: var(--primary);
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 16px;
		min-height: 200px;
		height: 100%;
		/* width: calc(200px / 9 * 16); */
	}

	@media only screen and (max-width: 600px) {
		.player-bg {
			width: calc(100% - 8px);
		}

		.player {
			flex-direction: column;
		}
	}
</style>
