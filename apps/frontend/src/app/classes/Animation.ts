import { Component, type ComponentSelector, type ComponentSelectors } from '@lisergia/core'

import { observeIntersection } from '../utilities/intersection'

export default class extends Component {
  declare delay: number
  declare elements: {
    target: HTMLElement
  }

  isObserved: boolean = false
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

    this.delay = parseInt(animationDelay ?? '0', 10)
  }

  declare unobserve?: () => void

  // The first report sets the initial state, so targets that start offscreen
  // are hidden without measuring them right after their text is split.
  createObserver() {
    this.unobserve = observeIntersection(this.elements.target, (isIntersecting) => {
      const isFirst = !this.isObserved

      this.isObserved = true

      if (!this.isVisible && isIntersecting) {
        this.animateIn()
      } else if ((this.isVisible || isFirst) && !isIntersecting) {
        this.animateOut()
      }
    })
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
    this.unobserve?.()
    this.unobserve = undefined
  }
}
