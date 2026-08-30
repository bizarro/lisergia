import { type ClientPerspective, createClient } from '@sanity/client'

const client = createClient({
  apiVersion: process.env.SANITY_API,
  dataset: process.env.SANITY_DATABASE,
  projectId: process.env.SANITY_PROJECT,
  useCdn: true,
  stega: {
    enabled: false,
    studioUrl: process.env.SANITY_STUDIO_URL ?? 'http://localhost:3000',
  },
})

export function getClient(perspective: ClientPerspective = 'published') {
  const isPreview = perspective !== 'published'

  if (isPreview && !process.env.SANITY_API_READ_TOKEN) {
    throw new Error('SANITY_API_READ_TOKEN is required for Sanity preview mode.')
  }

  return client.withConfig({
    perspective,
    useCdn: !isPreview,
    stega: { enabled: isPreview },
    ...(isPreview && { token: process.env.SANITY_API_READ_TOKEN }),
  })
}

export { client }
