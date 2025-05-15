import { ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { DOMUtils, MathUtils } from '@lisergia/utilities'

import { autorun, computed, makeObservable } from 'mobx'

export default class Seasons extends Component {
  declare element: HTMLElement
  declare elements: {
    highlight: HTMLElement
    media1: HTMLElement
    media2: HTMLElement
    media3: HTMLElement
    media4: HTMLElement
  }

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        highlight: '.seasons__highlight',
        media1: '.seasons__gallery__media--1',
        media2: '.seasons__gallery__media--2',
        media3: '.seasons__gallery__media--3',
        media4: '.seasons__gallery__media--4',
      },
    })

    makeObservable(this, {
      bounds: computed,
    })

    autorun(this.onUpdate)
  }

  get bounds() {
    return DOMUtils.getBounds(this.element)
  }

  scrollSpeed = 0
  scrollLast = 0

  onUpdate() {
    const { scroll } = this.application!
    const { height } = Viewport

    const scrollOffset = scroll - this.bounds.top

    const skewX = MathUtils.clamp(-10, 10, this.scrollSpeed)
    const translateX = MathUtils.map(scrollOffset, 0, height * 3, 11, 88)

    this.elements.highlight.style.transform = `translateX(-${translateX}%) skewX(${skewX}deg)`

    this.elements.media1.style.opacity = `${MathUtils.map(scrollOffset, 0, height, 1, 0, true)}`
    this.elements.media1.style.transform = `scale(${MathUtils.map(scrollOffset, 0, height, 1, 1.5, true)})`

    this.elements.media2.style.opacity = `${MathUtils.map(scrollOffset, height, height * 2, 1, 0)}`
    this.elements.media2.style.transform = `scale(${MathUtils.map(scrollOffset, height, height * 2, 1, 1.5, true)})`

    this.elements.media3.style.opacity = `${MathUtils.map(scrollOffset, height * 2, height * 3, 1, 0)}`
    this.elements.media3.style.transform = `scale(${MathUtils.map(scrollOffset, height * 2, height * 3, 1, 1.5, true)})`

    this.scrollSpeed = scroll - this.scrollLast
    this.scrollLast = scroll
  }
}
