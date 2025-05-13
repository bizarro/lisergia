import { ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { DOMUtils, MathUtils } from '@lisergia/utilities'

import { autorun, computed, makeObservable } from 'mobx'

export default class Translate extends Component {
  declare element: HTMLElement
  declare elements: {
    media: HTMLElement
  }

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        media: element.firstElementChild as HTMLElement,
      },
    })

    makeObservable(this, {
      amount: computed,
      bounds: computed,
    })

    autorun(this.onUpdate)
  }

  get amount() {
    return (Viewport.isPhone ? 10 : 100) * parseFloat(this.element.dataset.translate!)
  }

  get bounds() {
    return DOMUtils.getBounds(this.element)
  }

  onUpdate() {
    const { scroll } = this.application!
    const { top, height } = this.bounds

    const parallax = MathUtils.map(top - scroll, -height, Viewport.height, this.amount, -this.amount)

    this.elements.media.style.transform = `translate3d(0, ${parallax}px, 0)`
  }
}
