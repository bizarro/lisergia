import SanityImage from '../components/SanityImage'
import type { CategoriesSection } from '../types'

export default function Categories({ section, priority = false }: { section: CategoriesSection; priority?: boolean }) {
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
                <SanityImage
                  className="categories__gallery__image"
                  fallbackAlt={lastItem.link?.title ?? section.title}
                  height="100%"
                  image={lastItem.image}
                  priority={priority}
                  width="100%"
                />
              </figure>
            </div>
          )}

          {list.map((item, index) => (
            <div key={index} className="categories__gallery__media">
              {item.link?.title}

              <figure>
                <SanityImage
                  className="categories__gallery__image"
                  fallbackAlt={item.link?.title ?? section.title}
                  height="100%"
                  image={item.image}
                  width="100%"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
