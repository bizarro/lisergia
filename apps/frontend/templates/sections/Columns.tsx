import { stegaClean } from '@sanity/client/stega'

import SanityImage from '../components/SanityImage'
import type { ColumnsSection } from '../types'

export default function Columns({ section, priority = false }: { section: ColumnsSection; priority?: boolean }) {
  return (
    <section className={`columns columns--${stegaClean(section.type) ?? ''}`}>
      <div className="columns__media">
        {section.list?.map((item, index) => (
          <figure key={index} className={`columns__media__image columns__media__image--${index + 1}`} data-parallax>
            <SanityImage
              className="columns__media__image"
              fallbackAlt={section.title}
              height="100%"
              image={item}
              priority={priority && index === 0}
              width="100%"
            />
          </figure>
        ))}
      </div>

      <div className="columns__content">
        <div className="columns__content__wrapper">
          <p className="columns__content__label" data-reveal="columns__content__label--active">
            {section.label}
          </p>

          <h2 className="columns__content__title" data-title="top,bottom">
            {section.title}
          </h2>

          <p className="columns__content__description" data-paragraph>
            {section.description}
          </p>
        </div>
      </div>
    </section>
  )
}
