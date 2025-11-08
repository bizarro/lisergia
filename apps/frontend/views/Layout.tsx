import { Html } from '@elysiajs/html'
import type { PageData } from '../utilities/data'

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
      <head>
        {/* {% include 'shared/header.twig' %} */}
      </head>
      <body>
        <h1>hello world</h1>
        {/* {% include 'layout/menu.twig' %}
        {% include 'layout/navigation.twig' %} */}

        <div class="app">
            {/* {% block content %}

            {% endblock %} */}
        </div>

        {/* {% include 'shared/scripts.twig' %} */}
      </body>
    </html>
  )
}
