<script lang="ts">
    interface VideoProps {
        videoUrl: string,
        updatePause: (isPause: boolean) => {},
        updateTime: (time: number) => {},
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

    let isSeeking = $state(false)
</script>

<div class="video-wrapper">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video
        crossorigin="anonymous"
        bind:this={player}
        onplay={() => updatePause(false)}
        onpause={() => updatePause(true)}
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
