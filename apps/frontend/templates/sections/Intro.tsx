import SanityImage from '../components/SanityImage'
import type { IntroSection } from '../types'

export default function Intro({ section, priority = false }: { section: IntroSection; priority?: boolean }) {
  return (
    <header className="intro">
      <div className="intro__content">
        <p className="intro__label" data-reveal="intro__label--active">
          {section.label}
        </p>

        <h1 className="intro__title" data-title="left,top,bottom">
          {section.title}
        </h1>

        <p className="intro__description" data-paragraph>
          {section.description}
        </p>
      </div>

      <figure className="intro__media" data-parallax>
        <SanityImage
          className="intro__media__image"
          fallbackAlt={section.title}
          height="100%"
          image={section.image}
          priority={priority}
          width="100%"
        />
      </figure>
    </header>
  )
}
