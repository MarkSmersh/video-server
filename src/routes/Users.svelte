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
        setTimeout(() => activeUser = null, 500)
    })

    $inspect(users)
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
        0% {}
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
		gap: 16px;
	}

	.user {
        background-color: violet;
        padding: 8px 16px;
        border-radius: 8px;
        flex: 1;
        text-align: center;
        align-content: center;
	}

    .self {
        border: 3px solid darkviolet;
    }

    .active {
        animation: ease-in-out action .5s;
    }
</style>
