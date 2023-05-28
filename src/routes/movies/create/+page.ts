import { GET_GENRES, GET_STARS } from '$lib/utils/api';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const data = await Promise.all([
		fetch(GET_GENRES).then((r) => r.json()),
		fetch(GET_STARS).then((r) => r.json())
	]);

	return { genres: data[0], stars: data[1] };
}) satisfies PageLoad;
