import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface CategoriesProps {
  label: string
  title: string
  list: {
    link: { title: string },
    image: SanityImageSource
  }[]
  getAsset: PageData['getAsset']
}

const Categories = ({ label, title, list, getAsset }: CategoriesProps) => {
  const lastItem = list[list.length - 1]

  return (
    <section class="categories">
      <div class="categories__wrapper">
        <div class="categories__content">
          <p class="categories__label" data-reveal="categories__label--active">
            {label}
          </p>

          <h2 class="categories__title" data-title="top,bottom">{title}</h2>
        </div>

        <div class="categories__gallery">
          {lastItem && (
            <div class="categories__gallery__media categories__gallery__media--effect">
              {lastItem.link.title}

              <figure>
                <img
                  alt={(getAsset(lastItem.image) as any)?.alt || ''}
                  class="categories__gallery__image"
                  data-src={getAsset(lastItem.image).url}
                  height="100%"
                  width="100%"
                />
              </figure>
            </div>
          )}

          {list.map((item) => {
            const asset = getAsset(item.image)

            return (
              <div class="categories__gallery__media">
                {item.link.title}

                <figure>
                  <img
                    alt={(asset as any)?.alt || ''}
                    class="categories__gallery__image"
                    data-src={asset.url}
                    height="100%"
                    width="100%"
                  />
                </figure>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Categories
