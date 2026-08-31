import Button from '../components/Button'
import SanityImage from '../components/SanityImage'
import { parseHTML } from '../helpers'
import type { DetailsSection } from '../types'

interface DetailsProps {
  section: DetailsSection
  label?: string
  title?: string
  price?: number
  slug?: string
}

function processDetailsHTML(html: string): string {
  return html
    .replace(/<p>/g, '<p data-paragraph>')
    .replace(/<ul>/g, '<ul class="details__information__description__list">')
    .replace(
      /<li>/g,
      '<li class="details__information__description__item" data-reveal="details__information__description__item--active"><div>',
    )
    .replace(/<\/li>/g, '</div></li>')
}

export default function Details({
  section,
  label,
  title,
  price,
  priority = false,
}: DetailsProps & { priority?: boolean }) {
  const gallery = section.gallery ?? []

  return (
    <header className="details">
      <div className="details__gallery">
        {gallery.map((item, index) => (
          <figure
            key={index}
            className={`details__header__media${index === 0 ? ' details__header__media--active' : ''}`}
            data-parallax
          >
            <SanityImage
              className="details__header__media__image"
              fallbackAlt={title}
              image={item}
              priority={priority && index === 0}
              sizes="(max-width: 767px) calc(100vw - 40px), 47vw"
            />
          </figure>
        ))}

        <div className="details__gallery__navigation">
          {gallery.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`details__gallery__navigation__button${index === 0 ? ' details__gallery__navigation__button--active' : ''}`}
              data-index={String(index)}
            >
              See {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="details__information">
        <p className="details__information__label" data-reveal="details__information__label--active">
          {label}
        </p>

        <h2 className="details__information__title" data-title="left,top,bottom,right">
          {title}
        </h2>

        <div
          className="details__information__description"
          dangerouslySetInnerHTML={{
            __html: processDetailsHTML(parseHTML(section.description)),
          }}
        />

        <Button class="details__information__button" text={`Add to Your Bag — ${price ?? ''}`} url="" />
      </div>
    </header>
  )
}
