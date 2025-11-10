import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface QuoteProps {
  title: string
  list: { asset: SanityImageSource }[]
  getAsset: PageData['getAsset']
}

const Quote = ({ title, list, getAsset }: QuoteProps) => {
  const titleParts = title.split('|')

  return (
    <section class="quote" data-reveal="quote--active">
      <div class="quote__box">
        <p class="quote__description">
          {titleParts.map((part) => (
            <span>{part}</span>
          ))}
        </p>

        {list.map((item, index) => {
          const asset = getAsset(item.asset)

          return (
            <figure class="quote__media">
              <img
                alt={asset?.alt || `quote image ${index + 1}`}
                class="quote__image"
                data-src={asset.url}
                height="100%"
                width="100%"
              />
            </figure>
          )
        })}
      </div>
    </section>
  )
}

export default Quote
