import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface HeaderProps {
  image: SanityImageSource
  title: string
  getAsset: PageData['getAsset']
}

const Header = ({ image, title, getAsset }: HeaderProps) => {
  const asset = getAsset(image)

  return (
    <header class="header">
      <div class="header__box">
        <figure class="header__media">
          <img
            alt={asset?.alt || ''}
            class="header__media__image"
            data-src={asset.url}
            height="100%"
            width="100%"
          />
        </figure>

        <div class="header__content">
          <h1 class="header__title" data-reveal="header__title--active" data-title="left,top,left,bottom,right">
            {title}
          </h1>
        </div>
      </div>
    </header>
  )
}

export default Header
