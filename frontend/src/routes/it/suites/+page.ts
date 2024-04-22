// src/routes/+page.js
import { getSuitesPage, getSuitesIt } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load:any = (async () => {
  const suites = await getSuitesIt();
	const suitesPage = await getSuitesPage();
	if (suitesPage && suites) {
		return {
      suites,
			suitesPage
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;