import { stegaClean } from '@sanity/client/stega'

import { getAsset } from '../helpers'
import { bundle, fonts } from '../manifest'
import type { PageData } from '../types'

const isDev = process.env.NODE_ENV !== 'production'
const vitePort = process.env.VITE_PORT ?? process.env.BROWSERSYNC_PORT ?? '5173'
const viteOrigin = process.env.VITE_ORIGIN ?? `http://localhost:${vitePort}`
const assetOrigin = isDev ? viteOrigin : ''

interface PageHeadProps {
  data: PageData
}

export default function PageHead({ data }: PageHeadProps) {
  const { social } = data
  const cleanSocial = stegaClean(social)
  const socialImage = cleanSocial?.image ? getAsset(cleanSocial.image) : null

  return (
    <>
      {/* Default */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui" />

      <title>{cleanSocial?.title}</title>

      <meta name="description" content={cleanSocial?.description} />

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      {cleanSocial?.title && (
        <>
          <meta property="og:title" content={cleanSocial.title} />
          <meta name="twitter:title" content={cleanSocial.title} />
        </>
      )}

      {socialImage && (
        <>
          <meta property="og:image" content={socialImage.url} />
          <meta name="twitter:image" content={socialImage.url} />
        </>
      )}

      {cleanSocial?.description && (
        <>
          <meta property="og:description" content={cleanSocial.description} />
          <meta name="twitter:description" content={cleanSocial.description} />
        </>
      )}

      {/* Stylesheets */}
      <link rel="preconnect" href="https://cdn.sanity.io" />

      {fonts.map((font) => (
        <link
          as="font"
          crossOrigin="anonymous"
          href={`${assetOrigin}${font}`}
          key={font}
          rel="preload"
          type="font/woff2"
        />
      ))}

      {isDev ? (
        <link rel="stylesheet" href={`${viteOrigin}/styles/index.scss`} type="text/css" />
      ) : (
        bundle.css.map((href) => <link href={href} key={href} rel="stylesheet" type="text/css" />)
      )}

      {/* Favicons */}
      <meta name="apple-mobile-web-app-title" content={cleanSocial?.title} />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    </>
  )
}
