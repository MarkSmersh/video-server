<script lang="ts">
    import { onMount } from 'svelte';
	import Video from './Video.svelte';

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

    async function req(
        route: string,
        method: string = "GET",
        body: Record<string, any> | null = null
    ) {
        let url = "http://localhost:8080/api/";

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

            console.log(status)

            if (status === 200) {
                let newUpdate: { "state": State, "update": string } = data;

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

    onMount(async () => {
        await info();
        await updates();
    })

    $inspect(s);

    
</script>

<div>
    <h1>PORNO</h1>
    <!-- <button onclick={() => info()}>magic</button> -->

    {#if s.state === "watch"}
        <Video
            time={s.time}
            isPause={s.isPaused}
            updatePause={(p) => req("player?pause=" + p)}
            updateTime={(t) => req("player?time=" + t)}
            videoUrl={"http://localhost:8080/api/media?video=" + s.video}
        />
        <h1>video yes</h1>
        <button onclick={() => req("end")}>END GAY SEX</button>
    {:else}
        <p>no video</p>
        <button onclick={() => req("start")}>START GAY SEX</button>
    {/if}

</div>