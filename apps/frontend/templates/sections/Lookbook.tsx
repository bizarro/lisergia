import { stegaClean } from '@sanity/client/stega'

import { getAsset, parseHTML } from '../helpers'
import type { LookbookSection } from '../types'

export default function Lookbook({ section }: { section: LookbookSection }) {
  return (
    <>
      {section.list?.map((entry, entryIndex) => {
        const n = entryIndex + 1
        return (
          <article key={entryIndex} className={`lookbook-${n}`}>
            {entry.content?.map((item, itemIndex) => {
              if (stegaClean(item.entry.type) === 'image' && item.entry.image) {
                const asset = getAsset(item.entry.image)
                return (
                  <figure key={itemIndex} className={`lookbook-${n}__media`} data-parallax>
                    <img
                      alt={asset.alt}
                      className={`lookbook-${n}__media__image`}
                      data-src={asset.url}
                      height="100%"
                      width="100%"
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
