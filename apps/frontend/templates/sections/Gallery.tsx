import SanityImage from '../components/SanityImage'
import type { GallerySection } from '../types'

const speeds = ['-1', '-0.25', '-1.5', '-1', '-1', '-0.25', '-0.5', '-0.35']

export default function Gallery({ section, priority = false }: { section: GallerySection; priority?: boolean }) {
  return (
    <section className="gallery">
      <h2 className="gallery__title" data-title="top,bottom">
        {section.title}
      </h2>

      {section.list?.map((item, index) => (
        <div key={index} className={`gallery__media gallery__media--${index + 1}`} data-translate={speeds[index]}>
          <figure className="gallery__media__box">
            <SanityImage
              className="gallery__media__image"
              fallbackAlt={section.title}
              height="100%"
              image={item}
              priority={priority && index === 0}
              width="100%"
            />
          </figure>
        </div>
      ))}
    </section>
  )
}
