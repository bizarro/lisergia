import { toHTML } from '@portabletext/to-html'
import { getFileAsset, getImageAsset, SanityFileSource, SanityImageSource } from '@sanity/asset-utils'
import { client } from '../client'

const config = client.config()

export const getAsset = (asset: SanityImageSource) => {
  return getImageAsset(asset, {
    baseUrl: config.apiHost,
    projectId: config.projectId!,
    dataset: config.dataset!,
  })
}

export const getFile = (asset: SanityFileSource) => {
  return getFileAsset(asset, config)
}

export const parseHTML = (blocks: any) => {
  if (blocks) {
    return toHTML(blocks)
  }
}

export const lowercase = (string: string) => {
  return string.toLowerCase()
}
