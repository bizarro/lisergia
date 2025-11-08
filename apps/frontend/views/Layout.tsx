import { Html } from '@elysiajs/html'
import type { PageData } from '@utilities/data'
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
        {/* {% include 'layout/menu.twig' %}
        {% include 'layout/navigation.twig' %} */}

        <div class="app">
            {/* {% block content %}

            {% endblock %} */}
        </div>

        <Scripts analytics={page.analytics} />
      </body>
    </html>
  )
}
