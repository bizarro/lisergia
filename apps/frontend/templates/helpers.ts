import { toHTML } from '@portabletext/to-html'
import { getFileAsset, getImageAsset, type SanityFileSource, type SanityImageSource } from '@sanity/asset-utils'
import { stegaClean } from '@sanity/client/stega'

import { client } from '../client'
import type { SanityImageAsset } from './types'

export function getAsset(image: SanityImageSource): SanityImageAsset {
  const config = client.config()
  return getImageAsset(image, {
    baseUrl: config.apiHost,
    projectId: config.projectId!,
    dataset: config.dataset!,
  })
}

export function getFile(file: SanityFileSource) {
  return getFileAsset(file, client.config())
}

interface PortableTextValue {
  _type: string
  [key: string]: unknown
}

function isPortableTextValue(value: unknown): value is PortableTextValue {
  return typeof value === 'object' && value !== null && '_type' in value && typeof value._type === 'string'
}

export function parseHTML(blocks: unknown): string {
  if (!blocks) return ''

  if (Array.isArray(blocks)) {
    if (!blocks.every(isPortableTextValue)) return ''
    return toHTML(blocks)
  }

  if (!isPortableTextValue(blocks)) return ''
  return toHTML(blocks)
}

export function lowercase(str: string): string {
  return stegaClean(str)?.toLowerCase() ?? ''
}

export function getVersionedPath(filePath: string): string {
  if (process.env.NODE_ENV !== 'production') return filePath

  const version = process.env.ASSET_VERSION

  return version ? `${filePath}?v=${encodeURIComponent(version.slice(0, 12))}` : filePath
}
