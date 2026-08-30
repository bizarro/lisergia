import { stegaClean } from '@sanity/client/stega'

import Footer from '../layout/Footer'
import Menu from '../layout/Menu'
import Navigation from '../layout/Navigation'
import Sections from '../sections/Sections'
import PageHead from '../shared/PageHead'
import Scripts from '../shared/Scripts'
import type { PageData } from '../types'

interface PageProps {
  data: PageData
}

export default function Page({ data }: PageProps) {
  const {
    categories,
    content,
    footer,
    isPhone,
    isPreview,
    isTablet,
    label,
    menu,
    posthog,
    price,
    settings,
    slug,
    social,
    title,
  } = data

  const deviceClass = isPhone ? 'phone' : isTablet ? 'tablet' : 'desktop'

  return (
    <html
      className={deviceClass}
      data-sanity-preview={isPreview ? 'true' : undefined}
      data-template="page"
      id={stegaClean(slug?.current)}
      lang="en"
    >
      <head>
        <PageHead data={data} />
      </head>
      <body>
        <Menu menu={menu} settings={settings} />
        <Navigation />

        <div className="app">
          <div className="page">
            <div className="page__wrapper">
              <div className="page__content">
                {content && (
                  <Sections
                    content={content}
                    categories={categories}
                    label={label}
                    title={title}
                    price={price}
                    slug={slug?.current}
                  />
                )}
              </div>

              <div className="page__footer"></div>

              <Footer footer={footer} settings={settings} social={social} />
            </div>
          </div>
        </div>

        <Scripts posthog={posthog} />
      </body>
    </html>
  )
}
