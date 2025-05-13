import { ApplicationManager, Component } from '@lisergia/core'
import { DOMUtils, MathUtils } from '@lisergia/utilities'

import { autorun, computed, makeObservable } from 'mobx'

export default class Hero extends Component {
  declare element: HTMLElement
  declare elements: {
    heroMedia: HTMLElement
  }

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        heroMedia: '.hero__media',
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

  onUpdate() {
    const { scroll } = this.application!
    const { height, top } = this.bounds

    const scale = MathUtils.map(scroll, top, top + height, 1, 1.5)
    const translateY = MathUtils.map(scroll, top, top + height, 0, 100)

    this.elements.heroMedia.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
  }
}
