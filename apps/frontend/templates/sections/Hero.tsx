import Button from '../components/Button'
import SanityImage from '../components/SanityImage'
import type { HeroSection } from '../types'

export default function Hero({ section, priority = false }: { section: HeroSection; priority?: boolean }) {
  return (
    <header className="hero">
      <div className="hero__box">
        <figure className="hero__media">
          <SanityImage
            className="hero__media__image"
            fallbackAlt={section.title}
            image={section.image}
            priority={priority}
          />
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
