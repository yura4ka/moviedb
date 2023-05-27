<script lang="ts">
	import MovieCard from '$lib/components/MovieCard.svelte';
	import type { Genre, Movie } from '@prisma/client';

	export let data: {
		movies: (Movie & {
			genres: Genre[];
		})[];
		total: number;
	};
</script>

<div class="mt-8 grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))] place-items-center gap-6">
	{#each data.movies as m (m.id)}
		<MovieCard data={m} />
	{/each}
</div>
