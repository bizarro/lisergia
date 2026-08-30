import { getAsset } from '../helpers'
import type { CategoriesSection } from '../types'

export default function Categories({ section }: { section: CategoriesSection }) {
  const list = section.list ?? []
  const lastItem = list[list.length - 1]

  return (
    <section className="categories">
      <div className="categories__wrapper">
        <div className="categories__content">
          <p className="categories__label" data-reveal="categories__label--active">
            {section.label}
          </p>

          <h2 className="categories__title" data-title="top,bottom">
            {section.title}
          </h2>
        </div>

        <div className="categories__gallery">
          {lastItem && (
            <div className="categories__gallery__media categories__gallery__media--effect">
              {lastItem.link?.title}

              <figure>
                <img
                  alt={getAsset(lastItem.image).alt}
                  className="categories__gallery__image"
                  data-src={getAsset(lastItem.image).url}
                  height="100%"
                  width="100%"
                />
              </figure>
            </div>
          )}

          {list.map((item, index) => {
            const asset = getAsset(item.image)
            return (
              <div key={index} className="categories__gallery__media">
                {item.link?.title}

                <figure>
                  <img
                    alt={asset.alt}
                    className="categories__gallery__image"
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
