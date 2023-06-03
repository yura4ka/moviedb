import { GET_GENRES } from '$lib/utils/api';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(GET_GENRES);
	const genres = await response.json();
	return { genres };
}) satisfies PageLoad;
