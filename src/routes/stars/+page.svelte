<script lang="ts">
	import type { TPerson } from '$lib/utils/types';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';

	export let data: { stars: TPerson[] };
</script>

<svelte:head>
	<title>Зірки</title>
</svelte:head>

<h1 class="mb-10 mt-4 flex items-end justify-center gap-2 text-5xl font-bold text-stone-800">
	<p class="pr-4">Зірки</p>
	<a
		href="stars/create"
		class="rounded-lg border border-teal-600 p-2 text-teal-600 transition hover:bg-teal-600 hover:text-white"
	>
		<div class="h-6 w-6">
			<MdAdd />
		</div>
	</a>
</h1>

<div class="my-8 grid grid-cols-2 gap-16 px-16">
	{#each data.stars as s (s.id)}
		<a
			href="/stars/{s.id}"
			class="group flex items-start gap-6 rounded-lg border border-stone-200 p-4 shadow shadow-stone-200 transition hover:shadow-lg"
		>
			<div
				style="--img: url({s.image})"
				class="img relative aspect-[0.66] w-44 shrink-0 before:rounded"
			/>
			<div class="text-stone-600">
				<p
					class="pb-4 text-2xl font-bold text-stone-800 transition group-hover:text-teal-700 group-hover:underline"
				>
					{s.name}
				</p>
				<p class="mb-4 line-clamp-3 text-lg">{s.bio}</p>

				{#if s.asStar.length > 0}
					<div class="flex">
						<span class="pr-2">Актор:</span>
						{#each s.asStar as m (m.movie.id)}
							<a
								href="/movies/{m.movie.id}"
								class="max-w-[13rem] overflow-hidden text-ellipsis whitespace-nowrap transition before:pr-2 before:content-[','] first-of-type:before:hidden hover:text-teal-700"
								>{m.movie.title}</a
							>
						{/each}
					</div>
				{/if}
				{#if s.asDirector.length > 0}
					<div class="flex">
						<span class="pr-2">Режисер:</span>
						{#each s.asDirector as m (m.movie.id)}
							<a
								href="/movies/{m.movie.id}"
								class="max-w-[13rem] overflow-hidden text-ellipsis whitespace-nowrap transition before:pr-2 before:content-[','] first-of-type:before:hidden hover:text-teal-700"
								>{m.movie.title}</a
							>
						{/each}
					</div>
				{/if}
				{#if s.asWriter.length > 0}
					<div class="flex">
						<span class="pr-2">Сценарист:</span>
						{#each s.asWriter as m (m.movie.id)}
							<a
								href="/movies/{m.movie.id}"
								class="max-w-[13rem] overflow-hidden text-ellipsis whitespace-nowrap transition before:pr-2 before:content-[','] first-of-type:before:hidden hover:text-teal-700"
								>{m.movie.title}</a
							>
						{/each}
					</div>
				{/if}
			</div>
		</a>
	{/each}
</div>
