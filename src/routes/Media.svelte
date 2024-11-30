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
			<div class="header">
				<p class="title">{movie}</p>
				<button class="return" onclick={() => updateMovie(null)}>Movies</button>
				/
				<button class="return" onclick={() => updateChapter(null)}>Chapters</button>
			</div>
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
		<div class="header">
			<button class="return" onclick={() => updateMovie(null)}>Movies</button>
		</div>
		<div class="movies">
			{#each movies as m}
				<button class="chapter" onclick={() => updateMovie(m)}>{m}</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.media {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-height: 100%;
	}

	.title {
		font-weight: 600;
	}

	.return {
		background-color: transparent;
		cursor: pointer;
		color: var(--primary-text);
		font-size: 1em;
	}

	.return:hover {
		text-decoration: underline;
	}

	.movies,
	.chapters {
		display: flex;
		flex-direction: column;
		width: calc(100% - 16px);
		gap: 8px;
		overflow-y: scroll;
		padding: 0px 16px 0px 0px;
	}

	.chapter {
		text-align: left;
		width: calc(100% - 16px);
		padding: 8px 8px;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
		background-color: var(--primary);
		color: white;
		text-wrap-mode: wrap;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		overflow: hidden;
		min-height: fit-content;
		min-width: 100%;
	}

	.active {
		box-shadow: 0px 0px 8px var(--primary-text);
	}

	/* width */
	::-webkit-scrollbar {
		width: 8px;
		border-radius: 8px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: var(--secondary);
		border-radius: 8px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: var(--primary);
		border-radius: 8px;
	}
</style>
