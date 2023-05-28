<script lang="ts">
	import IoIosStar from 'svelte-icons/io/IoIosStar.svelte';
	export let size: number;
	let className = '';
	export { className as class };
	export let gap = 1;

	const sizeRem = `${size / 4}rem`;
</script>

<div class="flex items-center gap-{gap} {className}">
	<div style="width: {sizeRem}; height: {sizeRem};" class="text-yellow-400">
		<IoIosStar />
	</div>
	<div><slot /></div>
</div>
