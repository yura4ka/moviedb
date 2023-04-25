/* eslint-disable no-var */
import type { PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		interface Error {
			message: string;
			errors?: { [x: string]: string[] | undefined };
		}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	var prisma: PrismaClient;
}

export {};
