import { SplitText } from '@lisergia/utilities'

import Animation from '../classes/Animation'

export default class extends Animation {
  declare element: HTMLElement
  declare elements: {
    paragraphs: NodeListOf<HTMLElement>
    lines: NodeListOf<HTMLElement>
  }

  constructor({ element }: { element: HTMLElement }) {
    const paragraphs = element.querySelectorAll('h1, h2, p')

    if (paragraphs.length) {
      paragraphs.forEach((element) => {
        const splitText = new SplitText(element as HTMLElement, {
          noBalance: true,
          type: 'lines',
        })

        splitText.split()

        const splitText2 = new SplitText(element as HTMLElement, {
          noBalance: true,
          type: 'lines',
        })

        splitText2.split()
      })
    } else {
      const splitText = new SplitText(element, {
        noBalance: true,
        type: 'lines',
      })

      splitText.split()

      const splitText2 = new SplitText(element, {
        noBalance: true,
        type: 'lines',
      })

      splitText2.split()
    }

    super({
      element,
      elements: {
        lines: element.querySelectorAll('.line .line'),
      },
    })
  }

  animateIn() {
    super.animateIn()

    this.elements.lines.forEach((element, lineIndex) => {
      element.style.transition = `transform 1.5s ${0.1 + lineIndex * 0.1}s var(--ease-out-expo)`
      element.style.transform = 'translateY(0) rotate(0)'
    })
  }

  animateOut() {
    super.animateOut()

    let rotation = 0

    this.elements.lines.forEach((element, lineIndex) => {
      rotation += 0.15

      element.style.transform = `translateY(110%) rotate(${rotation}deg)`
    })
  }
}
