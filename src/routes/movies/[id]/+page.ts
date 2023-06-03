import { error } from '@sveltejs/kit';
import { getMovieById } from '$lib/utils/api';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const id = url.pathname.split('/').at(-1) || '';
	const data = await getMovieById(id);
	if (!data) throw error(404);
	return data;
}) satisfies PageLoad;
