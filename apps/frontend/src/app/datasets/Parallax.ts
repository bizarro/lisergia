import { ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { DOMUtils, MathUtils } from '@lisergia/utilities'

import { autorun, computed, makeObservable } from 'mobx'

export default class Parallax extends Component {
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
    return Viewport.isPhone ? 10 : 100
  }

  get bounds() {
    return DOMUtils.getBounds(this.element)
  }

  onUpdate() {
    const { scroll } = this.application!
    const { top, height } = this.bounds

    const scale = MathUtils.map(top - scroll, -height, Viewport.height, 1, 1.2, true)
    const translateY = MathUtils.map(top - scroll, -height, Viewport.height, this.amount, -this.amount, true)

    this.elements.media.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
  }
}
