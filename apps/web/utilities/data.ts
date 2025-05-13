import { Request } from 'express'
import { UAParser } from 'ua-parser-js'

import content from '../content.json'

export function getData(request: Request) {
  const analytics = process.env.GOOGLE_ANALYTICS
  const typekit = process.env.TYPEKIT

  const slug = request.params.slug ?? 'home'

  const ua = UAParser(request.headers['user-agent'])

  const isDesktop = ua.device.type === undefined
  const isPhone = ua.device.type === 'mobile'
  const isTablet = ua.device.type === 'tablet'

  const { categories, footer, menu, settings } = content
  const pages = [...content.pages, ...content.products]

  let data = pages.find((page) => page.slug.current === slug)

  if (!data) {
    data = pages.find((page) => page.slug.current === 'not-found')
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
  }
}
