<script lang="ts">
    import { onMount } from 'svelte';
	import Video from './Video.svelte';
	import { fade, slide } from 'svelte/transition';

    let url = "http://localhost:8080/api/";

    interface State { // VERY SAFE LOL XD
        state: "idle" | "watch",
        video: string | null,
        time: number,
        isPaused: boolean,
    }
    
    let s: State = $state({
        state: "idle",
        video: null,
        time: 0,
        isPaused: false,
    });

    let vs: Record<string, Array<{
        src: string,
        type: "video" | "captions"
    }>> = $state({});

    async function req(
        route: string,
        method: string = "GET",
        body: Record<string, any> | null = null
    ) {
        let res = await fetch(url + route, {
            method: method,
            headers: body ? {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } : {},
            body: body ? JSON.stringify(body) : null
        })

        let data = await res.json()

        return { status: res.status, data: data }
    }

    async function updates() {
        try {
            let { status, data } = await req("updates", "POST", s);

            if (status === 200) {
                let newUpdate: { "state": State, "update": string } = data;
                vs = (await req("videos")).data

                s = newUpdate.state;
            }
        } catch (e) {
            console.log(e);
            await new Promise((resolve) => {
                setTimeout(() => resolve(null), 5000);
            })
        }

        await updates();
    }

    async function info () {
        s = (await req("info")).data;
    }

    async function videos () {
        vs = (await req("videos")).data
    }

    onMount(async () => {
        await videos();
        await info();
        await updates();
    })

    $inspect(s, vs);
    
</script>

<div class="root">
    <h1>Video Player Server</h1>
    <!-- <button onclick={() => info()}>magic</button> -->

    {#if s.state === "watch"}
        <div class="player-wrapper" transition:fade>
            {#if s.video !== null}
                <Video 
                    time={s.time}
                    isPause={s.isPaused}
                    updatePause={(p) => req("player?pause=" + p)}
                    updateTime={async (t) => {await req("player?time=" + t)}}
                    videoUrl={url + "media?video=" + vs[s.video].find((f) => f.type === "video")?.src}
                    captions={
                        vs[s.video].map((f) => f.type === "captions" ? url + "media?video=" + f.src : "")
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
    }

    .chapters {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 50%;
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