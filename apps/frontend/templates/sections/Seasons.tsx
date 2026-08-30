import SanityImage from '../components/SanityImage'
import type { SeasonsSection } from '../types'

export default function Seasons({ section, priority = false }: { section: SeasonsSection; priority?: boolean }) {
  const titleParts = section.title?.split('-') ?? []

  return (
    <section className="seasons">
      <div className="seasons__wrapper">
        <div className="seasons__box">
          <h2 className="seasons__title" data-title="left,right">
            {titleParts.map((part, index) => (
              <span key={index}>{index < titleParts.length - 1 ? `${part}-` : part}</span>
            ))}
          </h2>

          <p className="seasons__description" data-paragraph>
            {section.description}
          </p>

          <p className="seasons__highlight">{section.label}</p>

          <div className="seasons__gallery">
            {section.list?.map((item, index) => (
              <figure key={index} className={`seasons__gallery__media seasons__gallery__media--${index + 1}`}>
                <SanityImage
                  className="seasons__gallery__media__image"
                  fallbackAlt={section.title}
                  height="100%"
                  image={item}
                  priority={priority && index === 0}
                  width="100%"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
