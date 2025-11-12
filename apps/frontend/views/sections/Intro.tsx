import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface IntroProps {
  label: string
  title: string
  description: string
  image: SanityImageSource
  getAsset: PageData['getAsset']
}

const Intro = ({ label, title, description, image, getAsset }: IntroProps) => {
  const asset = getAsset(image)

  return (
    <header class="intro">
      <div class="intro__content">
        <p class="intro__label" data-reveal="intro__label--active">
          {label}
        </p>

        <h1 class="intro__title" data-title="left,top,bottom">{title}</h1>

        <p class="intro__description" data-paragraph>
          {description}
        </p>
      </div>

      <figure class="intro__media" data-parallax>
        <img
          alt={asset.alt || ''}
          class="intro__media__image"
          data-src={asset.url}
          height="100%"
          width="100%"
        />
      </figure>
    </header>
  )
}

export default Intro
