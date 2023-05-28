<script lang="ts">
	import MovieCard from '$lib/components/MovieCard.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
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
	<a
		href="movies/create"
		class="flex aspect-[300/450] w-[20rem] items-center justify-center rounded-lg border-2 border-dashed border-teal-600 text-xl font-bold text-teal-600 transition hover:border-solid hover:border-teal-700 hover:text-teal-700"
	>
		<div class="h-7 w-7">
			<MdAdd />
		</div>
		Додати
	</a>
	{#each data.movies as m (m.id)}
		<MovieCard data={m} />
	{/each}
</div>
