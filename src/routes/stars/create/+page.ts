import { getPersonById } from '$lib/utils/api';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const id = url.searchParams.get('id');
	const person = id ? await getPersonById(id) : undefined;
	return { person };
}) satisfies PageLoad;
