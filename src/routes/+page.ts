import { GET_MOVIES } from '$lib/utils/api';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(GET_MOVIES);
	const data = await response.json();

	return data;
}) satisfies PageLoad;
