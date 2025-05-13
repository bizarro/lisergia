import { ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { DOMUtils, MathUtils } from '@lisergia/utilities'

import { autorun, computed, makeObservable } from 'mobx'

export default class Categories extends Component {
  declare element: HTMLElement
  declare elements: {
    gallery: HTMLElement
  }

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        gallery: '.categories__gallery',
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

    const x = MathUtils.map(scroll, top, top + height - Viewport.height, 0, -43.875, true)

    this.elements.gallery.style.setProperty('--x', `${x}%`)
  }
}
