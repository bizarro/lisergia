import { toHTML } from '@portabletext/to-html'
import {
  getFileAsset,
  getImageAsset,
  getImageDimensions,
  type SanityFileSource,
  type SanityImageSource,
} from '@sanity/asset-utils'
import { stegaClean } from '@sanity/client/stega'
import { createImageUrlBuilder } from '@sanity/image-url'

import { client } from '../client'
import type { SanityImageAsset } from './types'

const imageUrlBuilder = createImageUrlBuilder(client)
const responsiveImageWidths = [320, 480, 640, 768, 960, 1200, 1440, 1920, 2560, 3200]

interface ImageCrop {
  bottom: number
  left: number
  right: number
  top: number
}

function getImageCrop(image: SanityImageSource): ImageCrop | undefined {
  if (typeof image !== 'object' || image === null || !('crop' in image)) return undefined

  const crop = image.crop
  if (typeof crop !== 'object' || crop === null) return undefined

  const { bottom, left, right, top } = crop as Partial<ImageCrop>
  if ([bottom, left, right, top].some((value) => typeof value !== 'number')) return undefined

  return { bottom: bottom!, left: left!, right: right!, top: top! }
}

function getResponsiveWidths(sourceWidth?: number): number[] {
  if (!sourceWidth) return responsiveImageWidths

  const widths = responsiveImageWidths.filter((width) => width < sourceWidth)
  widths.push(Math.round(sourceWidth))

  return [...new Set(widths)]
}

function getImageUrl(image: SanityImageSource, width: number): string {
  return imageUrlBuilder.image(image).width(width).fit('max').auto('format').quality(80).url()
}

export function getAsset(image: SanityImageSource): SanityImageAsset {
  const config = client.config()
  const asset = getImageAsset(image, {
    projectId: config.projectId!,
    dataset: config.dataset!,
  })
  const dimensions = getImageDimensions(image)

  const imageAlt = typeof image === 'object' && image !== null && 'alt' in image ? image.alt : undefined
  const alt = typeof imageAlt === 'string' ? (stegaClean(imageAlt)?.trim() ?? '') : ''

  const crop = getImageCrop(image)
  const width = crop ? Math.max(1, Math.round(dimensions.width * (1 - crop.left - crop.right))) : dimensions.width
  const height = crop ? Math.max(1, Math.round(dimensions.height * (1 - crop.top - crop.bottom))) : dimensions.height
  const widths = getResponsiveWidths(width)
  const fallbackWidth = Math.min(width ?? 1920, 1920)

  return {
    ...asset,
    alt,
    height,
    srcSet: widths.map((candidateWidth) => `${getImageUrl(image, candidateWidth)} ${candidateWidth}w`).join(', '),
    url: getImageUrl(image, fallbackWidth),
    width,
  }
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
