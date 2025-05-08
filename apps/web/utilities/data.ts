import { Request } from 'express'
import { UAParser } from 'ua-parser-js'

import content from '../content.json'

export function getData(request: Request) {
  const analytics = process.env.GOOGLE_ANALYTICS
  const slug = request.params.slug ?? 'home'

  const ua = UAParser(request.headers['user-agent'])

  const isDesktop = ua.device.type === undefined
  const isPhone = ua.device.type === 'mobile'
  const isTablet = ua.device.type === 'tablet'

  const { footer, menu, settings } = content

  let data = content.pages.find((page) => page.slug.current === slug)

  if (!data) {
    data = content.pages.find((page) => page.slug.current === 'not-found')
  }

  return {
    analytics,

    footer,
    menu,
    settings,

    ...data,

    isDesktop,
    isPhone,
    isTablet,
  }
}
