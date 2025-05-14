import { SplitText } from '@lisergia/utilities'

import Animation from '../classes/Animation'

export default class extends Animation {
  declare element: HTMLElement
  declare elements: {
    paragraphs: NodeListOf<HTMLElement>
    lines: NodeListOf<HTMLElement>
    target: HTMLElement
  }

  constructor({ element }: { element: HTMLElement }) {
    const paragraphs = element.querySelectorAll('h1, h2, h3, h4, h5, h6, li, p')

    if (paragraphs.length) {
      paragraphs.forEach((element) => {
        SplitText.create(element, {
          type: 'lines',
        })

        SplitText.create(element, {
          type: 'lines',
        })
      })
    } else {
      SplitText.create(element, {
        type: 'lines',
      })

      SplitText.create(element, {
        type: 'lines',
      })
    }

    super({
      element,
      elements: {
        lines: element.querySelectorAll('div div'),
      },
    })
  }

  animateIn() {
    super.animateIn()

    this.elements.lines.forEach((element, lineIndex) => {
      element.style.transform = 'translateY(0) rotate(0)'
      element.style.transition = `transform 1.5s ${0.1 + lineIndex * 0.1}s var(--ease-out-expo)`
    })
  }

  animateOut() {
    super.animateOut()

    let rotation = 0

    this.elements.lines.forEach((element, lineIndex) => {
      rotation += 0.15

      element.style.transform = `translateY(150%) rotate(${rotation}deg)`
      element.style.transition = ''
    })
  }
}
