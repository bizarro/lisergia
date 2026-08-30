import { getAsset } from '../helpers'
import type { HighlightSection } from '../types'

const speeds = [1.5, -0.5, 1, -2]

export default function Highlight({ section }: { section: HighlightSection }) {
  return (
    <section className="highlight">
      <p className="highlight__label" data-reveal="highlight__label--active">
        {section.label}
      </p>

      <h2 className="highlight__title" data-title="left,top,bottom">
        {section.title}
      </h2>

      <p className="highlight__description" data-paragraph>
        {section.description}
      </p>

      {section.list?.map((media, index) => {
        const asset = getAsset(media)
        return (
          <figure key={index} className="highlight__media" data-translate={String(speeds[index] ?? 0)}>
            <div className="highlight__media__box">
              <img
                alt={asset.alt}
                className="highlight__media__image"
                data-src={asset.url}
                height="100%"
                width="100%"
              />
            </div>
          </figure>
        )
      })}
    </section>
  )
}
