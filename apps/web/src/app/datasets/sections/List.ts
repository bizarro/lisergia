import { ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { DOMUtils, MathUtils } from '@lisergia/utilities'

import { autorun, computed, makeObservable } from 'mobx'

export default class List extends Component {
  declare classes: {
    active: string
  }

  declare element: HTMLElement
  declare elements: {
    categories: HTMLElement
  }

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      classes: {
        active: 'list--active',
      },
      element,
      elements: {
        categories: '.categories',
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
    const { top } = this.bounds
    const { width } = Viewport

    if (scroll >= top + width * 0.5) {
      this.element.classList.add(this.classes.active)
    } else {
      this.element.classList.remove(this.classes.active)
    }

    const x = MathUtils.map(scroll, top, top + width, 0, -100, true)
    const y = MathUtils.map(scroll, top, top + width, 0, 100, true)

    this.elements.categories.style.setProperty('--x', `${x}%`)
    this.elements.categories.style.setProperty('--y', `${y}vw`)
  }
}
