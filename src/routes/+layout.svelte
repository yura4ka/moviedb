<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';

	const currentPath = $page.url.pathname.split('/').at(-1);
	const generateLinkStyle = (path: string) =>
		path === currentPath ? 'text-teal-700' : 'hover:text-teal-700 transition';
</script>

<nav>
	<div class="mx-auto flex max-w-6xl items-center justify-between py-4">
		<h1 class="text-4xl font-bold text-teal-700">MovieDB</h1>
		<ul class="flex gap-6 text-xl">
			<li><a href="/" class={generateLinkStyle('')}>Фільми</a></li>
			<li><a href="/categories" class={generateLinkStyle('categories')}>Категорії</a></li>
			<li><a href="/stars" class={generateLinkStyle('stars')}>Зірки</a></li>
		</ul>
	</div>
</nav>
<slot />
