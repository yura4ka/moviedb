import type { z } from 'zod';
import type {
	changeMovieSchema,
	changePersonSchema,
	createMovieSchema,
	createPersonSchema
} from './schemas';
import type { TGenre, TMovie, TPersonFull } from './types';

const HOST = 'http://localhost:5173/api/';

export const GET_MOVIES = HOST + 'movies';
export const GET_GENRES = HOST + 'genres';
export const GET_STARS = HOST + 'people';

type TAddMovie = z.infer<typeof createMovieSchema>;
type TChangeMovie = z.infer<typeof changeMovieSchema>;

type TAddPerson = z.infer<typeof createPersonSchema>;
type TChangePerson = z.infer<typeof changePersonSchema>;

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

export async function getGenreById(id: string) {
	const response = await fetch(GET_GENRES + '/' + id);
	if (!response.ok) return undefined;

	const data = await response.json();
	return data as TGenre;
}

export async function addGenre(title: string) {
	const result = await fetch(GET_GENRES, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title })
	});

	let id = undefined;
	if (result.ok) id = (await result.json()).id;

	return id as string | undefined;
}

export async function changeGenre(id: string, title: string) {
	const result = await fetch(GET_GENRES, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id, title })
	});
	const data = await result.json();
	return result.ok && data.success === true;
}

export async function removeGenre(id: string) {
	const result = await fetch(GET_GENRES, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id })
	});
	const data = await result.json();
	return result.ok && data.success === true;
}

export async function getPersonById(id: string) {
	const response = await fetch(GET_STARS + '/' + id);
	if (!response.ok) return undefined;
	const data = await response.json();
	return data as TPersonFull;
}

export async function addPerson(person: TAddPerson) {
	const result = await fetch(GET_STARS, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(person)
	});

	let id = undefined;
	if (result.ok) id = (await result.json()).id;

	return id as string | undefined;
}

export async function changePerson(person: TChangePerson) {
	const result = await fetch(GET_STARS, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(person)
	});
	const data = await result.json();
	return result.ok && data.success === true;
}

export async function removePerson(id: string) {
	const result = await fetch(GET_STARS, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id })
	});
	const data = await result.json();
	return result.ok && data.success === true;
}
