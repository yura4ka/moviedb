import { Prisma } from '@prisma/client';
import { error, type HandleServerError } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const handleError = (({ error: e }) => {
	if (e instanceof ZodError) {
		console.log(e.flatten());
		throw error(400, { message: 'Bad request', errors: e.flatten().fieldErrors });
	}
	console.error(e);
	if (e instanceof Prisma.PrismaClientKnownRequestError) {
		let errors;
		if (e.code === 'P2002') {
			const reason = e.meta?.target;
			if (reason && Array.isArray(reason))
				errors = Object.fromEntries(reason.map((r) => [r, 'Вже існує']));
		}
		throw error(400, { message: 'Bad request', errors });
	}
	throw error(500);
}) satisfies HandleServerError;
