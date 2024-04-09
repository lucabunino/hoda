export default {
  name: 'siteSettings',
  title: 'Impostazioni del sito',
  type: 'document',
  fieldsets: [
    {
      name: 'contacts',
      title: 'Contatti',
      options: { columns: 2 },
    },
  ],
  groups: [
    {name: 'SEO',},
  ],
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'inlineSvg',
    },
    {
      name: 'newsletterMessage',
      title: 'Newsletter Message',
      type: 'string',
    },
    {
      name: 'headquarters',
      title: 'Sede legale',
      type: 'string',
      fieldset: 'contacts',
    },
    {
      name: 'maps',
      title: 'Indirizzo',
      type: 'string',
      fieldset: 'contacts',
    },
    {
      name: 'mapsLink',
      title: 'Google Maps Link',
      type: 'url',
      fieldset: 'contacts',
      validation: Rule => Rule.uri({
        scheme: ['https'],
      })
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
      fieldset: 'contacts',
    },
    {
      name: 'instagramLink',
      title: 'Instagram Link',
      type: 'url',
      fieldset: 'contacts',
      validation: Rule => Rule.uri({
        scheme: ['https'],
      })
    },
    {
      name: 'pinterest',
      title: 'Pinterest',
      type: 'string',
      fieldset: 'contacts',
    },
    {
      name: 'pinterestLink',
      title: 'Pinterest Link',
      type: 'url',
      fieldset: 'contacts',
      validation: Rule => Rule.uri({
        scheme: ['https'],
      })
    },
    {
      name: 'mail',
      title: 'Email',
      type: 'string',
      fieldset: 'contacts',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      fieldset: 'contacts',
    },
    {
      name: 'SEOTitle',
      title: 'Titolo tab',
      type: 'localeString',
      group: 'SEO',
    },
    {
      name: 'SEODescription',
      title: 'Descrizione',
      type: 'localeText',
      group: 'SEO',
    },
    {
      name: 'SEOImage',
      title: 'Immagine share social',
      type: 'image',
      group: 'SEO',
    },
  ]
}