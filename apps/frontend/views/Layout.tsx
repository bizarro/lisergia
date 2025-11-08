import { Html } from '@elysiajs/html'
import type { PageData } from '@utilities/data'
import { Footer } from './layout/Footer'
import { Menu } from './layout/Menu'
import { Navigation } from './layout/Navigation'
import { Head } from './shared/Head'
import { Scripts } from './shared/Scripts'

interface LayoutProps {
  page: PageData
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
                {/* {% include '../sections/index.twig' %} */}
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
