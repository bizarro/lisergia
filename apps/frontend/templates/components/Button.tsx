import { stegaClean } from '@sanity/client/stega'

interface ButtonProps {
  animated?: boolean
  class?: string
  text?: string
  url?: string
}

export default function Button({ animated = true, class: className, text, url }: ButtonProps) {
  const classes = ['button', className, animated ? undefined : 'button--active'].filter(Boolean).join(' ')

  return (
    <a className={classes} data-reveal={animated ? 'button--active' : undefined} href={stegaClean(url) ?? ''}>
      <span className="button__background"></span>

      <span className="button__text">
        <span className="button__text__line" data-text={stegaClean(text)}>
          {text}
        </span>
      </span>
    </a>
  )
}
