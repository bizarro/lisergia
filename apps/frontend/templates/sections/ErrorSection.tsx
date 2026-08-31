import Button from '../components/Button'
import SanityImage from '../components/SanityImage'
import type { ErrorSection as ErrorSectionData } from '../types'

export default function ErrorSection({ section, priority = false }: { section: ErrorSectionData; priority?: boolean }) {
  return (
    <header className="error">
      <figure className="error__media">
        <SanityImage
          className="error__media__image"
          fallbackAlt={section.title}
          image={section.image}
          priority={priority}
          sizes="720px"
        />
      </figure>

      <div className="error__wrapper">
        <div className="error__content">
          <h1 className="error__title">{section.title}</h1>

          <p className="error__description">{section.description}</p>

          <div className="error__button">
            <Button class="error__button__element" text={section.button?.text} url={section.button?.url} />
          </div>
        </div>
      </div>
    </header>
  )
}
