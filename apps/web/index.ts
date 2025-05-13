import 'dotenv/config'

import express from 'express'
import path from 'path'
import staticify from 'staticify'
import { fileURLToPath } from 'url'

import { getFileAsset, getImageAsset, SanityFileSource, SanityImageSource } from '@sanity/asset-utils'
import { toHTML } from '@portabletext/to-html'

import { client } from './client'
import { router } from './router'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded())

const staticifyInstance = staticify(path.join(__dirname, 'build'))

app.use(staticifyInstance.middleware)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')

app.use((request, response, next) => {
  // Assets Configuration
  response.locals.getVersionedPath = staticifyInstance.getVersionedPath

  // Sanity Configuration
  const config = client.config()

  response.locals.getAsset = (asset: SanityImageSource) => {
    return getImageAsset(asset, {
      baseUrl: config.apiHost,
      projectId: config.projectId!,
      dataset: config.dataset!,
    })
  }

  response.locals.getFile = (asset: SanityFileSource) => {
    return getFileAsset(asset, config)
  }

  response.locals.parseHTML = (blocks: any) => {
    if (blocks) {
      return toHTML(blocks)
    }
  }

  // Utilities
  response.locals.lowercase = (string: string) => {
    return string.toLowerCase()
  }

  next()
})

app.use('/', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

export default app
