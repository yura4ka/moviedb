<script lang="ts">
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import IoMdClose from 'svelte-icons/io/IoMdClose.svelte';

	export let text: string;
	export let onAccept: () => void;

	let dialog: HTMLDialogElement;
</script>

<button
	on:click={() => dialog.showModal()}
	class="h-7 w-7 text-red-600 transition hover:text-red-800"
>
	<MdDelete />
</button>

<dialog
	bind:this={dialog}
	class="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-stone-50 p-8 shadow-lg"
>
	<button
		on:click={() => dialog.close()}
		class="absolute right-4 top-4 h-6 w-6 text-stone-400 transition hover:text-stone-500"
	>
		<IoMdClose />
	</button>
	<h6 class="pb-4 text-3xl font-bold text-stone-800">Підтвердьте дію</h6>
	<p class="pb-4 text-xl text-stone-800">
		Ви впевнені, що хочете <span class="font-bold text-red-600">видалити {text}?</span>
	</p>
	<div class="flex gap-4 text-base">
		<button
			class="rounded-xl bg-teal-600 px-3 py-2.5 text-stone-50 transition hover:bg-teal-700"
			on:click={() => {
				onAccept();
				dialog.close();
			}}
		>
			Підтвердити
		</button>
		<button
			class="rounded-xl bg-stone-200 px-3 py-2.5 text-stone-800 transition hover:bg-stone-300"
			on:click={() => dialog.close()}
		>
			Скасувати
		</button>
	</div>
</dialog>
