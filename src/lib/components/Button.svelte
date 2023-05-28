<script lang="ts">
	export let disabled = false;
	let className = '';
	export { className as class };
</script>

<button
	{disabled}
	class="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white outline-none transition {disabled
		? 'opacity-50'
		: 'hover:bg-teal-700 focus:ring-4 focus:ring-teal-700'} {className}"
>
	<slot />
</button>
