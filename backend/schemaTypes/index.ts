import siteSettings from './siteSettings'
import page from './page'
import suite from './suite'

const localeString = {
    name: "localeString",
    type: "object",
    options: { columns: 2 },
    fields: [
      {
        title: "English",
        name: "en",
        type: "string",
      },
      {
        title: "Italiano",
        name: "it",
        type: "string",
      }
    ],
}

const localeText = {
  name: "localeText",
  type: "object",
  options: { columns: 2 },
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
}

export const schemaTypes = [
  siteSettings,
  page,
  suite,
  localeString,
  localeText,
]