import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface HeroProps {
  image: SanityImageSource
  title: string
  getAsset: PageData['getAsset']
}

export const Hero = ({ image, title, getAsset }: HeroProps) => {
  const asset = getAsset(image)

  return (
    <header class="hero">
      <div class="hero__box">
          <figure class="hero__media">

              <img
                  alt={asset?.alt || 'Hero Image'}
                  class="hero__media__image"
                  data-src={asset.url}
                  height="100%"
                  width="100%"
              />
          </figure>

          <div class="hero__content">
              <h1 class="hero__title">{title}</h1>

              <div class="hero__button">
                  {/* {% include '../components/button.twig' with {
                      class: 'hero__button__element',
                      text: section.button.text,
                      url: section.button.url
                  } %} */}
              </div>
          </div>
      </div>
  </header>
  )
}
