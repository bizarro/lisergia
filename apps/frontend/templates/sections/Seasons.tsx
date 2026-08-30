import { getAsset } from '../helpers'
import type { SeasonsSection } from '../types'

export default function Seasons({ section }: { section: SeasonsSection }) {
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
            {section.list?.map((item, index) => {
              const asset = getAsset(item.asset)
              return (
                <figure key={index} className={`seasons__gallery__media seasons__gallery__media--${index + 1}`}>
                  <img
                    alt={asset.alt}
                    className="seasons__gallery__media__image"
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
