import * as fs from 'fs'
import { UAParser } from 'ua-parser-js'
import { getAsset, getFile, lowercase, parseHTML } from '../src/helpers'

const contentURL = process.env.NODE_ENV === 'production' ? './content.json' : '../content.json'
const contentFile = fs.readFileSync(new URL(contentURL, import.meta.url), 'utf-8')
const content = JSON.parse(contentFile)

export function getData(context: any) {
  const analytics = process.env.GOOGLE_ANALYTICS
  const typekit = process.env.TYPEKIT

  const slug = context.params.slug ?? 'home'

  const ua = UAParser(context.headers['user-agent'] || '')

  const isDesktop = ua.device.type === undefined
  const isPhone = ua.device.type === 'mobile'
  const isTablet = ua.device.type === 'tablet'

  const { categories, footer, menu, settings } = content
  const pages = [...content.pages, ...content.products]

  let data = pages.find((page: any) => page.slug.current === slug)

  if (!data) {
    data = pages.find((page: any) => page.slug.current === 'not-found')
  }

  return {
    analytics,
    typekit,

    categories,
    footer,
    menu,
    settings,

    ...data,

    isDesktop,
    isPhone,
    isTablet,

    getAsset,
    getFile,
    parseHTML,
    lowercase,
  }
}
