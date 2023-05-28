<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { createMovieSchema } from '$lib/utils/schemas';
	import { z } from 'zod';
	import Button from '$lib/components/Button.svelte';
	import { MPAA, type Role } from '@prisma/client';
	import { addMovie } from '$lib/utils/api';
	import { goto } from '$app/navigation';
	import Select from '$lib/components/Select.svelte';

	export let data: {
		genres: { id: string; title: string }[];
		stars: { id: string; name: string; image: string }[];
	};

	let errors = {
		title: false,
		description: false,
		year: false,
		durationMinutes: false,
		image: false,
		rating: false,
		trailer: false
	};

	$: dataStars = data.stars.map((s) => ({ id: s.id, label: s.name, image: s.image }));

	let form = {
		title: '',
		description: '',
		year: '',
		durationMinutes: '',
		image: '',
		rating: '',
		trailer: '',
		mpaa: [] as MPAA[],
		genres: [] as string[],
		directors: [] as { id: string }[],
		writers: [] as { id: string }[],
		actors: [] as { id: string }[]
	};

	$: checkForm = () =>
		Object.values(errors).every((e) => e === false) &&
		Object.values(form).every(
			(v) => (typeof v === 'string' && v.trim().length > 0) || (Array.isArray(v) && v.length > 0)
		);

	const submitForm = async () => {
		const crew: { personId: string; role: Role }[] = [];
		for (const p of form.directors) crew.push({ personId: p.id, role: 'DIRECTOR' });
		for (const p of form.writers) crew.push({ personId: p.id, role: 'WRITER' });
		for (const p of form.actors) crew.push({ personId: p.id, role: 'STAR' });

		const id = await addMovie({
			title: form.title.trim(),
			description: form.description.trim(),
			image: form.image.trim(),
			trailer: form.trailer.trim(),
			rating: +form.rating,
			year: +form.year,
			durationMinutes: +form.durationMinutes,
			mpaa: form.mpaa[0],
			genres: form.genres.map((g) => ({ title: g })) as [{ title: string }],
			crew
		});

		if (id) goto('/movies/' + id);
	};
</script>

<svelte:head>
	<title>Додати фільм</title>
</svelte:head>

<div class="mb-4 mt-8 grid h-full place-items-center">
	<form
		on:submit|preventDefault={submitForm}
		class="relative grid w-[56rem] max-w-4xl gap-2 rounded-lg border p-6 shadow"
	>
		<h1 class="absolute -top-5 left-5 bg-white text-2xl font-bold text-stone-800">Додати фільм</h1>
		<div class="grid grid-cols-2 items-start gap-8">
			<div class="grid gap-2">
				<Input
					type="text"
					bind:value={form.title}
					label="Назва"
					name="name"
					input={createMovieSchema.shape.title}
					onValidation={(error) => {
						errors.title = error;
						errors = errors;
					}}
				/>
				<Input
					type="text"
					bind:value={form.description}
					label="Опис"
					name="description"
					input={createMovieSchema.shape.description}
					onValidation={(error) => {
						errors.description = error;
						errors = errors;
					}}
				/>
				<Input
					type="number"
					bind:value={form.year}
					min="1500"
					max={`${new Date().getFullYear() + 5}`}
					label="Рік"
					name="year"
					input={z.coerce.number().pipe(createMovieSchema.shape.year)}
					onValidation={(error) => {
						errors.year = error;
						errors = errors;
					}}
				/>
				<Input
					type="number"
					bind:value={form.durationMinutes}
					min="1"
					label="Тривалість (хв.)"
					name="durationMinutes"
					input={z.coerce.number().pipe(createMovieSchema.shape.durationMinutes)}
					onValidation={(error) => {
						errors.durationMinutes = error;
						errors = errors;
					}}
				/>
				<Input
					type="text"
					bind:value={form.image}
					label="Посилання на зображення"
					name="image"
					input={createMovieSchema.shape.image}
					onValidation={(error) => {
						errors.image = error;
						errors = errors;
					}}
				/>
				<Input
					type="text"
					bind:value={form.trailer}
					label="Посилання на трейлер"
					name="trailer"
					input={createMovieSchema.shape.trailer}
					onValidation={(error) => {
						errors.trailer = error;
						errors = errors;
					}}
				/>
				<Input
					type="number"
					bind:value={form.rating}
					step="0.1"
					min="0"
					max="10"
					label="Рейтинг"
					name="rating"
					input={z.coerce.number().pipe(createMovieSchema.shape.rating)}
					onValidation={(error) => {
						errors.rating = error;
						errors = errors;
					}}
				/>
			</div>
			<div class="grid gap-2">
				<Select
					label="MPAA"
					bind:selected={form.mpaa}
					options={Object.values(MPAA)}
					maxSelect={1}
					name="mpaa"
				/>
				<Select
					label="Категорії"
					bind:selected={form.genres}
					options={data.genres.map((g) => g.title)}
					name="genres"
				/>

				<Select
					label="Режисери"
					bind:selected={form.directors}
					options={dataStars}
					name="directors"
					let:option
				>
					<div class="flex items-center gap-4">
						<div
							style="--img: url({option.image}); z-index: 0;"
							class="img relative h-10 w-10 rounded-full before:rounded-full before:bg-top"
						/>
						{option.label}
					</div>
				</Select>

				<Select
					label="Сценаристи"
					bind:selected={form.writers}
					options={dataStars}
					name="writers"
					let:option
				>
					<div class="flex items-center gap-4">
						<div
							style="--img: url({option.image}); z-index: 0;"
							class="img relative h-10 w-10 rounded-full before:rounded-full before:bg-top"
						/>
						{option.label}
					</div>
				</Select>

				<Select
					label="Актори"
					bind:selected={form.actors}
					options={dataStars}
					name="directors"
					let:option
				>
					<div class="flex items-center gap-4">
						<div
							style="--img: url({option.image}); z-index: 0;"
							class="img relative h-10 w-10 rounded-full before:rounded-full before:bg-top"
						/>
						{option.label}
					</div>
				</Select>
			</div>
		</div>

		<Button class="mt-4" disabled={!checkForm()}>Додати</Button>
	</form>
</div>
