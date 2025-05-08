import { ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { DOMRectBounds, DOMUtils, MathUtils } from '@lisergia/utilities'

import { autorun } from 'mobx'

export default class Translate extends Component {
  declare amount: number
  declare offset: DOMRectBounds

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

    Viewport.on('resize', this.onResize)

    autorun(this.onUpdate)
  }

  onResize() {
    this.amount = (Viewport.isPhone ? 10 : 100) * parseFloat(this.element.dataset.translate!)
    this.offset = DOMUtils.getBounds(this.element)
  }

  onUpdate() {
    const scroll = this.application!.scroll
    const offset = scroll + Viewport.height

    if (offset >= this.offset.top) {
      const parallax = MathUtils.map(
        this.offset.top - scroll,
        -this.offset.height,
        Viewport.height,
        this.amount,
        -this.amount,
      )

      this.elements.media.style.transform = `translate3d(0, ${parallax}px, 0)`
    } else {
      this.elements.media.style.transform = `translate3d(0, -${this.amount}px, 0)`
    }
  }
}
