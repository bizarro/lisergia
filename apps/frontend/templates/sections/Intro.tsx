import { getAsset } from '../helpers'
import type { IntroSection } from '../types'

export default function Intro({ section }: { section: IntroSection }) {
  const asset = getAsset(section.image)

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
        <img alt={asset.alt} className="intro__media__image" data-src={asset.url} height="100%" width="100%" />
      </figure>
    </header>
  )
}
