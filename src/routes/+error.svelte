<script>
	import { page } from '$app/stores';
</script>

<div class="px-60 py-32">
	<h1 class="pb-24 text-6xl font-extrabold text-stone-800">
		{#if $page.error?.message === 'Error: 404'}
			<p class="text-8xl">404</p>
		{/if}
		{$page.error?.message === 'Error: 404' ? 'Сторінку не знайдено' : 'Сталася помилка'} :(
	</h1>

	<a
		class="rounded-xl bg-teal-600 px-6 py-4 text-2xl text-stone-50 transition hover:bg-teal-700"
		href="/">На головну</a
	>
</div>
