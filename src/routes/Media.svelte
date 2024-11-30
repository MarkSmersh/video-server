<script lang="ts">
	interface MediaProps {
		movie: string | null;
		chapter: string | null;
		updateMovie: (movie: string | null) => void;
		updateChapter: (chapter: string | null) => void;
	}

	interface Chapter {
		name: string;
		isActive: boolean;
	}

	const { movie, chapter, updateMovie, updateChapter }: MediaProps = $props();

	async function getMovies() {
		const movies: Array<string> = await (await fetch('/api/media/')).json();
		return movies;
	}

	async function getChapters(movie: string) {
		const chapters: Array<string> = await (await fetch(`/api/media/${movie}`)).json();
		return chapters;
	}

	let movies: string[] = $state([]);
	let chapters: Array<Chapter> | null = $state(null);

	$effect(() => {
		getMovies().then((m) => (movies = m));

		if (movie) {
			getChapters(movie).then(
				(c) =>
					(chapters = c.map((v, i) => {
						return { name: c[i], isActive: c[i] === chapter ? true : false };
					}))
			);
		}
	});

	$inspect(chapters);
</script>

<div class="media">
	{#if movie && chapters}
		<div class="chapters">
			<button onclick={() => updateMovie(null)}>Return to Movie</button>
			{#each chapters as c}
				<button
					class={`chapter ${c.isActive ? 'active' : ''}`}
					onclick={() => updateChapter(c.name)}
				>
					{c.name}
				</button>
			{/each}
		</div>
	{:else}
		{#each movies as m}
			<button class="chapter" onclick={() => updateMovie(m)}>{m}</button>
		{/each}
	{/if}
</div>

<style>
	.media {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 50%;
		max-height: 100%;
		overflow-y: scroll;
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
		min-width: 100%;
	}

	.active {
		border: 3px solid darkviolet;
	}

	/* width */
	::-webkit-scrollbar {
		width: 8px;
		border-radius: 8px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 8px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
