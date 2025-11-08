import { Html } from "@elysiajs/html"
import { PageData } from "@utilities/data"

interface HeadProps {
  social: {
    title: string
    description: string
  },
  typekit?: PageData['typekit']
}

const Head = ({ social, typekit }: HeadProps) => {
  const dev = import.meta.env.DEV

  return (
    <head>
      {/* Default */}
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui" />

      <title>
        {social.title}
      </title>

      <meta name="description" content={social.description} />

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      { social.title && (
        <>
          <meta property="og:title" content={social.title} />
          <meta name="twitter:title" content={social.title} />
        </>
      )}

      { social.description && (
        <>
          <meta property="og:description" content={social.description} />
          <meta name="twitter:description" content={social.description} />
        </>
      )}

      {/* Stylesheets */}
      <link rel="preconnect" href="https://api.sanity.io" />

      {typekit && (
        <>
          <link rel="preconnect" href="https://use.typekit.net" />
          <link rel="preload" href={`https://use.typekit.net/${typekit}.css`} as="style" />
          <link rel="stylesheet" href={`https://use.typekit.net/${typekit}.css`} media="print" onload="this.media='all'" />
        </>
      )}

      {!dev && <link rel="stylesheet" href="/bundle.css" type="text/css" />}

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="apple-mobile-web-app-title" content={social.title} />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    </head>
  )
}

export default Head;
