<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { createGenreSchema, createMovieSchema } from '$lib/utils/schemas';
	import { z } from 'zod';
	import Button from '$lib/components/Button.svelte';
	import type { Genre } from '@prisma/client';
	import { addGenre, addMovie, changeGenre, changeMovie } from '$lib/utils/api';
	import { goto } from '$app/navigation';
	import Select from '$lib/components/Select.svelte';

	export let data: {
		genres: Genre[];
		title?: string;
		id?: string;
	};

	let errors = {
		title: false
	};

	let form = {
		title: data?.title ?? ''
	};

	$: checkForm = () => form.title.trim().length > 0;

	const submitForm = async () => {
		let isSuccess = false;

		if (data.id !== undefined) {
			isSuccess = await changeGenre(data.id, form.title.trim());
		} else {
			data.id = await addGenre(form.title.trim());
			isSuccess = !!data.id;
		}

		if (isSuccess) goto('/categories/' + data.id);
	};
</script>

<svelte:head>
	<title>{data.id ? 'Редагувати' : 'Додати'} категорію</title>
</svelte:head>

<div class="mb-4 mt-16 grid h-full place-items-center">
	<form
		on:submit|preventDefault={submitForm}
		class="relative grid min-w-[42rem] gap-2 rounded-lg border p-6 shadow"
	>
		<h1 class="absolute -top-5 left-5 bg-white text-2xl font-bold text-stone-800">
			{data.id ? 'Редагувати' : 'Додати'} категорію
		</h1>
		<div class="grid items-start">
			<Input
				type="text"
				bind:value={form.title}
				label="Назва"
				name="name"
				input={createGenreSchema.shape.title}
				validate={(value) =>
					data.genres.some(
						(g) => g.title.toUpperCase() === value.trim().toUpperCase() && g.id !== data.id
					)
						? 'Категорія із такою назвою вже існує!'
						: true}
				onValidation={(error) => {
					errors.title = error;
					errors = errors;
				}}
			/>
		</div>

		<Button class="mt-4" disabled={!checkForm()}>{data.id ? 'Редагувати' : 'Додати'}</Button>
	</form>
</div>
