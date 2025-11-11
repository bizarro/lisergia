import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface ShopProps {
  categories: any[]
  list: {
    content: {
      entry: {
        type: 'product' | 'image'
        product?: {
          slug: { current: string }
          image: { asset: SanityImageSource }
          label: string
          title: string
          price: string
        }
        image?: { asset: SanityImageSource }
      }
    }[]
  }[]
  getAsset: PageData['getAsset']
}

const Shop = ({ categories, list, getAsset }: ShopProps) => {
  return (
    <section class="shop">
      <div class="shop__wrapper">
        <header class="shop__header">
          <span class="shop__header__titles">
            <span class="shop__header__titles__wrapper">
              {categories.map((category) => (
                <span class="shop__header__title">
                  <span class="shop__header__title__text">{category.title}</span>

                  {/* TODO: Add filter to list how many products are in a category. */}
                  <span class="shop__header__title__number">({3})</span>
                </span>
              ))}
            </span>
          </span>
        </header>

        <div class="shop__content">
          {list.map((category) => (
            <section class="shop__category">
              {category.content.map((item) => {
                if (item.entry.type === 'product' && item.entry.product) {
                  const asset = getAsset(item.entry.product.image.asset)

                  return (
                    <article class="shop__category__item">
                      <a href={`/product/${item.entry.product.slug.current}`}>
                        <figure class="shop__category__item__media">
                          <img
                            alt={asset?.alt || ''}
                            class="shop__category__item__media__image"
                            data-src={asset.url}
                            height="100%"
                            width="100%"
                          />
                        </figure>

                        <div class="shop__category__content">
                          <p class="shop__category__label" data-reveal="shop__category__label--active">
                            {item.entry.product.label}
                          </p>

                          <div data-paragraph>
                            <p class="shop__category__title">
                              {item.entry.product.title}
                            </p>

                            <p class="shop__category__price">
                              {item.entry.product.price}
                            </p>
                          </div>
                        </div>
                      </a>
                    </article>
                  )
                } else if (item.entry.type === 'image' && item.entry.image) {
                  const asset = getAsset(item.entry.image.asset)

                  return (
                    <figure class="shop__category__media" data-parallax>
                      <img
                        alt={asset?.alt || ''}
                        class="shop__category__media__image"
                        data-src={asset.url}
                        height="100%"
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

export default Shop
