<script lang="ts">
    interface VideoProps {
        videoUrl: string,
        updatePause: (isPause: boolean) => {},
        updateTime: (time: number) => {},
        time: number,
        isPause: boolean
    }

    let {
        updatePause,
        updateTime,
        videoUrl,
        time,
        isPause
    }: VideoProps = $props();

    let player = $state() as HTMLVideoElement;

    

    $effect(() => {
        const timeDiff = player.currentTime - time
        if (timeDiff > 3 || timeDiff < -3)
            player.currentTime = time

        isPause ? player.pause() : player.play()
    })

</script>

<video
    bind:this={player}
    onplay={() => updatePause(false)}
    onpause={() => updatePause(true)}
    ontimeupdate={(s) => updateTime(s.currentTarget.currentTime)}
    src={videoUrl}
    controls>
    <!-- <source src={videoUrl} type="video/mp4"> -->
    <track kind="captions">
</video>

