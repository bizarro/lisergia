import SanityImage from '../components/SanityImage'
import type { QuoteSection } from '../types'

export default function Quote({ section, priority = false }: { section: QuoteSection; priority?: boolean }) {
  const parts = section.title?.split('|') ?? []

  return (
    <section className="quote" data-reveal="quote--active">
      <div className="quote__box">
        <p className="quote__description">
          {parts.map((part, index) => (
            <span key={index}>{part}</span>
          ))}
        </p>

        {section.list?.map((item, index) => (
          <figure key={index} className="quote__media">
            <SanityImage
              className="quote__image"
              fallbackAlt={section.title}
              height="100%"
              image={item}
              priority={priority && index === 0}
              width="100%"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
