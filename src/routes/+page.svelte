<script lang="ts">
	import { fade } from 'svelte/transition';
	import { socket } from '$lib/socket';
	import { localState, type State } from '$lib/state';
	import Player from './Player.svelte';
	import Users from './Users.svelte';

	let s = $state(localState.get());

	socket.on('server:connect', (e: State) => {
		s = e;
		socket.emit('client:users');
	});

	socket.on('server:update', (e: State) => {
		socket.emit('client:users');
		s = e;
	});
</script>

<div class="root">
	<p class="selflike">
		Made by <a target="_blank" href="https://github.com/marksmersh">MarkSmersh</a>
	</p>
	<h1>Video Player Server</h1>
	{#if s.state === 'watch'}
		<Player {s} />
		<Users />
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
	:global(*) {
		--primary: #222222;
		--secondary: violet;

		--primary-text: white;
		--secondary--text: white;
	}

	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		min-height: 100%;
		color: var(--primary-text);
		font-family: 'Roboto', serif;
		font-weight: 400;
		font-style: normal;
		gap: 24px;
	}

	.main {
		padding: 8px;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
	}

	.selflike {
		font-size: 20px;
		position: fixed;
		right: 20px;
		bottom: 20px;
		font-family: monospace;

		a {
			color: var(--primary-text);
		}
	}

	@media only screen and (max-width: 1000px) {
		.root {
			width: calc(100vw - 32px);
			margin: 16px;
		}
	}
</style>
