import { getGenreById } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const id = url.pathname.split('/').at(-1) || '';
	const data = await getGenreById(id);
	if (!data) throw error(404);
	return data;
}) satisfies PageLoad;
