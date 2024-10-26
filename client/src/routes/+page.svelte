<script lang="ts">
    import { onMount } from 'svelte';

    type state = "idle" | "watch";

    // const player = document.getElementById("play") as HTMLVideoElement

    let player = $state() as HTMLVideoElement;

    interface State { // VERY SAFE LOL XD
        state: state,
        video: string | null,
        time: number,
        isPaused: boolean,
    }

    let _state: string = $state("Nothing")
    
    let update: State = $state({
        state: "idle",
        video: null,
        time: 0,
        isPaused: false,
    });

    async function updates() {
        try {
            _state = "waiting for updates..."

            let res = await fetch("http://localhost:8080/updates", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(update)
            })

            if (res.status === 200) {
                let newUpdate: { "state": State, "update": string } = await res.json();

                console.log(player);

                (newUpdate.state.isPaused)
                ? player.pause()
                : player.play()

                const timeDifference = player.currentTime - newUpdate.state.time
                
                if (timeDifference > 3 || timeDifference < -3)
                    player.currentTime = newUpdate.state.time

                update = newUpdate.state;
            }

            _state = "got update!"
        } catch (e) {
            console.log(e);
            await new Promise((resolve) => {
                setTimeout(() => resolve("SOSICHUNCOIJAHJF"), 5000);
            })
        }

        await updates();
    }


    async function info () {
        update = await (
            (await fetch("http://localhost:8080/info")).json()
        )
    }

    async function updateTime(time: number) {
        try {
            await fetch("http://localhost:8080/player?time=" + time)
        } catch (e) {}
    }

    async function updatePause(isPaused: boolean) {
        try {
            await fetch("http://localhost:8080/player?pause=" + isPaused)
        } catch (e) {}
    }

    onMount(async () => {
        await info();
        await updates();
    })

    $inspect(update);


    let videoUrl = $derived("http://localhost:8080/media?video=" + update.video);
</script>

<div>
    <h1>PORNO</h1>
    <button onclick={() => info()}>magic</button>
    <h3>{_state}</h3>

    {#if update.state === "watch"}
        <video
            bind:this={player}
            onplay={() => updatePause(false)}
            onpause={() => updatePause(true)}
            ontimeupdate={(s) => updateTime(s.currentTarget.currentTime)}
            id="play"
            src={videoUrl}
            controls>
            <!-- <source src={videoUrl} type="video/mp4"> -->
            <track kind="captions">
        </video>
        <h1>video yes</h1>
        <button onclick={() => fetch("http://localhost:8080/end")}>END GAY SEX</button>
    {:else}
        <p>no video</p>
        <button onclick={() => fetch("http://localhost:8080/start")}>START GAY SEX</button>
    {/if}

</div>