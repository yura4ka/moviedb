import { validUuid } from '$lib/utils/schemas';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ params }) => {
	const id = validUuid.parse(params.id);
	const movie = await prisma.movie.findUniqueOrThrow({
		where: { id },
		include: {
			genres: true,
			crew: { select: { person: { select: { id: true, name: true } }, role: true } }
		}
	});
	return json(movie);
}) satisfies RequestHandler;
