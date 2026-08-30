import Button from '../components/Button'
import { getAsset } from '../helpers'
import type { HeroSection } from '../types'

export default function Hero({ section }: { section: HeroSection }) {
  const asset = getAsset(section.image)

  return (
    <header className="hero">
      <div className="hero__box">
        <figure className="hero__media">
          <img alt={asset.alt} className="hero__media__image" data-src={asset.url} height="100%" width="100%" />
        </figure>

        <div className="hero__content">
          <h1 className="hero__title">{section.title}</h1>

          <div className="hero__button">
            <Button class="hero__button__element" text={section.button?.text} url={section.button?.url} />
          </div>
        </div>
      </div>
    </header>
  )
}
