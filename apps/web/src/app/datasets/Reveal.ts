import { Component } from '@lisergia/core'

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

  declare observer: IntersectionObserver

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn()
        } else {
          this.animateOut()
        }
      })
    })

    this.observer.observe(this.element)
  }

  destroyObserver() {
    this.observer.disconnect()
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
