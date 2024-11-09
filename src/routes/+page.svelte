<script lang="ts">
    import { onMount } from 'svelte';
	import Video from './Video.svelte';
	import { fade, scale } from 'svelte/transition';
	import { req, Updates, type State, type VideoSub } from '$lib';

    let vs: VideoSub = $state({});

    let s: State | null = $state(null)

    let updates = new Updates(onUpdate, {
        state: "idle",
        video: null,
        time: 0,
        isPaused: false
    });
    
    function onUpdate(update: State) {
        s = update;
    }

    async function info() {
        s = (await req("info")).data as State;
    }

    async function videos() {
        vs = (await req("videos")).data as VideoSub;
    }

    onMount(async () => {
        await videos();
        await info();
        updates.listen();
    })

    $inspect(s, vs);
    
</script>

<div class="root">
    <h1>Video Player Server</h1>
    <!-- <button onclick={() => info()}>magic</button> -->
    {#if s !== null && s.state === "watch"}
        <div class="player-wrapper" transition:scale>
            {#if s.video !== null}
                <Video 
                    time={s.time}
                    isPause={s.isPaused}
                    updatePause={async (p) => await req("player?pause=" + p)}
                    updateTime={async (t) => await req("player?time=" + t)}
                    videoUrl={`/api/med?file=` + vs[s.video].find((f) => f.type === "video")?.src}
                    captions={
                        vs[s.video].map((f) => f.type === "captions" ? "/api/med?file=" + f.src : "")
                    }
                />
            {:else}
                No video?
            {/if}
                
            <div class="chapters">
                {#each Object.keys(vs) as v}
                    <button class="chapter" onclick={() => req("set?video=" + v)}>{v}</button>
                {/each}
            </div>
        </div>
        <button class="main" transition:fade onclick={() => req("end")}>End the session</button>
    {:else}
        <button class="main" transition:fade onclick={() => req("start")}>Start the session</button>
    {/if}

</div>

<style scoped>
    .root {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100%;
        color: white;
        font-family: "Roboto", serif;
        font-weight: 400;
        font-style: normal;
        gap: 24px;
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