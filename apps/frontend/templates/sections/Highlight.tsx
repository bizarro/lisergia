import SanityImage from '../components/SanityImage'
import type { HighlightSection } from '../types'

const speeds = [1.5, -0.5, 1, -2]

export default function Highlight({ section, priority = false }: { section: HighlightSection; priority?: boolean }) {
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

      {section.list?.map((media, index) => (
        <figure key={index} className="highlight__media" data-translate={String(speeds[index] ?? 0)}>
          <div className="highlight__media__box">
            <SanityImage
              className="highlight__media__image"
              fallbackAlt={section.title}
              height="100%"
              image={media}
              priority={priority && index === 0}
              width="100%"
            />
          </div>
        </figure>
      ))}
    </section>
  )
}
