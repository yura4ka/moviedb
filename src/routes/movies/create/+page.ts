import { GET_GENRES, GET_STARS, getMovieById } from '$lib/utils/api';
import type { TMovie } from '$lib/utils/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const id = url.searchParams.get('id');
	const [genres, stars, existed] = (await Promise.all([
		fetch(GET_GENRES).then((r) => r.json()),
		fetch(GET_STARS).then((r) => r.json()),
		new Promise((res) => {
			if (!id) res(undefined);
			else getMovieById(id).then((response) => res(response));
		})
	])) as [unknown, unknown, TMovie | undefined];

	let movie = undefined;
	if (existed) {
		const directors: { id: string; label: string }[] = [];
		const writers: { id: string; label: string }[] = [];
		const actors: { id: string; label: string }[] = [];

		for (const c of existed.crew) {
			if (c.role === 'DIRECTOR') directors.push({ id: c.person.id, label: c.person.name });
			else if (c.role === 'STAR') writers.push({ id: c.person.id, label: c.person.name });
			else if (c.role === 'WRITER') actors.push({ id: c.person.id, label: c.person.name });
		}

		movie = {
			...existed,
			directors,
			writers,
			actors,
			genres: existed.genres.map((g) => g.title)
		};
	}

	return { genres, stars, movie, id: movie ? id : undefined };
}) satisfies PageLoad;
