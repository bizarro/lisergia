import { stegaClean } from '@sanity/client/stega'

import { getAsset, parseHTML } from '../helpers'
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

export default function Information({ section }: { section: InformationSection }) {
  const asset = section.image?.asset ? getAsset(section.image.asset) : null

  return (
    <section className={`information information--${stegaClean(section.type) ?? ''}`}>
      <div className="information__media">
        {asset && (
          <figure className="information__media__image" data-parallax>
            <img
              alt={asset.alt}
              className="information__media__image"
              data-src={asset.url}
              height="100%"
              width="100%"
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
