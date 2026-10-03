import { Component } from '@lisergia/core'

import { observeIntersection } from '../utilities/intersection'

export default class Reveal extends Component {
  declare classes: {
    active: string
  }

  declare element: HTMLElement

  constructor({ element }: { element: HTMLElement }) {
    super({
      classes: {
        active: element.dataset.reveal!,
      },
      element,
    })
  }

  declare unobserve?: () => void

  createObserver() {
    this.unobserve = observeIntersection(this.element, (isIntersecting) => {
      if (isIntersecting) {
        this.animateIn()
      } else {
        this.animateOut()
      }
    })
  }

  destroyObserver() {
    this.unobserve?.()
    this.unobserve = undefined
  }

  animateIn() {
    this.element.classList.add(this.classes.active)
  }

  animateOut() {
    this.element.classList.remove(this.classes.active)
  }

  addEventListeners() {
    this.createObserver()
  }

  removeEventListeners() {
    this.destroyObserver()
  }
}
