import { z } from 'zod';

const wrongFormatMessage = 'Невірний формат';
const requiredError = "Обов'язкове поле";

const ROLES = ['DIRECTOR', 'WRITER', 'STAR'] as const;
const MPAA = ['G', 'PG', 'PG_13', 'R', 'NC_17'] as const;

export const validString = z
	.string({ required_error: requiredError, invalid_type_error: wrongFormatMessage })
	.trim()
	.min(1, { message: wrongFormatMessage });

export const validUuid = z
	.string({ required_error: requiredError, invalid_type_error: wrongFormatMessage })
	.trim()
	.uuid({ message: wrongFormatMessage });

export const validIdObject = z.object({ id: validUuid });

export const validGenre = validIdObject.or(z.object({ title: validString }));
export const createGenreSchema = z.object({ title: validString });
export const changeGenreSchema = z.object({ id: validUuid, title: validString });

export const createMovieSchema = z.object({
	title: validString,
	description: validString,
	year: z
		.number({ required_error: requiredError, invalid_type_error: wrongFormatMessage })
		.int({ message: wrongFormatMessage })
		.min(1500, { message: wrongFormatMessage })
		.max(new Date().getFullYear(), { message: wrongFormatMessage }),
	durationMinutes: z
		.number({ required_error: requiredError, invalid_type_error: wrongFormatMessage })
		.int({ message: wrongFormatMessage })
		.min(1, { message: wrongFormatMessage }),
	rating: z
		.number({ required_error: requiredError, invalid_type_error: wrongFormatMessage })
		.min(0, { message: wrongFormatMessage })
		.max(10, { message: wrongFormatMessage }),
	mpaa: z.enum(MPAA),
	image: validString.optional(),
	genres: validGenre.array().nonempty({ message: wrongFormatMessage }),
	crew: z.object({ personId: validUuid, role: z.enum(ROLES) }).array()
});
export const changeMovieSchema = createMovieSchema.partial().and(validIdObject);

export const createPersonSchema = z.object({
	name: validString,
	bio: validString,
	birthday: z.coerce
		.date({ required_error: requiredError, invalid_type_error: wrongFormatMessage })
		.min(new Date(1500, 0, 0), { message: wrongFormatMessage })
		.max(new Date(), { message: wrongFormatMessage })
});
export const changePersonSchema = createPersonSchema.partial().and(validIdObject);
