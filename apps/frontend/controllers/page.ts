import { createElement } from 'preact'
import { renderToString } from 'preact-render-to-string'

import { injectModulePreloads, preloadHeader } from '../templates/manifest'
import Page from '../templates/pages/Page'
import type { PageData } from '../templates/types'
import { getData } from '../utilities/data'

const isDev = process.env.NODE_ENV !== 'production'

interface RenderedPage {
  body: string
  etag: string
  status: number
}

//
// Published pages only change on deploy (content is bundled from `content.json`),
// so each page is rendered once per isolate and device class, and revalidated by
// browsers through its ETag. Keyed by the resolved slug, so unknown paths share
// the not-found page.
//
const pages: Map<string, Promise<RenderedPage>> = new Map()

async function getETag(body: string) {
  const digest = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(body))
  const hash = Array.from(new Uint8Array(digest).slice(0, 12), (byte) => byte.toString(16).padStart(2, '0')).join('')

  return `"${hash}"`
}

function render(data: PageData, statusCode?: number) {
  const html = renderToString(createElement(Page, { data }))
  const body = `<!DOCTYPE html>${isDev ? html : injectModulePreloads(html)}`
  const isNotFound = data.slug?.current === 'not-found'

  return {
    body,
    status: statusCode ?? (isNotFound ? 404 : 200),
  }
}

function getDevice({ isPhone, isTablet }: PageData) {
  return isPhone ? 'phone' : isTablet ? 'tablet' : 'desktop'
}

function getPage(data: PageData, statusCode?: number) {
  const key = `${data.slug?.current}:${getDevice(data)}:${statusCode ?? ''}`
  const cached = pages.get(key)

  if (cached) {
    return cached
  }

  const page = Promise.resolve().then(async () => {
    const { body, status } = render(data, statusCode)

    return { body, etag: await getETag(body), status }
  })

  pages.set(key, page)

  page.catch(() => {
    pages.delete(key)
  })

  return page
}

export default async function renderPage(slug: string | undefined, request: Request, statusCode?: number) {
  const data = (await getData(
    slug,
    request.headers.get('user-agent') ?? undefined,
    request.headers.get('cookie') ?? '',
  )) as unknown as PageData

  if (isDev || data.isPreview) {
    const { body, status } = render(data, statusCode)

    return new Response(body, {
      status,
      headers: {
        ...(data.isPreview && { 'cache-control': 'private, no-store' }),
        'content-type': 'text/html; charset=utf-8',
      },
    })
  }

  const { body, etag, status } = await getPage(data, statusCode)

  const headers = {
    'cache-control': 'public, max-age=0, must-revalidate',
    'content-type': 'text/html; charset=utf-8',
    etag,
    link: preloadHeader,
    // The `<html>` device class depends on the user agent.
    vary: 'user-agent',
  }

  if (status === 200 && request.headers.get('if-none-match')?.includes(etag)) {
    return new Response(null, { status: 304, headers })
  }

  return new Response(body, { status, headers })
}
