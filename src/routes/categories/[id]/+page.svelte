<script lang="ts">
	import { goto } from '$app/navigation';
	import EditButton from '$lib/components/EditButton.svelte';
	import MovieCard from '$lib/components/MovieCard.svelte';
	import RemoveButton from '$lib/components/RemoveButton.svelte';
	import { removeGenre } from '$lib/utils/api';
	import type { TGenre } from '$lib/utils/types';

	export let data: TGenre;

	const onRemove = async () => {
		const result = await removeGenre(data.id);
		if (result) goto('/categories');
	};
</script>

<svelte:head>
	<title>Категорія: {data.title}</title>
</svelte:head>

<h1 class="mb-10 mt-4 flex items-baseline justify-center gap-2 text-5xl font-bold text-stone-800">
	<p class="pr-4">Фільми з категорією: {data.title}</p>
	<EditButton href="./create?id={data.id}" />
	<RemoveButton text="категорію {data.title}" onAccept={onRemove} />
</h1>

<div
	class="mx-2 my-8 grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] place-items-center gap-2 gap-y-12"
>
	{#each data.movies as m (m.id)}
		<MovieCard data={m} />
	{/each}
</div>
