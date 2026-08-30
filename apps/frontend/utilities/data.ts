import { UAParser } from 'ua-parser-js'
import { getClient } from '../client'
import content from '../content.json'
import { fetchContent, type SiteContent } from './content'
import { getPreviewPerspective, isDraftMode } from './draft-mode'

export async function getData(slug?: string, userAgent?: string, cookieHeader = '') {
  const preview = isDraftMode(cookieHeader)
  const activeContent = preview
    ? await fetchContent(getClient(getPreviewPerspective(cookieHeader)))
    : (content as unknown as SiteContent)

  const posthogKey = process.env.POSTHOG_PROJECT_TOKEN
  const posthogHost = process.env.POSTHOG_HOST
  const posthog =
    preview || !posthogKey || !posthogHost
      ? undefined
      : {
          key: posthogKey,
          host: posthogHost,
        }

  const typekit = process.env.TYPEKIT

  const resolvedSlug = slug ?? 'home'

  const ua = UAParser(userAgent)

  const isDesktop = ua.device.type === undefined
  const isPhone = ua.device.type === 'mobile'
  const isTablet = ua.device.type === 'tablet'

  const { categories, footer, menu, settings } = activeContent
  const pages = [...activeContent.pages, ...activeContent.products]

  interface ContentPage {
    _id: string
    slug: { current: string }
    [key: string]: unknown
  }

  const isContentPage = (page: Record<string, unknown>): page is ContentPage => {
    if (typeof page.slug !== 'object' || page.slug === null) return false
    return typeof (page.slug as Record<string, unknown>).current === 'string'
  }

  let data = pages.find((page): page is ContentPage => isContentPage(page) && page.slug.current === resolvedSlug)

  if (!data) {
    data = pages.find((page): page is ContentPage => isContentPage(page) && page.slug.current === 'not-found')
  }

  return {
    posthog,
    typekit,

    categories,
    footer,
    menu,
    settings,

    ...data,

    isPreview: preview,
    isDesktop,
    isPhone,
    isTablet,
  }
}
