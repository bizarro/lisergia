import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface InformationProps {
  type: 'left' | 'right'
  description: any
  image: SanityImageSource
  getAsset: PageData['getAsset']
  parseHTML: PageData['parseHTML']
}

const Information = ({ type, description, image, getAsset, parseHTML }: InformationProps) => {
  const asset = getAsset(image)

  return (
    <section class={`information information--${type}`}>
      <div class="information__media">
        <figure class="information__media__image" data-parallax>
          <img
            alt={asset?.alt || ''}
            class="information__media__image"
            data-src={asset.url}
            height="100%"
            width="100%"
          />
        </figure>
      </div>

      <div class="information__content">
        <div class="information__content__wrapper">
          {(parseHTML(description) || '')
            .replace(/<h2>/g, '<h2 class="information__content__title" data-reveal="information__content__title--active">')
            .replace(/<p>/g, '<p data-paragraph>')
            .replace(/<ul>/g, '<ul class="information__content__list">')
            .replace(/<li>/g, '<li class="information__content__item" data-reveal="information__content__item--active"><div><span>')
            .replace(/<br\/?>/g, '</span><span>')
            .replace(/<\/li>/g, '</span></div></li>')}
        </div>
      </div>
    </section>
  )
}

export default Information
