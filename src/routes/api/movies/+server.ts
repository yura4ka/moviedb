import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { changeMovieSchema, createMovieSchema, validIdObject } from '$lib/utils/schemas';

export const GET = (async ({ url }) => {
	const skip = Number(url.searchParams.get('skip') ?? 0);
	const limit = Number(url.searchParams.get('limit') ?? 20);

	const [movies, total] = await prisma.$transaction([
		prisma.movie.findMany({
			skip,
			take: limit,
			include: { genres: { orderBy: { title: 'asc' } } },
			orderBy: { rating: 'desc' }
		}),
		prisma.movie.count()
	]);
	return json({ movies, total });
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const data = await request.json();
	const parsed = createMovieSchema.parse(data);

	const { id } = await prisma.movie.create({
		data: {
			...parsed,
			title: parsed.title.trim(),
			description: parsed.description.trim(),
			genres: { connect: parsed.genres },
			crew: { createMany: { data: parsed.crew } }
		}
	});
	return json({ success: true, id });
}) satisfies RequestHandler;

export const PATCH = (async ({ request }) => {
	const data = await request.json();
	const parsed = changeMovieSchema.parse(data);

	await prisma.movie.update({
		where: { id: parsed.id },
		data: {
			...parsed,
			title: parsed.title?.trim(),
			description: parsed.description?.trim(),
			genres: { set: parsed.genres },
			crew: parsed.crew ? { deleteMany: {}, createMany: { data: parsed.crew } } : undefined
		}
	});
	return json({ success: true });
}) satisfies RequestHandler;

export const DELETE = (async ({ request }) => {
	const data = await request.json();
	const { id } = validIdObject.parse(data);

	await prisma.movie.delete({ where: { id } });
	return json({ success: true });
}) satisfies RequestHandler;
