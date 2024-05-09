// src/routes/+layout.js
import { getSiteSettings } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/** @type {import('@sveltejs/kit').Load} */
export const load:any = (async ({ url }) => {
  const { pathname } = url;
  const siteSettings = await getSiteSettings();
  if (siteSettings) {
		return {
			siteSettings,
      pathname
		};
	}
  throw error(404, 'Not found');
}) satisfies PageLoad;