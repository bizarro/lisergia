import SanityImage from '../components/SanityImage'
import type { HeaderSection } from '../types'

export default function SectionHeader({ section, priority = false }: { section: HeaderSection; priority?: boolean }) {
  return (
    <header className="header">
      <div className="header__box">
        <figure className="header__media">
          <SanityImage
            className="header__media__image"
            fallbackAlt={section.title}
            height="100%"
            image={section.image}
            priority={priority}
            width="100%"
          />
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
