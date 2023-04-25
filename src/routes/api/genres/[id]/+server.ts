import { validUuid } from '$lib/utils/schemas';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ params, url }) => {
	const id = validUuid.parse(params.id);
	const skip = Number(url.searchParams.get('skip') ?? 0);
	const limit = Number(url.searchParams.get('limit') ?? 20);

	const [movies, total] = await prisma.$transaction([
		prisma.movie.findMany({
			where: { genres: { some: { id } } },
			skip,
			take: limit,
			include: {
				genres: { orderBy: { title: 'asc' } }
			}
		}),
		prisma.movie.count({ where: { genres: { some: { id } } } })
	]);

	return json({ movies, total });
}) satisfies RequestHandler;
