import SanityImage from '../components/SanityImage'
import type { HighlightSection } from '../types'

const speeds = [1.5, -0.5, 1, -2]
const imageSizes = [
  '(max-width: 767px) 51vw, 29vw',
  '(max-width: 767px) 39vw, 16vw',
  '(max-width: 767px) 38vw, 18vw',
  '(max-width: 767px) 60vw, 33vw',
]

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
              image={media}
              priority={priority && index === 0}
              sizes={imageSizes[index] ?? '60vw'}
            />
          </div>
        </figure>
      ))}
    </section>
  )
}
