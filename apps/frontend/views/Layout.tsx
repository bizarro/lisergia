import { Html } from '@elysiajs/html'
import type { PageData } from '@utilities/data'

import { Footer, Menu, Navigation } from './layout/index'
import { Hero, Highlight } from './sections'
import { Head, Scripts } from './shared'

interface LayoutProps {
  page: PageData
}

const sectionsMap = {
  hero: Hero,
  highlight: Highlight,
}

export const Layout = ({ page }: LayoutProps) => {
  const { isPhone, isTablet } = page
  const template = page.data?.template || 'page'
  const slug = page.data?.slug?.current || 'home'

  return (
    <html
      class={isPhone ? 'phone' : isTablet ? 'tablet' : 'desktop'}
      data-template={template || 'page'}
      id={slug}
      lang="en"
    >
      <Head social={page.data.social} typekit={page.typekit} />
      <body>
        <Menu menu={page.menu} settings={page.settings} />
        <Navigation />

        <div class="app">
          <div class="page">
            <div class="page__wrapper">
              <div class="page__content">
                {page.data.content?.map((section: any) => {
                  const SectionComponent = sectionsMap[section._type as keyof typeof sectionsMap]

                  if (!SectionComponent) {
                    console.warn(`Missing section component: ${section._type}`)
                    return null
                  }

                  return (
                    <SectionComponent
                      key={section._key}
                      {...section}
                      getAsset={page.getAsset}
                    />
                  )
                })}
              </div>

              <div class="page__footer"></div>

              <Footer
                social={page.data.social}
                footer={page.footer}
                settings={page.settings}
                parseHTML={page.parseHTML}
                lowercase={page.lowercase}
              />
            </div>
        </div>
        </div>

        <Scripts analytics={page.analytics} />
      </body>
    </html>
  )
}
