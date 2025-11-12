import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface SeasonsProps {
  title: string
  description: string
  label: string
  list: SanityImageSource[]
  getAsset: PageData['getAsset']
}

const Seasons = ({ title, description, label, list, getAsset }: SeasonsProps) => {
  return (
    <section class="seasons">
      <div class="seasons__wrapper">
        <div class="seasons__box">
          <h2 class="seasons__title" data-title="left,right">
            <span>
              {title.split('-').map((part, index) => (
                <span>
                  {part}
                  {index < title.split('-').length - 1 ? '-' : ''}
                </span>
              ))}
            </span>
          </h2>

          <p class="seasons__description" data-paragraph>
            {description}
          </p>

          <p class="seasons__highlight">
            {label}
          </p>

          <div class="seasons__gallery">
            {list.map((item, index) => {
              const asset = getAsset(item)

              return (
                <figure class={`seasons__gallery__media seasons__gallery__media--${index + 1}`}>
                  <img
                    alt={asset?.alt || ''}
                    class="seasons__gallery__media__image"
                    data-src={asset.url}
                    height="100%"
                    width="100%"
                  />
                </figure>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Seasons
