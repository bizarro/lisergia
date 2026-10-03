import { Component } from '@lisergia/core'

import { observeIntersection } from '../utilities/intersection'

export default class Source extends Component {
  declare element: HTMLImageElement

  constructor({ element }: { element: HTMLElement }) {
    super({
      element,
    })
  }

  declare unobserve?: () => void

  // Starts loading a viewport ahead, so images are usually decoded by the time
  // they scroll in instead of fading in late.
  createObserver() {
    this.unobserve = observeIntersection(
      this.element,
      (isIntersecting) => {
        if (isIntersecting) {
          this.animateIn()
        }
      },
      { rootMargin: '100% 0px' },
    )
  }

  destroyObserver() {
    this.unobserve?.()
    this.unobserve = undefined
  }

  animateIn() {
    this.element.onload = () => {
      this.element.classList.add('loaded')
    }

    if (this.element.dataset.srcset) {
      this.element.setAttribute('srcset', this.element.dataset.srcset)
    }

    this.element.setAttribute('src', this.element.dataset.src!)

    this.removeEventListeners()
  }

  addEventListeners() {
    this.createObserver()
  }

  removeEventListeners() {
    this.destroyObserver()
  }
}
