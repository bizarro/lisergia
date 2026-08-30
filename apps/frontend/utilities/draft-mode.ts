import { type ClientPerspective, validateApiPerspective } from '@sanity/client'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import {
  perspectiveCookieName,
  urlSearchParamPreviewSecret,
} from '@sanity/preview-url-secret/constants'
import { withoutSecretSearchParams } from '@sanity/preview-url-secret/without-secret-search-params'

import { client } from '../client'

const cookieOptions = 'Path=/; HttpOnly; Secure; SameSite=None; Max-Age=3600'

function parsePerspective(value: string | null | undefined): ClientPerspective | null {
  if (!value) return null

  const decoded = decodeURIComponent(value)
  const perspective = decoded.includes(',') ? decoded.split(',') : decoded

  try {
    validateApiPerspective(perspective)
    return perspective === 'raw' ? 'drafts' : perspective
  } catch {
    return null
  }
}

function readCookie(cookieHeader: string, name: string): string | undefined {
  return cookieHeader
    .split(';')
    .map((cookie) => cookie.trim().split('='))
    .find(([cookieName]) => cookieName === name)
    ?.slice(1)
    .join('=')
}

export function isDraftMode(cookieHeader: string): boolean {
  return Boolean(readCookie(cookieHeader, perspectiveCookieName))
}

export function getPreviewPerspective(cookieHeader: string): ClientPerspective {
  return parsePerspective(readCookie(cookieHeader, perspectiveCookieName)) ?? 'drafts'
}

export async function enableDraftMode(request: Request): Promise<Response> {
  const token = process.env.SANITY_API_READ_TOKEN
  if (!token) return new Response('Missing SANITY_API_READ_TOKEN', { status: 500 })
  if (!new URL(request.url).searchParams.has(urlSearchParamPreviewSecret)) {
    return new Response('Missing preview secret', { status: 400 })
  }

  const { isValid, redirectTo, studioPreviewPerspective } = await validatePreviewUrl(
    client.withConfig({ token }),
    request.url,
  )

  if (!isValid) return new Response('Invalid preview secret', { status: 401 })

  const redirectUrl = redirectTo
    ? withoutSecretSearchParams(new URL(redirectTo, request.url))
    : new URL('/', request.url)
  const redirect = `${redirectUrl.pathname}${redirectUrl.search}`
  const perspective = parsePerspective(studioPreviewPerspective) ?? 'drafts'
  const value = encodeURIComponent(Array.isArray(perspective) ? perspective.join(',') : perspective)

  return new Response(null, {
    status: 307,
    headers: {
      'Cache-Control': 'private, no-store',
      Location: redirect,
      'Set-Cookie': `${perspectiveCookieName}=${value}; ${cookieOptions}`,
    },
  })
}

export function disableDraftMode(): Response {
  return new Response(null, {
    status: 307,
    headers: {
      'Cache-Control': 'private, no-store',
      Location: '/',
      'Set-Cookie': `${perspectiveCookieName}=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0`,
    },
  })
}

export function updatePreviewPerspective(request: Request): Response {
  const cookieHeader = request.headers.get('cookie') ?? ''
  if (!isDraftMode(cookieHeader)) return new Response(null, { status: 401 })

  const requested = new URL(request.url).searchParams.get('perspective') ?? undefined
  const perspective = parsePerspective(requested)
  if (!perspective) return new Response(null, { status: 400 })

  const current = getPreviewPerspective(cookieHeader)
  const currentValue = Array.isArray(current) ? current.join(',') : current
  const nextValue = Array.isArray(perspective) ? perspective.join(',') : perspective

  if (currentValue === nextValue) return new Response(null, { status: 204 })

  return new Response(null, {
    status: 200,
    headers: {
      'Cache-Control': 'private, no-store',
      'Set-Cookie': `${perspectiveCookieName}=${encodeURIComponent(nextValue)}; ${cookieOptions}`,
    },
  })
}
