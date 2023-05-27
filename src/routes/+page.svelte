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

<svelte:head>
	<title>Фільми</title>
</svelte:head>

<div
	class="mx-2 my-8 grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] place-items-center gap-2 gap-y-12"
>
	{#each data.movies as m (m.id)}
		<MovieCard data={m} />
	{/each}
</div>
