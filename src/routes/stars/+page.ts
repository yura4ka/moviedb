import { GET_STARS } from "$lib/utils/api";
import type { PageLoad } from "../$types";

export const load = (async ({ fetch }) => {
	const response = await fetch(GET_STARS);
	const stars = await response.json();
	return { stars };
}) satisfies PageLoad;
