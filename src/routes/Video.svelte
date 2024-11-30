<script lang="ts">
	let player = $state<HTMLVideoElement>() as HTMLVideoElement;

	interface VideoProps {
		videos: Array<string>;
		updatePause: (isPause: boolean) => Promise<any>;
		updateTime: (time: number) => Promise<any>;
		time: number;
		isPause: boolean;
		captions: Array<string>;
	}

	let { updatePause, updateTime, videos, time, isPause, captions }: VideoProps = $props();

	$effect(() => {
		const timeDiff = player.currentTime - time;
		if (timeDiff > 1 || timeDiff < -1) player.currentTime = time;

		if (player.paused !== isPause) {
			isPause ? player.pause() : player.play();
		}
	});

	async function updatePauseTime(t: number, p: boolean) {
		await updateTime(t);
		await updatePause(p);
	}

	let isSeeking = $state(false);
</script>

<div class="video">
	<!-- svelte-ignore a11y_media_has_caption -->
	<video
		id="player"
		bind:this={player}
		playsinline
		crossorigin="anonymous"
		onplay={async () => updatePauseTime(player.currentTime, false)}
		onpause={async () => updatePauseTime(player.currentTime, true)}
		ontimeupdate={() => (isSeeking && isPause ? updateTime(player.currentTime) : null)}
		onseeking={() => (isSeeking = true)}
		onseeked={() => (isSeeking = false)}
		controls
		src={videos[0]}
	>
		{#each videos as v}
			<source src={v} type="video/mp4" />
		{/each}
		{#each captions as c}
			<track kind="captions" src={c} />
		{/each}
	</video>
</div>

<style>
	.video {
		border-radius: 16px;
		overflow: hidden;
		width: 100%;
		height: 100%;
		box-shadow: 0px 0px 10px var(--primary-text);
		display: flex;
		flex-basis: 150%;
	}

	#player {
		width: 100%;
		color: brown;
		background-color: black;
		flex: 1;
	}
</style>
