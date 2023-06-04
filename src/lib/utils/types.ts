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

export type TGenre = {
	id: string;
	title: string;
	movies: (Movie & { genres: Genre[] })[];
};

type TPersonMovie = {
	movie: { id: string; title: string; image: string };
};

export type TPerson = {
	asDirector: TPersonMovie[];
	asStar: TPersonMovie[];
	asWriter: TPersonMovie[];
	id: string;
	name: string;
	bio: string;
	birthday: Date;
	image: string;
};
