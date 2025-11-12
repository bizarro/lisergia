import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface HighlightProps {
  label: string
  title: string
  description: string
  list: SanityImageSource[]
  getAsset: PageData['getAsset']
}

const Highlight = ({ label, title, description, list, getAsset }: HighlightProps) => {
  return (
    <section class="highlight">
      <p class="highlight__label" data-reveal="highlight__label--active">
        {label}
      </p>

      <h2 class="highlight__title" data-title="left,top,bottom">{title}</h2>

      <p class="highlight__description" data-paragraph>
        {description}
      </p>

      {list.map((media, index) => {
        let speed = 0

        if (index === 0) {
          speed = 1.5
        } else if (index === 1) {
          speed = -0.5
        } else if (index === 2) {
          speed = 1
        } else if (index === 3) {
          speed = -2
        }

        const asset = getAsset(media)

        return (
          <figure class="highlight__media" data-translate={speed.toString()}>
            <div class="highlight__media__box">
              <img
                alt={asset?.alt || ''}
                class="highlight__media__image"
                data-src={asset.url}
                height="100%"
                width="100%"
              />
            </div>
          </figure>
        )
      })}
    </section>
  )
}

export default Highlight
