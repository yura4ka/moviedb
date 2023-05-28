import type { z } from 'zod';
import type { createMovieSchema } from './schemas';

const HOST = 'http://localhost:5173/api/';

export const GET_MOVIES = HOST + 'movies';
export const GET_GENRES = HOST + 'genres';
export const GET_STARS = HOST + 'people';

type TAddMovie = z.infer<typeof createMovieSchema>;

export async function addMovie(movie: TAddMovie) {
	const result = await fetch(GET_MOVIES, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(movie)
	});

	let id = undefined;
	if (result.ok) id = (await result.json()).id;

	return id;
}
