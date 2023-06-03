import { GET_GENRES } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const id = url.pathname.split('/').at(-1) || '';
	const response = await fetch(GET_GENRES + '/' + id);
	if (!response.ok) throw error(404);
	const data = response.json();
	return data;
}) satisfies PageLoad;
