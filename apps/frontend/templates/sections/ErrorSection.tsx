import Button from '../components/Button'
import { getAsset } from '../helpers'
import type { ErrorSection as ErrorSectionData } from '../types'

export default function ErrorSection({ section }: { section: ErrorSectionData }) {
  const asset = getAsset(section.image)

  return (
    <header className="error">
      <figure className="error__media">
        <img alt={asset.alt} className="error__media__image" data-src={asset.url} height="100%" width="100%" />
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
