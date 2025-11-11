import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface IngredientsProps {
  title: string
  description: any
  list: { title: string; region: string; ingredient: string }[]
  image: SanityImageSource
  getAsset: PageData['getAsset']
  parseHTML: PageData['parseHTML']
}

const Ingredients = ({ title, description, list, image, getAsset, parseHTML }: IngredientsProps) => {
  const asset = getAsset(image)

  return (
    <section class="ingredients">
      <div class="ingredients__box">
        <div class="ingredients__content">
          <h2 class="ingredients__title" data-title="top,bottom">{title}</h2>

          <div class="ingredients__description" data-paragraph>
            {parseHTML(description)}
          </div>

          <div class="ingredients__list">
            {list.map((ingredient, index) => (
              <div class="ingredients__item" data-paragraph>
                <p class="ingredients__name">
                  {ingredient.title}
                </p>

                <p class="ingredients__region">
                  {ingredient.region}
                </p>

                <p class="ingredients__type">
                  {ingredient.ingredient}
                </p>

                <span class="ingredients__item__dash" data-reveal="ingredients__item__dash--active"></span>
              </div>
            ))}
          </div>
        </div>

        <figure class="ingredients__media" data-animation="parallax">
          <img
            alt={asset?.alt || ''}
            class="ingredients__media__image"
            data-src={asset.url}
            height="100%"
            width="100%"
          />
        </figure>
      </div>
    </section>
  )
}

export default Ingredients
