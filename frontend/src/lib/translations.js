import i18n from 'sveltekit-i18n';

/** @type {import('sveltekit-i18n').Config} */
const config = ({
  loaders: [
    {
      locale: 'en',
      key: 'home',
      routes: ['/'], // you can use regexes as well!
      loader: async () => (
        await import('./en/home.json')
      ).default,
    },
    {
      locale: 'en',
      key: 'about',
      routes: ['/about'],
      loader: async () => (
        await import('./en/about.json')
      ).default,
    },
    {
      locale: 'en',
      key: 'suites',
      routes: ['/suites'],
      loader: async () => (
        await import('./en/suites.json')
      ).default,
    },
    {
      locale: 'it',
      key: 'home',
      routes: ['/'], // you can use regexes as well!
      loader: async () => (
        await import('./it/home.json')
      ).default,
    },
    {
      locale: 'it',
      key: 'about',
      routes: ['/about'],
      loader: async () => (
        await import('./it/about.json')
      ).default,
    },
    {
      locale: 'it',
      key: 'suites',
      routes: ['/suites'],
      loader: async () => (
        await import('./it/suites.json')
      ).default,
    },
  ],
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);