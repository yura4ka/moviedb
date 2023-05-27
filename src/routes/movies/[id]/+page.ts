import { GET_MOVIES } from '$lib/utils/api';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const id = url.pathname.split('/').at(-1) || '';

	const response = await fetch(GET_MOVIES + `/${id}`);
	const data = await response.json();

	return data;
}) satisfies PageLoad;
