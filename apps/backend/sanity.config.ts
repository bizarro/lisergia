import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { resolve } from './presentation/resolve'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:8787'

export default defineConfig({
  name: 'default',
  title: 'Lisergia',

  projectId: 'lqn1inyo',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          disable: '/api/draft-mode/disable',
          enable: '/api/draft-mode/enable',
        },
      },
      resolve,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
