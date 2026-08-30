import { getAsset } from '../helpers'
import type { QuoteSection } from '../types'

export default function Quote({ section }: { section: QuoteSection }) {
  const parts = section.title?.split('|') ?? []

  return (
    <section className="quote" data-reveal="quote--active">
      <div className="quote__box">
        <p className="quote__description">
          {parts.map((part, index) => (
            <span key={index}>{part}</span>
          ))}
        </p>

        {section.list?.map((item, index) => {
          const asset = getAsset(item.asset)
          return (
            <figure key={index} className="quote__media">
              <img alt={asset.alt} className="quote__image" data-src={asset.url} height="100%" width="100%" />
            </figure>
          )
        })}
      </div>
    </section>
  )
}
