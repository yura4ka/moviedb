import { prisma } from '$lib/server/prisma';
import { changeGenreSchema, createGenreSchema, validGenre } from '$lib/utils/schemas';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async () => {
	const genres = await prisma.genre.findMany({ orderBy: { title: 'asc' } });
	return json(genres);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const data = await request.json();
	const { title } = createGenreSchema.parse(data);

	const { id } = await prisma.genre.create({ data: { title: title.trim() } });
	return json({ success: true, id });
}) satisfies RequestHandler;

export const PATCH = (async ({ request }) => {
	const data = await request.json();
	const { id, title } = changeGenreSchema.parse(data);

	await prisma.genre.update({ where: { id }, data: { title: title.trim() } });
	return json({ success: true });
}) satisfies RequestHandler;

export const DELETE = (async ({ request }) => {
	const data = await request.json();
	const genre = validGenre.parse(data);

	await prisma.genre.delete({ where: genre });
	return json({ success: true });
}) satisfies RequestHandler;
