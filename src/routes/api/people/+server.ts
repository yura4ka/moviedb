import { prisma } from '$lib/server/prisma';
import { changePersonSchema, createPersonSchema, validIdObject } from '$lib/utils/schemas';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ url }) => {
	const skip = Number(url.searchParams.get('skip') ?? 0);
	const limit = Number(url.searchParams.get('limit') ?? 25);

	const people = await prisma.person
		.findMany({
			skip,
			take: limit
		})
		.then(
			async (people) =>
				await Promise.all(
					people.map(async (p) => {
						const [asDirector, asStar, asWriter] = await Promise.all([
							prisma.movieCrew.findMany({
								where: { personId: p.id, role: 'DIRECTOR' },
								select: { movie: { select: { id: true, title: true, image: true } } },
								take: 3,
								orderBy: { movie: { rating: 'desc' } }
							}),
							prisma.movieCrew.findMany({
								where: { personId: p.id, role: 'STAR' },
								select: { movie: { select: { id: true, title: true, image: true } } },
								take: 3,
								orderBy: { movie: { rating: 'desc' } }
							}),
							prisma.movieCrew.findMany({
								where: { personId: p.id, role: 'WRITER' },
								select: { movie: { select: { id: true, title: true, image: true } } },
								take: 3,
								orderBy: { movie: { rating: 'desc' } }
							})
						]);
						return { ...p, asDirector, asStar, asWriter };
					})
				)
		);

	return json(people);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const data = await request.json();
	const parsed = createPersonSchema.parse(data);

	const { id } = await prisma.person.create({
		data: {
			name: parsed.name.trim(),
			bio: parsed.bio.trim(),
			birthday: parsed.birthday,
			image: parsed.image.trim()
		}
	});
	return json({ success: true, id });
}) satisfies RequestHandler;

export const PATCH = (async ({ request }) => {
	const data = await request.json();
	const parsed = changePersonSchema.parse(data);

	await prisma.person.update({
		where: { id: parsed.id },
		data: {
			name: parsed.name?.trim(),
			bio: parsed.bio?.trim(),
			birthday: parsed.birthday,
			image: parsed.image?.trim()
		}
	});
	return json({ success: true });
}) satisfies RequestHandler;

export const DELETE = (async ({ request }) => {
	const data = await request.json();
	const id = validIdObject.parse(data);
	await prisma.person.delete({ where: id });
	return json({ success: true });
}) satisfies RequestHandler;
