import { createElement } from 'preact'
import { renderToString } from 'preact-render-to-string'

import { injectModulePreloads } from '../templates/manifest'
import Page from '../templates/pages/Page'
import type { PageData } from '../templates/types'
import { getData } from '../utilities/data'

const isDev = process.env.NODE_ENV !== 'production'

export default async function renderPage(slug: string | undefined, request: Request, statusCode?: number) {
  const data = (await getData(
    slug,
    request.headers.get('user-agent') ?? undefined,
    request.headers.get('cookie') ?? '',
  )) as unknown as PageData

  const html = renderToString(createElement(Page, { data }))
  const body = isDev ? html : injectModulePreloads(html)
  const isNotFound = data.slug?.current === 'not-found'

  return new Response(`<!DOCTYPE html>${body}`, {
    status: statusCode ?? (isNotFound ? 404 : 200),
    headers: {
      ...(data.isPreview && { 'cache-control': 'private, no-store' }),
      'content-type': 'text/html; charset=utf-8',
    },
  })
}
