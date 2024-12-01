<script lang="ts">
	import { socket } from '$lib/socket';
	import { scale } from 'svelte/transition';

	interface User {
		name: string;
		id: string;
	}

	let users: User[] = $state([]);

	let activeUser: string | null = $state(null);

	socket.on('server:users', (u) => {
		users = u;
	});

	socket.on('server:activity', (u: string) => {
		activeUser = u;
		setTimeout(() => (activeUser = null), 500);
	});

	$inspect(users);
</script>

<div class="users">
	{#each users as u}
		<div
			transition:scale
			class="user"
			class:self={u.id === socket.id}
			class:active={u.id === activeUser}
		>
			<p>{u.name}</p>
		</div>
	{/each}
</div>

<style>
	/* @keyframes action {
        0% {
            box-shadow: 0px 0px 0px violet;
        }
        50% {
            box-shadow: 0px 0px 30px violet;
        }
        100% {
            box-shadow: rgba(red, green, blue, 0);
        }
    } */

	@keyframes action {
		0% {
		}
		25% {
			scale: 110%;
		}
		50% {
			scale: 100%;
		}
		75% {
			scale: 110%;
		}
		100% {
			scale: 100%;
		}
	}

	.users {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		width: 50%;
		gap: 16px;
	}

	.user {
		background-color: violet;
		padding: 8px 16px;
		border-radius: 8px;
		text-align: center;
		align-content: center;
		min-width: 100px;
		flex-grow: 1;
	}

	.self {
		box-shadow: 0px 0px 8px var(--primary-text);
	}

	.active {
		animation: ease-in-out action 0.5s;
	}

	@media only screen and (max-width: 600px) {
		.users {
			width: 100%;
		}
	}
</style>
