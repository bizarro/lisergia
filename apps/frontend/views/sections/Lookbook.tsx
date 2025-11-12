import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface LookbookProps {
  list: {
    content: {
      entry: {
        type: 'image' | 'text'
        image?: SanityImageSource
        title?: any
      }
    }[]
  }[]
  getAsset: PageData['getAsset']
  parseHTML: PageData['parseHTML']
}

const Lookbook = ({ list, getAsset, parseHTML }: LookbookProps) => {
  return (
    <>
      {list.map((entry, index) => {
        const lookbookIndex = index + 1

        return (
          <article class={`lookbook-${lookbookIndex}`}>
            {entry.content.map((item) => {
              if (item.entry.type === 'image' && item.entry.image) {
                const asset = getAsset(item.entry.image)

                return (
                  <figure class={`lookbook-${lookbookIndex}__media`} data-parallax>
                    <img
                      alt={(asset as any)?.alt || ''}
                      class={`lookbook-${lookbookIndex}__media__image`}
                      data-src={asset.url}
                      height="100%"
                      width="100%"
                    />
                  </figure>
                )
              }

              if (item.entry.type === 'text' && item.entry.title) {
                return (
                  <div class={`lookbook-${lookbookIndex}__content`}>
                    <div class={`lookbook-${lookbookIndex}__content__text`} data-paragraph>
                      {parseHTML(item.entry.title)}
                    </div>
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

export default Lookbook
