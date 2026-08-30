import { splitText, type TextSplitter } from 'animejs/text'

import Animation from '../classes/Animation'

const WORD_TEMPLATE = '<div data-word="{i}">{value}</div>'

export default class extends Animation {
  declare element: HTMLElement
  declare elements: {
    words: Array<HTMLElement>
    target: HTMLElement
  }

  declare split: TextSplitter

  constructor({ element }: { element: HTMLElement }) {
    const split = splitText(element, {
      words: WORD_TEMPLATE,
    })

    super({
      element,
      elements: {
        words: split.words,
      },
    })

    this.split = split

    const directions = element.dataset.title?.split(',') ?? []

    this.elements.words.forEach((word, index) => {
      word.dataset.direction = directions[index]
    })

    this.animateOut()
  }

  animateIn() {
    super.animateIn()

    this.elements.words.forEach((word, wordIndex) => {
      word.style.transform = 'translate(0, 0)'
      word.style.transition = `transform 1.5s ${wordIndex * 0.1}s var(--ease-out-expo)`
    })
  }

  animateOut() {
    super.animateOut()

    this.elements.words.forEach((word) => {
      const direction = word.dataset.direction

      if (direction === 'top') {
        word.style.transform = 'translateY(-120%)'
      } else if (direction === 'bottom') {
        word.style.transform = 'translateY(120%)'
      } else if (direction === 'left') {
        word.style.transform = 'translateX(-120%)'
      } else if (direction === 'right') {
        word.style.transform = 'translateX(120%)'
      }

      word.style.transition = ''
    })
  }

  destroy() {
    this.split.revert()

    super.destroy()
  }
}
