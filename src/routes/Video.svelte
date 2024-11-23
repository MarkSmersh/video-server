<script lang="ts">
    import Plyr from "plyr";
	import { onMount } from "svelte";

    let player = $state<HTMLVideoElement>() as HTMLVideoElement;

    interface VideoProps {
        videos: Array<string>,
        updatePause: (isPause: boolean) => Promise<any>,
        updateTime: (time: number) => Promise<any>,
        time: number,
        isPause: boolean,
        captions: Array<string>
    }

    let {
        updatePause,
        updateTime,
        videos,
        time,
        isPause,
        captions
    }: VideoProps = $props();

    $effect(() => {
        // TODO: Captions are not visible when switching
        // video url, seems it need to be reload manually

        const timeDiff = player.currentTime - time
        if (timeDiff > 1 || timeDiff < -1) // change the numbers depend on what do you prefer more: less - more sync, more - more smooth
            player.currentTime = time

        if (player.paused !== isPause) {
            isPause ? player.pause() : player.play()
        }
    })

    // FIXME: updatePause should work after update time
    // But due to some bug, updatePause doesnt work if awaits
    // So I keep it like this just, so there is bug with player

    async function updatePauseTime(t: number, p: boolean) {
        await updateTime(t);
        await updatePause(p);
    }

    let isSeeking = $state(false);

    // $inspect(time)
</script>

<div class="video-wrapper">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video
        id="player"
        bind:this={player}
        playsinline
        crossorigin="anonymous"
        onplay={async () => updatePauseTime(player.currentTime, false)}
        onpause={async () => updatePauseTime(player.currentTime, true)}
        ontimeupdate={() => isSeeking && isPause ? updateTime(player.currentTime) : null}
        onseeking={() => isSeeking = true}
        onseeked={() => isSeeking = false}
        controls
        src={videos[0]}
        
    >
    {#each videos as v}
        <source src={v} type="video/mp4">
    {/each}
    {#each captions as c}
        <track kind="captions" src={c}>
    {/each}
    </video>
</div>

<style>
    .video-wrapper {
        /* background-color: blueviolet; */
        border-radius: 16px;
        overflow: hidden;
        height: 100%;
        --plyr-color-main: violet;
    }

    #player {
        overflow: hidden;
        box-shadow: 1px;
        width: 100%;
        /* max-height: 50vh; */
        color: brown;
    }
</style>
