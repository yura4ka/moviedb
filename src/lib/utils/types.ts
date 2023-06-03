import type { Genre, Movie, Role } from '@prisma/client';

export type TMovie = Movie & {
	genres: Genre[];
	crew: {
		role: Role;
		person: {
			id: string;
			name: string;
			image: string;
		};
	}[];
};
