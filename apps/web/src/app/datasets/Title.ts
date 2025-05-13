import { SplitText } from '@lisergia/utilities'

import Animation from '../classes/Animation'

export default class extends Animation {
  declare element: HTMLElement
  declare elements: {
    words: NodeListOf<HTMLElement>
    target: HTMLElement
  }

  constructor({ element }: { element: HTMLElement }) {
    SplitText.create(element, {
      type: 'words',
    })

    if (element.dataset.title == 'twice') {
      SplitText.create(element, {
        type: 'words',
      })
    }

    super({
      element,
      elements: {
        words: 'div div',
      },
    })

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

    this.elements.words.forEach((word, wordIndex) => {
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
    })
  }
}
