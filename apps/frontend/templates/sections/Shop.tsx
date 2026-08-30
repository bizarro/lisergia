import { stegaClean } from '@sanity/client/stega'

import SanityImage from '../components/SanityImage'
import type { Category, ShopSection } from '../types'

interface ShopProps {
  section: ShopSection
  categories: Category[]
  priority?: boolean
}

export default function Shop({ section, categories, priority = false }: ShopProps) {
  return (
    <section className="shop">
      <div className="shop__wrapper">
        <header className="shop__header">
          <span className="shop__header__titles">
            <span className="shop__header__titles__wrapper">
              {categories.map((category, index) => (
                <span key={index} className="shop__header__title">
                  <span className="shop__header__title__text">{category.title}</span>
                  <span className="shop__header__title__number">(3)</span>
                </span>
              ))}
            </span>
          </span>
        </header>

        <div className="shop__content">
          {section.list?.map((category, catIndex) => (
            <section key={catIndex} className="shop__category">
              {category.content?.map((item, itemIndex) => {
                if (stegaClean(item.entry.type) === 'product' && item.entry.product) {
                  const product = item.entry.product
                  return (
                    <article key={itemIndex} className="shop__category__item">
                      <a href={`/product/${stegaClean(product.slug.current)}`}>
                        <figure className="shop__category__item__media">
                          <SanityImage
                            className="shop__category__item__media__image"
                            fallbackAlt={product.title}
                            height="100%"
                            image={product.image}
                            priority={priority && catIndex === 0 && itemIndex === 0}
                            width="100%"
                          />
                        </figure>

                        <div className="shop__category__content">
                          <p className="shop__category__label" data-reveal="shop__category__label--active">
                            {product.label}
                          </p>

                          <div data-paragraph>
                            <p className="shop__category__title">{product.title}</p>
                            <p className="shop__category__price">{product.price}</p>
                          </div>
                        </div>
                      </a>
                    </article>
                  )
                }

                if (stegaClean(item.entry.type) === 'image' && item.entry.image) {
                  return (
                    <figure key={itemIndex} className="shop__category__media" data-parallax>
                      <SanityImage
                        className="shop__category__media__image"
                        height="100%"
                        image={item.entry.image}
                        priority={priority && catIndex === 0 && itemIndex === 0}
                        width="100%"
                      />
                    </figure>
                  )
                }

                return null
              })}
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
