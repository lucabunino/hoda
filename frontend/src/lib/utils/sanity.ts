import { createClient } from '@sanity/client';
import groq from 'groq';

import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: false, // `false` if you want to ensure fresh data
	apiVersion: '2024-03-16' // date of setup
});

export async function getSiteSettings(): Promise<Settings[]> {
	return await client.fetch(
		groq`*[_type == "siteSettings"]{
			...,
			} | order(year desc)`
	);
}

export async function getHomepage(): Promise<Homepage[]> {
	return await client.fetch(
		groq`*[_type == 'page'] {
			homepageIntro,
			homepageHeroDesktop,
			homepageHeroMobile,
			homepageCleo,
			homepageLogoCleo
		} | order(year desc)`
	);
}

export async function getSuitesPage(): Promise<SuitesPage[]> {
	return await client.fetch(
		groq`*[_type == 'page'] {
			suitesIntro,
			suitesGeneralInfoLeftTitle,
			suitesGeneralInfoLeft[] {
				infoRowTitle,
				infoRowText,
				infoRowSpecs
			},
			suitesGeneralInfoRightTitle,
			suitesGeneralInfoRight[] {
				infoRowTitle,
				infoRowText,
				infoRowSpecs
			}
		}`
	);
}

export async function getAboutPage(): Promise<SuitesPage[]> {
	return await client.fetch(
		groq`*[_type == 'page'] {
			aboutIntro,
			aboutImages,
			aboutCTAs[] {
				...,
			},
		}`
	);
}

export async function getSuites(): Promise<Suites[]> {
	return await client.fetch(
		groq`*[_type == "suite" && language == "en"]{
			...,
			} | order(order asc)`
	);
}

export async function getMenu(): Promise<Menu[]> {
	return await client.fetch(
		groq`*[_type == "menu"] {
			title,
			from,
			to,
			menuContents[] {
				meal,
				mealContent[] {
					course,
					dishes[] {
						dishReference->{
							title,
							description,
							price,
							allergens[]->{
								number,
								title,
								description
							}
						}
					}
				}
			}
		} | order(year desc)`
	);
}