import { Html } from "@elysiajs/html"

interface ButtonProps {
  class?: string
  text: string
  url: string
}

export const Button = ({ class: className, text, url }: ButtonProps) => {
  return (
    <a class={`button ${className}`} data-reveal="button--active" href={url}>
      <span class="button__background"></span>

      <span class="button__text">
        <span class="button__text__line" data-text={text}>
          {text}
        </span>
      </span>
    </a>
  )
}
