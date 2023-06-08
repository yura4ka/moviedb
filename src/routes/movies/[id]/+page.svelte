<script lang="ts">
	import { goto } from '$app/navigation';
	import EditButton from '$lib/components/EditButton.svelte';
	import RemoveButton from '$lib/components/RemoveButton.svelte';
	import StarIcon from '$lib/components/StarIcon.svelte';
	import { removeMovie } from '$lib/utils/api';
	import type { TMovie } from '$lib/utils/types';

	type TPerson = {
		id: string;
		name: string;
		image: string;
	};

	export let data: TMovie;

	const directors: TPerson[] = [];
	const writers: TPerson[] = [];
	const stars: TPerson[] = [];

	for (const p of data.crew) {
		if (p.role === 'DIRECTOR') directors.push(p.person);
		else if (p.role === 'STAR') stars.push(p.person);
		else if (p.role === 'WRITER') writers.push(p.person);
	}

	const onRemove = async () => {
		const result = await removeMovie(data.id);
		if (result) goto('/');
	};
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<div class="mx-auto mb-8 mt-10 max-w-7xl">
	<div class="flex justify-between pb-2">
		<h1 class="text-5xl font-bold text-stone-800">{data.title}</h1>
		<div class="flex items-center gap-2">
			<StarIcon size={7} gap={2} class="mr-4 text-2xl">{data.rating}/10</StarIcon>
			<EditButton href="./create?id={data.id}" />
			<RemoveButton text="фільм {data.title}" onAccept={onRemove} />
		</div>
	</div>

	<div class="flex gap-1 pb-2 text-stone-700">
		<span>{data.year} р.</span>
		•
		<span>{data.mpaa}</span>
		•
		<span>{data.durationMinutes} хв.</span>
	</div>

	<div class="flex gap-2 pb-4">
		<img src={data.image} height="420" width="280" alt="img" />
		<iframe
			width="746"
			height="420"
			src={data.trailer}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		/>
	</div>

	<div class="flex gap-2 pb-2 text-teal-900">
		{#each data.genres as g (g.id)}
			<a
				href="/categories/{g.id}"
				class="rounded-full border border-teal-700 px-3 py-px transition hover:bg-teal-600 hover:text-white"
			>
				{g.title}
			</a>
		{/each}
	</div>

	<p class="pb-2 text-lg">{data.description}</p>

	<div class="divide-y text-lg">
		<div class="flex">
			<span class="pr-4 font-bold">{directors.length > 1 ? 'Режисери' : 'Режисер'}</span>
			{#each directors as p (p.id)}
				<a href="/stars/{p.id}" class="pr-2 transition hover:text-teal-800">{p.name}</a>
				<span class="pr-2 text-stone-700 last:hidden">•</span>
			{/each}
		</div>
		<div class="flex">
			<span class="pr-4 font-bold">{directors.length > 1 ? 'Сценаристи' : 'Сценарист'}</span>
			{#each writers as p (p.id)}
				<a href="/stars/{p.id}" class="pr-2 transition hover:text-teal-800">{p.name}</a>
				<span class="pr-2 text-stone-700 last:hidden">•</span>
			{/each}
		</div>
		<div class="flex">
			<span class="pr-4 font-bold">{directors.length > 1 ? 'Актори' : 'Актор'}</span>
			{#each stars as p (p.id)}
				<a href="/stars/{p.id}" class="pr-2 transition hover:text-teal-800">{p.name}</a>
				<span class="pr-2 text-stone-700 last:hidden">•</span>
			{/each}
		</div>
	</div>
</div>
