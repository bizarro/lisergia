import { Component, ComponentElements, ComponentSelector, ComponentSelectors } from '@lisergia/core'

export default class extends Component {
  declare delay: number
  declare elements: {
    target: HTMLElement
  }

  isVisible: boolean = false

  constructor({ element, elements }: { element: ComponentSelector; elements: ComponentSelectors }) {
    element = element as HTMLElement

    const { animationDelay, animationTarget } = element.dataset

    super({
      element,
      elements: {
        ...elements,
        target: animationTarget ? element.closest(animationTarget)! : element,
      },
    })

    this.delay = parseInt(animationDelay ?? '0')
  }

  declare observer: IntersectionObserver

  createObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!this.isVisible && entry.isIntersecting) {
            this.animateIn()
          } else {
            this.animateOut()
          }
        })
      },
      { rootMargin: '25%' },
    )

    this.observer.observe(this.elements.target)
  }

  animateIn() {
    this.isVisible = true
  }

  animateOut() {
    this.isVisible = false
  }

  addEventListeners() {
    this.createObserver()
  }

  removeEventListeners() {
    this.observer.unobserve(this.elements.target)
  }
}
