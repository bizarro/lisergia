import { ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { DOMUtils, MathUtils } from '@lisergia/utilities'

import { autorun, computed, makeObservable } from 'mobx'

export default class Footer extends Component {
  declare element: HTMLElement
  declare elements: {
    content: HTMLElement
    box: HTMLElement
    footer: HTMLElement
  }

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        content: '.page__content',
        footer: '.page__footer',
      },
    })

    makeObservable(this, {
      bounds: computed,
      boundsFooter: computed,
    })

    autorun(this.onUpdate)
  }

  get bounds() {
    return DOMUtils.getBounds(this.element)
  }

  get boundsFooter() {
    return DOMUtils.getBounds(this.elements.footer)
  }

  onUpdate() {
    const { scroll } = this.application!
    const { top } = this.boundsFooter

    this.elements.footer.style.setProperty('--height', `${this.bounds.height}px`)

    const scale = MathUtils.map(scroll + Viewport.height, top, top + this.bounds.height, 1, 0.95, true)

    this.elements.content.style.transform = `scale(${scale})`
  }
}
