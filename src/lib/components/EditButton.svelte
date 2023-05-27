<script lang="ts">
	import MdEdit from 'svelte-icons/md/MdEdit.svelte';

	export let href: string;
</script>

<a {href} class="h-7 w-7 text-teal-600 transition hover:text-teal-800">
	<MdEdit />
</a>
