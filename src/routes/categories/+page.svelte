<script lang="ts">
	import type { Genre } from '@prisma/client';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	export let data: { genres: Genre[] };
</script>

<svelte:head>
	<title>Категорії</title>
</svelte:head>

<h1 class="mb-10 mt-4 text-center text-6xl font-bold text-stone-800">Категорії</h1>

<div class="mx-8 my-8 flex flex-wrap items-center gap-10">
	<a
		href="categories/create"
		class="flex items-center gap-2 border border-dashed border-teal-600 p-4 text-4xl font-bold text-teal-600 transition-all hover:border-solid hover:border-teal-700 hover:text-teal-700"
	>
		<div class="h-10 w-10">
			<MdAdd />
		</div>
		Додати
	</a>
	{#each data.genres as g (g.id)}
		<a
			href="categories/{g.id}"
			class="text-4xl font-bold text-stone-800 transition hover:text-teal-800">{g.title}</a
		>
	{/each}
</div>
