import { stegaClean } from '@sanity/client/stega'

import { getAsset } from '../helpers'
import type { ColumnsSection } from '../types'

export default function Columns({ section }: { section: ColumnsSection }) {
  return (
    <section className={`columns columns--${stegaClean(section.type) ?? ''}`}>
      <div className="columns__media">
        {section.list?.map((item, index) => {
          const asset = getAsset(item.asset)
          return (
            <figure key={index} className={`columns__media__image columns__media__image--${index + 1}`} data-parallax>
              <img alt={asset.alt} className="columns__media__image" data-src={asset.url} height="100%" width="100%" />
            </figure>
          )
        })}
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
