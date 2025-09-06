import 'dotenv/config'

import { createClient } from '@sanity/client'

const client = createClient({
  apiVersion: process.env.SANITY_API,
  dataset: process.env.SANITY_DATABASE,
  projectId: process.env.SANITY_PROJECT,
  useCdn: true,
})

export { client }
