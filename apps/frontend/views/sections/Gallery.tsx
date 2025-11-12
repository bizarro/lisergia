import { Html } from "@elysiajs/html"
import { SanityImageSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface GalleryProps {
  title: string
  list: SanityImageSource[]
  getAsset: PageData['getAsset']
}

const Gallery = ({ title, list, getAsset }: GalleryProps) => {
  const speeds = ['-1', '-0.25', '-1.5', '-1', '-1', '-0.25', '-0.5', '-0.35']

  return (
    <section class="gallery">
      <h2 class="gallery__title" data-title="top,bottom">{title}</h2>

      {list.map((item, index) => {
        const asset = getAsset(item)

        return (
          <div class={`gallery__media gallery__media--${index + 1}`} data-translate={speeds[index]}>
            <figure class="gallery__media__box">
              <img
                alt={asset?.alt || ''}
                class="gallery__media__image"
                data-src={asset.url}
                height="100%"
                width="100%"
              />
            </figure>
          </div>
        )
      })}
    </section>
  )
}

export default Gallery
