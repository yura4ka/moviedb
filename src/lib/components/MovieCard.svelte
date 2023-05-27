<script lang="ts">
	import type { Genre, Movie } from '@prisma/client';
	import StarIcon from './StarIcon.svelte';

	export let data: Movie & {
		genres: Genre[];
	};

	const getImage = () =>
		data.image
			? data.image
			: new URL('https://placehold.co/384x480/teal/white/?text=' + data.title).href;
</script>

<a
	href="/movies/{data.id}"
	style="--img: url({getImage()});"
	class="img group relative flex aspect-[300/450] w-[20rem] items-end overflow-hidden rounded-lg before:-z-10 before:transition-all hover:before:blur hover:before:brightness-75"
>
	<div
		class="invisible w-full translate-y-full bg-gradient-to-b from-[rgba(255,255,255,0.7)] to-[rgba(255,255,255,0.4)] p-4 transition-all group-hover:visible group-hover:translate-y-0"
	>
		<h5 class="mb-2 text-3xl font-bold text-stone-800">{data.title}</h5>
		<ul class="mb-4 flex items-center gap-2">
			<span>{data.year} р.</span>
			•
			<span>{data.mpaa}</span>
			•
			<span>{data.durationMinutes} хв.</span>
			•
			<StarIcon size={5}>{data.rating}/10</StarIcon>
		</ul>
		<div class="mb-4 line-clamp-5 text-lg text-stone-800">{data.description}</div>
		<div class="mb-2 text-lg font-medium">
			{data.genres.map((g) => g.title).join(', ')}
		</div>
	</div>
</a>
