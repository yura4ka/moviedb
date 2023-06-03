import { GET_GENRES, getGenreById } from '$lib/utils/api';
import type { TGenre } from '$lib/utils/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const id = url.searchParams.get('id');
	const [genres, existed] = (await Promise.all([
		fetch(GET_GENRES).then((r) => r.json()),
		new Promise((res) => {
			if (!id) res(undefined);
			else getGenreById(id).then((response) => res(response));
		})
	])) as [unknown, TGenre | undefined];

	return { genres, title: existed?.title, id: existed ? id : undefined };
}) satisfies PageLoad;
