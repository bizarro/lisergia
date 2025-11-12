import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface ColumnsProps {
  type: 'left' | 'right'
  label: string
  title: string
  description: string
  list: SanityImageSource[]
  index: number
  getAsset: PageData['getAsset']
}

const Columns = ({ type, label, title, description, list, index, getAsset }: ColumnsProps) => {
  return (
    <section class={`columns columns--${type}`}>
      <div class="columns__media">
        {list.map((item, imageIndex) => {
          const asset = getAsset(item)

          return (
            <figure class={`columns__media__image columns__media__image--${imageIndex + 1}`} data-parallax>
              <img
                alt={asset?.alt || ''}
                class="columns__media__image"
                data-src={asset.url}
                height="100%"
                width="100%"
              />
            </figure>
          )
        })}
      </div>

      <div class="columns__content">
        <div class="columns__content__wrapper">
          <p class="columns__content__label" data-reveal="columns__content__label--active">
            {label}
          </p>

          <h2
            class="columns__content__title"
            data-title={index === 2 ? 'left,top,left,bottom,right' : 'top,bottom'}
          >
            {title}
          </h2>

          <p class="columns__content__description" data-paragraph>
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Columns