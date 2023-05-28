<script lang="ts">
	import MultiSelect from 'svelte-multiselect';
	export let label: string;
	export let name: string;
	export let options: unknown;
	export let selected: unknown;
	export let maxSelect: number | null = null;
</script>

<div>
	<p class="mb-2 text-sm font-medium text-stone-900">{label}</p>
	<MultiSelect
		bind:selected
		{maxSelect}
		{options}
		{name}
		--sms-padding="0.5rem"
		--sms-border-radius="0.5rem"
		--sms-bg="#fafaf9"
		--sms-border="1px solid #d6d3d1"
		--sms-focus-border="1px solid #0d9488"
		let:option
	>
		<svelte:fragment slot="option">
			<slot {option}>
				{option.label || option || ''}
			</slot>
		</svelte:fragment>
	</MultiSelect>
</div>
