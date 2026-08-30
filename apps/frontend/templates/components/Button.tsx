import { stegaClean } from '@sanity/client/stega'

interface ButtonProps {
  class?: string
  text?: string
  url?: string
}

export default function Button({ class: className, text, url }: ButtonProps) {
  return (
    <a className={`button ${className ?? ''}`} data-reveal="button--active" href={stegaClean(url) ?? ''}>
      <span className="button__background"></span>

      <span className="button__text">
        <span className="button__text__line" data-text={stegaClean(text)}>
          {text}
        </span>
      </span>
    </a>
  )
}
