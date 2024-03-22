// src/routes/+page.js
import { getAboutPage } from '$lib/utils/sanity';
import { getSiteSettings } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load:any = (async () => {
  const aboutPage = await getAboutPage();
	const siteSettings = await getSiteSettings();
	if (aboutPage && siteSettings) {
		return {
      aboutPage,
			siteSettings
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;