import { Html } from '@elysiajs/html'
import type { PageData } from '@utilities/data'
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
            {/* {% block content %}

            {% endblock %} */}
        </div>

        <Scripts analytics={page.analytics} />
      </body>
    </html>
  )
}
