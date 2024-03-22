export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  fieldsets: [
    {name: 'generalInfoLeft',},
    {name: 'generalInfoRight',},
    {name: 'hero', options: { columns: 2 },},
  ],
  groups: [
    {name: 'homepage',},
    {name: 'suites',},
    {name: 'neighborhood',},
    {name: 'about',},
  ],
  fields: [
    {
      name: 'homepageIntro',
      title: 'Homepage Intro',
      type: 'object',
      group: 'homepage',
      fields: [
        {
          title: 'English',
          name: 'en',
          type: 'array',
          of: [{
            type: 'block',
            styles: [
              {title: 'Testo corrente', value: 'normal'},
              {title: 'Heading 2', value: 'h2'},
              {title: 'Heading 3', value: 'h3'},
              {title: 'Heading 4', value: 'h4'},
              {title: 'CTA', value: 'h5'},
            ],
            marks: {
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'External link',
                  fields: [
                    {
                      name: 'href',
                      type: 'url',
                      title: 'URL'
                    },
                    {
                      title: 'Open in new tab',
                      name: 'blank',
                      description: 'Read https://css-tricks.com/use-target_blank/',
                      type: 'boolean'
                    }
                  ]
                },
              ]
            },
          }]
        },
        {
          title: 'Italiano',
          name: 'it',
          type: 'array',
          of: [{
            type: 'block',
            styles: [
              {title: 'Testo corrente', value: 'normal'},
              {title: 'Heading 2', value: 'h2'},
              {title: 'Heading 3', value: 'h3'},
              {title: 'Heading 4', value: 'h4'},
              {title: 'CTA', value: 'h5'},
            ],
            marks: {
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'External link',
                  fields: [
                    {
                      name: 'href',
                      type: 'url',
                      title: 'URL'
                    },
                    {
                      title: 'Open in new tab',
                      name: 'blank',
                      description: 'Read https://css-tricks.com/use-target_blank/',
                      type: 'boolean'
                    }
                  ]
                },
              ]
            },
          }]
        },
      ],
    },
    {
      name: 'homepageHeroDesktop',
      title: 'Desktop',
      type: 'image',
      group: 'homepage',
      fieldset: 'hero'
    },
    {
      name: 'homepageHeroMobile',
      title: 'Mobile',
      type: 'image',
      group: 'homepage',
      fieldset: 'hero'
    },
    {
      name: 'homepageLogoCleo',
      title: 'Logo Cleo',
      type: 'inlineSvg',
      group: 'homepage',
    },
    {
      name: 'homepageCleo',
      title: 'Cleo',
      type: 'localeText',
      rows: 3,
      group: 'homepage',
    },
    {
      name: 'suitesIntro',
      title: 'Suites Intro',
      type: 'localeText',
      rows: 3,
      group: 'suites',
    },
    {
      name: 'suitesGeneralInfoLeftTitle',
      title: 'Title',
      type: 'localeString',
      group: 'suites',
      fieldset: "generalInfoLeft",
    },
    {
      name: 'suitesGeneralInfoLeft',
      title: 'Info',
      type: 'array',
      group: 'suites',
      fieldset: "generalInfoLeft",
      of: [
        {
          name: "infoRow",
          title: "Info Row",
          type: 'object',
          fields: [
            {
              name: 'infoRowTitle',
              title: 'Title',
              type: 'localeString',
            },
            {
              name: 'infoRowText',
              title: 'Text',
              type: "object",
              // options: { columns: 2 },
              fields: [
                {
                  title: "English",
                  name: "en",
                  type: "text",
                  rows: 6,
                },
                {
                  title: "Italiano",
                  name: "it",
                  type: "text",
                  rows: 6,
                }
              ],
            },
            {
              name: 'infoRowSpecs',
              title: 'Specs',
              type: "object",
              // options: { columns: 2 },
              fields: [
                {
                  title: "English",
                  name: "en",
                  type: "text",
                  rows: 3,
                },
                {
                  title: "Italiano",
                  name: "it",
                  type: "text",
                  rows: 3,
                }
              ],
            },
          ]
        },
      ],
    },
    {
      name: 'suitesGeneralInfoRightTitle',
      title: 'Title',
      type: 'localeString',
      group: 'suites',
      fieldset: "generalInfoRight",
    },
    {
      name: 'suitesGeneralInfoRight',
      title: 'Info',
      type: 'array',
      group: 'suites',
      fieldset: "generalInfoRight",
      of: [
        {
          name: "infoRow",
          title: "Info Row",
          type: 'object',
          fields: [
            {
              name: 'infoRowTitle',
              title: 'Title',
              type: 'localeString',
            },
            {
              name: 'infoRowText',
              title: 'Text',
              type: "object",
              // options: { columns: 2 },
              fields: [
                {
                  title: "English",
                  name: "en",
                  type: "text",
                  rows: 6,
                },
                {
                  title: "Italiano",
                  name: "it",
                  type: "text",
                  rows: 6,
                }
              ],
            },
            {
              name: 'infoRowSpecs',
              title: 'Specs',
              type: "object",
              // options: { columns: 2 },
              fields: [
                {
                  title: "English",
                  name: "en",
                  type: "text",
                  rows: 3,
                },
                {
                  title: "Italiano",
                  name: "it",
                  type: "text",
                  rows: 3,
                }
              ],
            },
          ]
        },
      ],
    },
    {
      name: 'neighborhoodIntro',
      title: 'Neighborhood Intro',
      type: 'localeText',
      rows: 3,
      group: 'neighborhood',
    },
    {
      name: 'aboutIntro',
      title: 'About Intro',
      type: 'object',
      group: 'about',
      fields: [
        {
          title: 'English',
          name: 'en',
          type: 'array',
          of: [{
            type: 'block',
            styles: [
              {title: 'Testo corrente', value: 'normal'},
              {title: 'Heading 2', value: 'h2'},
              {title: 'Heading 3', value: 'h3'},
              {title: 'Heading 4', value: 'h4'},
              {title: 'CTA', value: 'h5'},
            ],
            marks: {
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'External link',
                  fields: [
                    {
                      name: 'href',
                      type: 'url',
                      title: 'URL'
                    },
                    {
                      title: 'Open in new tab',
                      name: 'blank',
                      description: 'Read https://css-tricks.com/use-target_blank/',
                      type: 'boolean'
                    }
                  ]
                },
              ]
            },
          }]
        },
        {
          title: 'Italiano',
          name: 'it',
          type: 'array',
          of: [{
            type: 'block',
            styles: [
              {title: 'Testo corrente', value: 'normal'},
              {title: 'Heading 2', value: 'h2'},
              {title: 'Heading 3', value: 'h3'},
              {title: 'Heading 4', value: 'h4'},
              {title: 'CTA', value: 'h5'},
            ],
            marks: {
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'External link',
                  fields: [
                    {
                      name: 'href',
                      type: 'url',
                      title: 'URL'
                    },
                    {
                      title: 'Open in new tab',
                      name: 'blank',
                      description: 'Read https://css-tricks.com/use-target_blank/',
                      type: 'boolean'
                    }
                  ]
                },
              ]
            },
          }]
        },
      ],
    },
    {
      name: "aboutImages",
      title: "About Images",
      type: "array",
      group: 'about',
      of: [
        {
          name: "sliderImage",
          title: "Image",
          type: 'image',
        },
      ],
    },
    {
      name: "aboutCTAs",
      title: "About CTAs",
      type: "array",
      group: 'about',
      of: [
        {
          name: "aboutCTA",
          title: "CTA",
          type: 'object',
          fields: [
            {
              title: 'Image',
              name: 'image',
              type: 'image',
            },
            {
              title: 'Intro',
              name: 'intro',
              type: 'localeString',
            },
            {
              title: 'Question',
              name: 'question',
              type: 'localeString',
            },
            {
              title: 'Button Text',
              name: 'button',
              type: 'localeString',
            },
            {
              title: 'Button Link',
              name: 'buttonLink',
              type: 'url',
            },
            {
              title: 'Description',
              name: 'description',
              type: 'localeText',
            },
          ]
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: 'Pages'
      }
    }
  }
}
