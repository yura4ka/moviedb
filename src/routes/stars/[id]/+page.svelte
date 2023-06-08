<script lang="ts">
	import { goto } from '$app/navigation';
	import EditButton from '$lib/components/EditButton.svelte';
	import RemoveButton from '$lib/components/RemoveButton.svelte';
	import StarIcon from '$lib/components/StarIcon.svelte';
	import { removePerson } from '$lib/utils/api';
	import type { TPersonFull } from '$lib/utils/types';

	export let data: TPersonFull;

	const onRemove = async () => {
		const result = await removePerson(data.id);
		if (result) goto('/stars');
	};
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<div class="mx-auto mb-8 mt-10 max-w-7xl">
	<div class="flex items-start gap-6">
		<div style="--img: url({data.image});" class="img relative aspect-[0.66] w-60 shrink-0" />
		<div>
			<div class="flex items-center justify-between gap-2">
				<h1 class="pb-4 text-5xl font-bold text-stone-800">
					{data.name}
					<span class="text-lg font-normal text-stone-600">
						({new Date(data.birthday).getFullYear()} р.)
					</span>
				</h1>
				<div class="flex gap-2">
					<EditButton href="/stars/create?id={data.id}" />
					<RemoveButton text="людину {data.name}" onAccept={onRemove} />
				</div>
			</div>
			<p class="pb-4 text-justify text-xl text-stone-700">{data.bio}</p>
		</div>
	</div>

	{#if data.movieCrew.length > 0}
		<h5 class="test-stone-800 py-8 text-3xl font-bold">Ролі:</h5>
		<div class="grid grid-cols-2 gap-10">
			{#each data.movieCrew as m (m.movie.id + m.role)}
				<a
					href="/movies/{m.movie.id}"
					class="group flex items-start gap-4 rounded-lg border border-stone-200 p-2 transition hover:shadow"
				>
					<div
						style="--img: url({m.movie.image})"
						class="img relative aspect-[350/450] w-24 before:rounded"
					/>
					<div class="text-stone-800">
						<p class="text-lg font-bold group-hover:text-teal-700 group-hover:underline">
							{m.movie.title}
						</p>
						<StarIcon size={4}>{m.movie.rating}</StarIcon>
						<p class="font-bold">
							{m.role === 'DIRECTOR' ? 'Режисер' : m.role === 'STAR' ? 'Актор' : 'Сценарист'}
						</p>
						<p class="text-sm text-stone-600">{m.movie.year}</p>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
