import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"
import { Button } from "../components/Button"

interface DetailsProps {
  label: string
  title: string
  price: string
  slug: { current: string }
  description: any
  gallery: SanityImageSource[]
  getAsset: PageData['getAsset']
  parseHTML: PageData['parseHTML']
}

const Details = ({ label, title, price, slug, description, gallery, getAsset, parseHTML }: DetailsProps) => {
  return (
    <header class="details">
      <div class="details__gallery">
        {gallery.map((item, index) => {
          const asset = getAsset(item)

          return (
            <figure
              class={`details__header__media ${index === 0 ? 'details__header__media--active' : ''}`}
              data-parallax
            >
              <img
                alt={asset?.alt || ''}
                class="details__header__media__image"
                data-src={asset.url}
                height="100%"
                width="100%"
              />
            </figure>
          )
        })}

        <div class="details__gallery__navigation">
          {gallery.map((_, index) => (
            <button
              class={`details__gallery__navigation__button ${
                index === 0 ? 'details__gallery__navigation__button--active' : ''
              }`}
              data-index={index}
            >
              See {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div class="details__information">
        <p class="details__information__label" data-reveal="details__information__label--active">
          {label}
        </p>

        <h2 class="details__information__title" data-title="left,top,bottom,right">{title}</h2>

        <div class="details__information__description">
          {(parseHTML(description) || '').replace(/<p>/g, '<p data-paragraph>')
            .replace(/<ul>/g, '<ul class="details__information__description__list">')
            .replace(/<li>/g, '<li class="details__information__description__item" data-reveal="details__information__description__item--active"><div>')
            .replace(/<\/li>/g, '</div></li>')}
        </div>

        <Button
          class="details__information__button"
          text={`Add to Your Bag — ${price}`}
          url={slug?.current || ''}
        />
      </div>
    </header>
  )
}

export default Details
