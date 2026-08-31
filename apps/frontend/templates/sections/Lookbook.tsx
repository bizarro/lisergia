import { stegaClean } from '@sanity/client/stega'

import SanityImage from '../components/SanityImage'
import { parseHTML } from '../helpers'
import type { LookbookSection } from '../types'

export default function Lookbook({ section, priority = false }: { section: LookbookSection; priority?: boolean }) {
  const imageSizes = [
    '(max-width: 767px) 100vw, 50vw',
    '100vw',
    '(max-width: 767px) 100vw, 41vw',
    '(max-width: 767px) 100vw, 30vw',
    '100vw',
    '(max-width: 767px) 100vw, 66vw',
  ]

  return (
    <>
      {section.list?.map((entry, entryIndex) => {
        const n = entryIndex + 1
        return (
          <article key={entryIndex} className={`lookbook-${n}`}>
            {entry.content?.map((item, itemIndex) => {
              if (stegaClean(item.entry.type) === 'image' && item.entry.image) {
                return (
                  <figure key={itemIndex} className={`lookbook-${n}__media`} data-parallax>
                    <SanityImage
                      className={`lookbook-${n}__media__image`}
                      image={item.entry.image}
                      priority={priority && entryIndex === 0 && itemIndex === 0}
                      sizes={imageSizes[entryIndex] ?? '100vw'}
                    />
                  </figure>
                )
              }

              if (stegaClean(item.entry.type) === 'text') {
                return (
                  <div key={itemIndex} className={`lookbook-${n}__content`}>
                    <div
                      className={`lookbook-${n}__content__text`}
                      data-paragraph
                      dangerouslySetInnerHTML={{ __html: parseHTML(item.entry.title) }}
                    />
                  </div>
                )
              }

              return null
            })}
          </article>
        )
      })}
    </>
  )
}
