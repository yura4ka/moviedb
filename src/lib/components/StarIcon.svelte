<script lang="ts">
	import IoIosStar from 'svelte-icons/io/IoIosStar.svelte';
	export let size: number;
	let className = '';
	export { className as class };
	export let gap = 1;
</script>

<div class="flex items-center gap-{gap} {className}">
	<div class="h-{size} w-{size} text-yellow-400">
		<IoIosStar />
	</div>
	<div><slot /></div>
</div>
