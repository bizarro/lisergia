import { SplitText } from '@lisergia/utilities'
import Animation from '../classes/Animation'

export default class extends Animation {
  declare element: HTMLElement
  declare elements: {
    spans: NodeListOf<HTMLElement>
  }

  constructor({ element }: { element: HTMLElement }) {
    const splitText = new SplitText(element, {
      noBalance: true,
      type: 'words',
    })

    splitText.split()

    if (element.dataset.title == 'twice') {
      const splitText2 = new SplitText(element, {
        noBalance: true,
        type: 'words',
      })

      splitText2.split()
    }

    super({
      element,
      elements: {
        spans: '.word',
      },
    })

    const directions = element.dataset.title?.split(',') ?? []

    this.elements.spans.forEach((span, index) => {
      span.dataset.direction = directions[index]
    })

    this.animateOut()
  }

  animateIn() {
    super.animateIn()

    this.elements.spans.forEach((span, spanIndex) => {
      span.style.transform = 'translate(0, 0)'
      span.style.transition = `transform 1.5s ${spanIndex * 0.1}s var(--ease-out-expo)`
    })
  }

  animateOut() {
    super.animateOut()

    this.elements.spans.forEach((span, spanIndex) => {
      const direction = span.dataset.direction

      if (direction === 'top') {
        span.style.transform = 'translateY(-120%)'
      } else if (direction === 'bottom') {
        span.style.transform = 'translateY(120%)'
      } else if (direction === 'left') {
        span.style.transform = 'translateX(-120%)'
      } else if (direction === 'right') {
        span.style.transform = 'translateX(120%)'
      }
    })
  }
}
