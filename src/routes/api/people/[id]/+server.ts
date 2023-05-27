import { prisma } from '$lib/server/prisma';
import { validUuid } from '$lib/utils/schemas';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ params }) => {
	const id = validUuid.parse(params.id);
	const person = await prisma.person.findUniqueOrThrow({
		where: { id },
		include: {
			movieCrew: {
				select: { movie: { select: { id: true, title: true, image: true } }, role: true }
			}
		}
	});
	return json(person);
}) satisfies RequestHandler;
