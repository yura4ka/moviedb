<script lang="ts">
	import EditButton from '$lib/components/EditButton.svelte';
	import MovieCard from '$lib/components/MovieCard.svelte';
	import RemoveButton from '$lib/components/RemoveButton.svelte';
	import type { TGenre } from '$lib/utils/types';

	export let data: TGenre;
</script>

<svelte:head>
	<title>Категорія: {data.title}</title>
</svelte:head>

<h1 class="mb-10 mt-4 flex items-baseline justify-center gap-2 text-5xl font-bold text-stone-800">
	<p class="pr-4">Фільми з категорією: {data.title}</p>
	<EditButton href="./create?id={data.id}" />
	<RemoveButton />
</h1>

<div
	class="mx-2 my-8 grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] place-items-center gap-2 gap-y-12"
>
	{#each data.movies as m (m.id)}
		<MovieCard data={m} />
	{/each}
</div>
