import { z } from 'zod';

const wrongFormatMessage = 'Невірний формат';
const requiredError = "Обов'язкове поле";

export const validString = z
	.string({ required_error: requiredError, invalid_type_error: wrongFormatMessage })
	.trim()
	.min(1, { message: wrongFormatMessage });

export const validUuid = z
	.string({ required_error: requiredError, invalid_type_error: wrongFormatMessage })
	.trim()
	.uuid({ message: wrongFormatMessage });

export const validIdObject = z.object({ id: validUuid });

export const createGenreSchema = z.object({ title: validString });
export const changeGenreSchema = z.object({ id: validUuid, title: validString });
