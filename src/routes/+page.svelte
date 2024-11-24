<script lang="ts">
	import { onMount } from 'svelte';
	import Video from './Video.svelte';
	import { fade, scale } from 'svelte/transition';
	import { getTrackLinks, type Videos } from '$lib';
	import { socket } from '$lib/socket';
	import { localState, type State } from '$lib/state';

	let s = $state(localState.get());

	let videos: Videos = $state({});

	let tracks = $derived(getTrackLinks(videos[s.video as string]));

	async function getMedia() {
		videos = await (await fetch('/api/media')).json();
	}

	async function setMediaVideo(v: string) {
		const res = await fetch(`/api/set/${v}`);

		if (res.status === 200) {
			localState.setVideo(v);
		}
	}

	onMount(async () => {
		await getMedia();
	});

	socket.on('server:connect', (e: State) => {
		s = e;
	});

	socket.on('server:update', (e: State) => {
		s = e;
	});

	$inspect(tracks);
</script>

<div class="root">
	<h1>Video Player Server</h1>
	{#if s.state === 'watch'}
		<div class="player-wrapper" transition:scale>
			{#if s.video !== null}
				<Video
					updatePause={async (p) => localState.setPause(p)}
					updateTime={async (t) => localState.setTime(t)}
					videos={tracks.video}
					captions={tracks.captions}
					time={s.time}
					isPause={s.isPaused}
				/>
			{:else}
				No video?
			{/if}

			<div class="chapters">
				{#each Object.keys(videos) as v}
					<button class="chapter" onclick={() => setMediaVideo(v)}>{v}</button>
				{/each}
			</div>
		</div>
		<button class="main" transition:fade onclick={() => localState.setState('idle')}
			>End the session</button
		>
	{:else}
		<button class="main" transition:fade onclick={() => localState.setState('watch')}
			>Start the session</button
		>
	{/if}
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100%;
		color: white;
		font-family: 'Roboto', serif;
		font-weight: 400;
		font-style: normal;
		gap: 24px;
	}

	/* width */
	::-webkit-scrollbar {
		width: 8px;
		border-radius: 8px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 8px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	.player-wrapper {
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
	}

	.chapters {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 50%;
		max-height: 100%;
		overflow-y: scroll;
	}

	.main {
		padding: 8px;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
	}

	.chapter {
		text-align: left;
		width: calc(100% - 16px);
		padding: 8px 8px;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
		background-color: #222222;
		color: white;
		text-wrap-mode: wrap;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		overflow: hidden;
		min-height: fit-content;
	}

	@media only screen and (max-width: 600px) {
		.root {
			height: fit-content;
		}

		.player-wrapper {
			flex-direction: column;
			width: calc(100% - 64px);
		}

		.chapters {
			width: 100%;
		}
	}
</style>
