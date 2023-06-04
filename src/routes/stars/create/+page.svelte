<script lang="ts">
	import { goto } from '$app/navigation';
	import { addPerson, changePerson } from '$lib/utils/api';
	import { createPersonSchema } from '$lib/utils/schemas';
	import type { TPersonFull } from '$lib/utils/types';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { z } from 'zod';

	export let data: { person: TPersonFull | undefined };

	const dateToString = (date: Date) => {
		const iso = date.toISOString();
		return iso.substring(0, iso.indexOf('T'));
	};

	const person = data.person;
	const today = dateToString(new Date());

	let errors = {
		name: false,
		bio: false,
		birthday: false,
		image: false
	};

	let form = {
		name: person?.name ?? '',
		bio: person?.bio ?? '',
		birthday: person ? dateToString(new Date(person.birthday)) : today,
		image: person?.image ?? ''
	};

	$: checkForm = () =>
		Object.values(errors).every((e) => e === false) &&
		Object.values(form).every(
			(v) => (typeof v === 'string' && v.trim().length > 0) || (Array.isArray(v) && v.length > 0)
		);

	const submitForm = async () => {
		let isSuccess = false;
		let id = person?.id;

		const body = {
			name: form.name.trim(),
			bio: form.bio.trim(),
			birthday: new Date(form.birthday),
			image: form.image.trim()
		};

		if (id !== undefined) {
			isSuccess = await changePerson({ id, ...body });
		} else {
			id = await addPerson(body);
			isSuccess = !!id;
		}

		if (isSuccess) goto('/stars/' + id);
	};
</script>

<svelte:head>
	<title>{person ? 'Редагувати' : 'Додати'} зірку</title>
</svelte:head>

<div class="mb-4 mt-16 grid h-full place-items-center">
	<form
		on:submit|preventDefault={submitForm}
		class="relative grid min-w-[42rem] gap-2 rounded-lg border p-6 shadow"
	>
		<h1 class="absolute -top-5 left-5 bg-white text-2xl font-bold text-stone-800">
			{person ? 'Редагувати' : 'Додати'} зірку
		</h1>
		<div class="grid items-start gap-2">
			<Input
				type="text"
				bind:value={form.name}
				label="Назва"
				name="name"
				input={createPersonSchema.shape.name}
				onValidation={(error) => {
					errors.name = error;
					errors = errors;
				}}
			/>
			<Input
				type="date"
				bind:value={form.birthday}
				min="1500-01-01"
				max={today}
				label="День народження"
				name="birthday"
				input={z.coerce.date().pipe(createPersonSchema.shape.birthday)}
				onValidation={(error) => {
					errors.birthday = error;
					errors = errors;
				}}
			/>
			<Input
				type="text"
				bind:value={form.bio}
				label="Біографія"
				name="name"
				input={createPersonSchema.shape.bio}
				onValidation={(error) => {
					errors.bio = error;
					errors = errors;
				}}
			/>
			<Input
				type="text"
				bind:value={form.image}
				label="Посилання на зображення"
				name="image"
				input={createPersonSchema.shape.image}
				onValidation={(error) => {
					errors.image = error;
					errors = errors;
				}}
			/>
		</div>

		<Button class="mt-4" disabled={!checkForm()}>{person ? 'Редагувати' : 'Додати'}</Button>
	</form>
</div>
