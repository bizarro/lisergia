import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"
import { Button } from "../components/Button"

interface ErrorProps {
  image: SanityImageSource
  title: string
  description: string
  button: {
    text: string
    url: string
  }
  getAsset: PageData['getAsset']
}

const Error = ({ image, title, description, button, getAsset }: ErrorProps) => {
  const asset = getAsset(image)

  return (
    <header class="error">
      <figure class="error__media">
        <img
          alt={asset?.alt || 'Error'}
          class="error__media__image"
          data-src={asset.url}
          height="100%"
          width="100%"
        />
      </figure>

      <div class="error__wrapper">
        <div class="error__content">
          <h1 class="error__title">{title}</h1>

          <p class="error__description">
            {description}
          </p>

          <div class="error__button">
            <Button class="error__button__element" text={button.text} url={button.url} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Error
