import type { SanityClient } from '@sanity/client'

export type ContentDocument = Record<string, unknown> & { _id: string }

export interface SiteContent {
  categories: ContentDocument[]
  footer?: ContentDocument
  menu?: ContentDocument
  pages: ContentDocument[]
  products: ContentDocument[]
  settings?: ContentDocument
}

type TraverseCallback = (object: Record<string, unknown>, key: string, value: unknown) => void

const traverse = (value: unknown, callback: TraverseCallback) => {
  if (Array.isArray(value)) {
    value.forEach((entry) => {
      traverse(entry, callback)
    })
    return
  }

  if (typeof value !== 'object' || value === null) return

  const object = value as Record<string, unknown>

  for (const [property, entry] of Object.entries(object)) {
    callback(object, property, entry)
    traverse(entry, callback)
  }
}

const resolveReferences = (page: ContentDocument, references: ContentDocument[]) => {
  const replacements = new Map<Record<string, unknown>, ContentDocument>()

  traverse(page, (object, key, value) => {
    if (key !== '_ref' || typeof value !== 'string' || value.startsWith('image-')) return

    const reference = references.find((document) => document._id === value)
    if (reference) replacements.set(object, reference)
  })

  replacements.forEach((reference, entry) => {
    Object.assign(entry, { ...reference })
  })
}

export async function fetchContent(client: SanityClient): Promise<SiteContent> {
  const [footer, menu, settings, categories, pages, products] = await Promise.all([
    client.fetch<ContentDocument | undefined>(`*[_type == "footer"][0]`),
    client.fetch<ContentDocument | undefined>(`*[_type == "menu"][0]`),
    client.fetch<ContentDocument | undefined>(`*[_type == "settings"][0]`),
    client.fetch<ContentDocument[]>(`*[_type == "category"]`),
    client.fetch<ContentDocument[]>(`*[_type == "page"]`),
    client.fetch<ContentDocument[]>(`*[_type == "product"]`),
  ])

  const references = [...categories, ...products]
  const pagesWithReferences = [...categories, ...products, ...pages]
  pagesWithReferences.forEach((page) => {
    resolveReferences(page, references)
  })

  return { categories, footer, menu, pages, products, settings }
}
