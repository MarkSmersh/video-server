<script lang="ts">
    interface VideoProps {
        videoUrl: string,
        updatePause: (isPause: boolean) => Promise<any>,
        updateTime: (time: number) => Promise<any>,
        time: number,
        isPause: boolean,
        captions: Array<string>
    }

    let {
        updatePause,
        updateTime,
        videoUrl,
        time,
        isPause,
        captions
    }: VideoProps = $props();

    let player = $state() as HTMLVideoElement;

    $effect(() => {
        const timeDiff = player.currentTime - time
        if (timeDiff > 2 || timeDiff < -2) // change the numbers depend on what do you prefer more: less - more sync, more - more smooth
            player.currentTime = time

        isPause ? player.pause() : player.play()
    })

    // FIXME: updatePause should work after update time
    // But due to some bug, updatePause doesnt work if awaits
    // So I keep it like this just, so there is bug with player

    async function updatePauseTime(t: number, p: boolean) {
        await updateTime(t);
        await updatePause(p);
    }

    let isSeeking = $state(false)

    $inspect(time)
</script>

<div class="video-wrapper">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video
        crossorigin="anonymous"
        bind:this={player}
        onplay={async () => updatePauseTime(player.currentTime, false)}
        onpause={async () => updatePauseTime(player.currentTime, true)}
        ontimeupdate={() => isSeeking && isPause ? updateTime(player.currentTime) : null}
        src={videoUrl}
        onseeking={() => isSeeking = true}
        onseeked={() => isSeeking = false}
        controls
        >
        <!-- <source src={videoUrl} type="video/mp4"> -->
        {#each captions as c}
            {#if c !== ""}
                <track kind="captions" src={c}>
            {/if}
        {/each}
    </video>
</div>

<style scoped>
    .video-wrapper {
        /* background-color: blueviolet; */
        border-radius: 16px;
    }

    video {
        border-radius: 16px;
        box-shadow: 1px;
        width: 100%;
        max-height: 50vh;
    }
</style>
