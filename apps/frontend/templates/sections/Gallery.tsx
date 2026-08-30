import { getAsset } from '../helpers'
import type { GallerySection } from '../types'

const speeds = ['-1', '-0.25', '-1.5', '-1', '-1', '-0.25', '-0.5', '-0.35']

export default function Gallery({ section }: { section: GallerySection }) {
  return (
    <section className="gallery">
      <h2 className="gallery__title" data-title="top,bottom">
        {section.title}
      </h2>

      {section.list?.map((item, index) => {
        const asset = getAsset(item.asset)
        return (
          <div key={index} className={`gallery__media gallery__media--${index + 1}`} data-translate={speeds[index]}>
            <figure className="gallery__media__box">
              <img alt={asset.alt} className="gallery__media__image" data-src={asset.url} height="100%" width="100%" />
            </figure>
          </div>
        )
      })}
    </section>
  )
}
