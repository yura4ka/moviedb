import type { z } from 'zod';
import type { changeMovieSchema, createMovieSchema } from './schemas';
import type { TMovie } from './types';

const HOST = 'http://localhost:5173/api/';

export const GET_MOVIES = HOST + 'movies';
export const GET_GENRES = HOST + 'genres';
export const GET_STARS = HOST + 'people';

type TAddMovie = z.infer<typeof createMovieSchema>;
type TChangeMovie = z.infer<typeof changeMovieSchema>;

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

	return id as string;
}

export async function changeMovie(movie: TChangeMovie) {
	const result = await fetch(GET_MOVIES, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(movie)
	});
	const data = await result.json();
	return result.ok && data.success === true;
}

export async function removeMovie(id: string) {
	const result = await fetch(GET_MOVIES, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id })
	});
	const data = await result.json();
	return result.ok && data.success === true;
}

export async function getMovieById(id: string) {
	const response = await fetch(GET_MOVIES + '/' + id);
	if (!response.ok) return undefined;

	const data = await response.json();
	return data as TMovie;
}
