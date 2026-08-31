import { stegaClean } from '@sanity/client/stega'

import SanityImage from '../components/SanityImage'
import { parseHTML } from '../helpers'
import type { InformationSection } from '../types'

function processInformationHTML(html: string): string {
  return html
    .replace(/<h2>/g, '<h2 class="information__content__title" data-reveal="information__content__title--active">')
    .replace(/<p>/g, '<p data-paragraph>')
    .replace(/<ul>/g, '<ul class="information__content__list">')
    .replace(
      /<li>/g,
      '<li class="information__content__item" data-reveal="information__content__item--active"><div><span>',
    )
    .replace(/<br\/>/g, '</span><span>')
    .replace(/<\/li>/g, '</span></div></li>')
}

export default function Information({
  section,
  priority = false,
}: {
  section: InformationSection
  priority?: boolean
}) {
  return (
    <section className={`information information--${stegaClean(section.type) ?? ''}`}>
      <div className="information__media">
        {section.image && (
          <figure className="information__media__image" data-parallax>
            <SanityImage
              className="information__media__image"
              image={section.image}
              priority={priority}
              sizes="(max-width: 767px) calc(100vw - 40px), 47vw"
            />
          </figure>
        )}
      </div>

      <div className="information__content">
        <div
          className="information__content__wrapper"
          dangerouslySetInnerHTML={{
            __html: processInformationHTML(parseHTML(section.description)),
          }}
        />
      </div>
    </section>
  )
}
