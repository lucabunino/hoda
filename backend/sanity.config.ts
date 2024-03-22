import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {myStructure} from './deskStructure'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {documentInternationalization} from '@sanity/document-internationalization'
import {inlineSvgInput} from '@focus-reactive/sanity-plugin-inline-svg-input'


export default defineConfig({
  name: 'default',
  title: 'hoda',

  projectId: 'fobtxuna',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: myStructure,
    }),
    visionTool(),
    media(),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'it', title: 'Italiano'}
      ],
      schemaTypes: [
        'suite',
      ],
    }),
    inlineSvgInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
