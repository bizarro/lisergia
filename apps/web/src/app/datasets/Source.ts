import { Component } from '@lisergia/core'

export default class Source extends Component {
  declare classes: {}

  declare element: HTMLElement
  declare elements: {}

  constructor({ element }: { element: HTMLElement }) {
    super({
      classes: {},
      element,
      elements: {},
    })
  }

  declare observer: IntersectionObserver

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn()
        }
      })
    })

    this.observer.observe(this.element)
  }

  destroyObserver() {
    this.observer.unobserve(this.element)
    this.observer.disconnect()
  }

  animateIn() {
    this.element.setAttribute('src', this.element.dataset.src!)

    this.removeEventListeners()
  }

  animateOut() {}

  addEventListeners() {
    this.createObserver()
  }

  removeEventListeners() {
    this.destroyObserver()
  }
}
