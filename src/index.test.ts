import { GET_MOVIES, addMovie, changeMovie, removeMovie } from '$lib/utils/api';
import { describe, expect, test } from 'vitest';

describe('movie', () => {
	let createdId: string;
	const movieData = {
		title: 'vitest movie',
		description: 'vitest movie description',
		year: 2023,
		durationMinutes: 1,
		image:
			'https://m.media-amazon.com/images/M/MV5BOWIwZGY0OTYtZjUzYy00NzRmLTg5YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UY4096_.jpg',
		trailer: 'https://www.youtube.com/embed/pBk4NYhWNMM',
		mpaa: 'G' as 'G' | 'R',
		rating: 2
	};

	test('create a movie', async () => {
		const id = await addMovie({
			...movieData,
			genres: [
				{ id: '8a3f323a-f5ba-4dac-85fd-977262c8cc8b' },
				{ id: 'e2d2d772-cfa4-461d-8d01-0c0c47cb7de6' }
			],
			crew: [
				{
					personId: '313dcb9c-4c36-4d40-be3a-d736c1f6fc8c',
					role: 'DIRECTOR'
				},
				{
					personId: '654ad6d3-2765-4d7a-99cb-079914e7218d',
					role: 'WRITER'
				},
				{
					personId: '8cf7b0fb-a2e5-4bd1-9f1e-509a70d7b68d',
					role: 'STAR'
				}
			]
		});

		expect(id).toBeDefined();
		expect(id).toBeTypeOf('string');
		createdId = id;
	});

	test('get created movie', async () => {
		const result = await fetch(GET_MOVIES + `/${createdId}`).then((r) => r.json());
		expect(result).toBeDefined();
		expect(result).toMatchObject(movieData);
		expect(result).toHaveProperty('id', createdId);
		expect(result.genres).toHaveLength(2);
		expect(result.crew).toHaveLength(3);
	});

	test('change movie', async () => {
		const result = await changeMovie({ id: createdId, mpaa: 'R' });
		expect(result).toBe(true);
	});

	test('check movie after change', async () => {
		const result = await fetch(GET_MOVIES + `/${createdId}`).then((r) => r.json());
		movieData.mpaa = 'R';

		expect(result).toBeDefined();
		expect(result).toMatchObject(movieData);
		expect(result).toHaveProperty('id', createdId);
		expect(result.genres).toHaveLength(2);
		expect(result.crew).toHaveLength(3);
	});

	test('remove movie', async () => {
		const result = await removeMovie(createdId);
		expect(result).toBe(true);
	});

	test('movie is removed', async () => {
		const result = await fetch(GET_MOVIES + `/${createdId}`).then((r) => r.json());
		expect(result).toStrictEqual({ message: 'Bad request' });
	});
});
