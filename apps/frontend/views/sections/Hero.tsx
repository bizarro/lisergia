import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"
import { Button } from "../components/Button"

interface HeroProps {
  image: SanityImageSource
  title: string
  button: {
    text: string
    url: string
  }
  getAsset: PageData['getAsset']
}

const Hero = ({ image, title, button, getAsset }: HeroProps) => {
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
                  <Button class="hero__button__element" text={button.text} url={button.url} />
              </div>
          </div>
      </div>
  </header>
  )
}

export default Hero
