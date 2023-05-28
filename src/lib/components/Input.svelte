<script lang="ts">
	import { ZodError, type ZodSchema } from 'zod';

	interface $$Props extends Partial<HTMLInputElement> {
		value: string;
		label: string;
		name: string;
		input?: ZodSchema;
		validate?: (value: string) => string | boolean;
		onValidation?: (isError: boolean) => void;
	}

	export let value: string;
	export let label: string;
	export let name: string;
	export let input: ZodSchema | undefined = undefined;
	export let validate: ((value: string) => string | boolean) | undefined = undefined;
	export let onValidation: ((isError: boolean) => void) | undefined = undefined;

	let error: string | null = null;

	const onChange = (value: string) => {
		try {
			input?.parse(value);
			const validation = validate?.(value);
			if (typeof validation === 'string' || validation === false) {
				error = validation || 'Error!';
				onValidation?.(true);
			} else {
				error = null;
				onValidation?.(false);
			}
		} catch (e) {
			if (e instanceof ZodError) {
				error = e.flatten().formErrors[0] || 'Error!';
				onValidation?.(true);
			}
		}
	};
</script>

<div>
	<label
		for="{name}-input"
		class="mb-2 block text-sm font-medium transition {error ? 'text-red-700' : 'text-stone-900'}"
	>
		{label}
	</label>
	<input
		{...$$restProps}
		bind:value
		on:input={(e) => onChange(e.currentTarget.value)}
		id="{name}-input"
		{name}
		class="block w-full rounded-lg border transition {error
			? 'border-red-300 bg-red-50 text-red-800 focus:border-red-600 focus:ring-red-600'
			: 'border-stone-300 bg-stone-50 text-stone-800 focus:border-teal-600 focus:ring-teal-600'} p-2.5 text-sm outline-none focus:ring-1"
	/>
	{#if typeof error === 'string' && error}
		<p class="pt-px text-sm font-medium text-red-600">{error}</p>
	{/if}
</div>
