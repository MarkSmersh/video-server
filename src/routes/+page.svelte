<script lang="ts">
	import { fade } from 'svelte/transition';
	import { socket } from '$lib/socket';
	import { localState, type State } from '$lib/state';
	import Player from './Player.svelte';

	let s = $state(localState.get());

	socket.on('server:connect', (e: State) => {
		s = e;
	});

	socket.on('server:update', (e: State) => {
		s = e;
	});
</script>

<div class="root">
	<h1>Video Player Server</h1>
	{#if s.state === 'watch'}
		<Player {s} />
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
