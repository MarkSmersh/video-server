<script lang="ts">
	import type { Snippet } from 'svelte';
	import Snowfall from './Snowfall.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<Snowfall />
{@render children()}
