import { getAsset } from '../helpers'
import type { HeaderSection } from '../types'

export default function SectionHeader({ section }: { section: HeaderSection }) {
  const asset = getAsset(section.image)

  return (
    <header className="header">
      <div className="header__box">
        <figure className="header__media">
          <img alt={asset.alt} className="header__media__image" data-src={asset.url} height="100%" width="100%" />
        </figure>

        <div className="header__content">
          <h1 className="header__title" data-reveal="header__title--active" data-title="left,top,left,bottom,right">
            {section.title}
          </h1>
        </div>
      </div>
    </header>
  )
}
