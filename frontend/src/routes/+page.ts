// src/routes/+page.js
import { getHomepage, getSuitesEn } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load:any = (async () => {
	const homepage = await getHomepage();
  const suites = await getSuitesEn();
	if (homepage && suites) {
		return {
			homepage,
      suites
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;