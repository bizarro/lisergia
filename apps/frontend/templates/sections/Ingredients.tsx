import SanityImage from '../components/SanityImage'
import { parseHTML } from '../helpers'
import type { IngredientsSection } from '../types'

export default function Ingredients({
  section,
  priority = false,
}: {
  section: IngredientsSection
  priority?: boolean
}) {
  return (
    <section className="ingredients">
      <div className="ingredients__box">
        <div className="ingredients__content">
          <h2 className="ingredients__title" data-title="top,bottom">
            {section.title}
          </h2>

          <div
            className="ingredients__description"
            data-paragraph
            dangerouslySetInnerHTML={{ __html: parseHTML(section.description) }}
          />

          <div className="ingredients__list">
            {section.list?.map((ingredient, index) => (
              <div key={index} className="ingredients__item" data-paragraph>
                <p className="ingredients__name">{ingredient.title}</p>
                <p className="ingredients__region">{ingredient.region}</p>
                <p className="ingredients__type">{ingredient.ingredient}</p>
                <span className="ingredients__item__dash" data-reveal="ingredients__item__dash--active"></span>
              </div>
            ))}
          </div>
        </div>

        <figure className="ingredients__media" data-animation="parallax">
          <SanityImage
            className="ingredients__media__image"
            fallbackAlt={section.title}
            height="100%"
            image={section.image}
            priority={priority}
            width="100%"
          />
        </figure>
      </div>
    </section>
  )
}
