import { type ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { type DOMRectBounds, DOMUtils, MathUtils } from '@lisergia/utilities'

export default class Categories extends Component {
  declare element: HTMLElement
  declare elements: {
    gallery: HTMLElement
  }

  declare bounds: DOMRectBounds

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        gallery: '.categories__gallery',
      },
    })

    this.onResize()
  }

  onResize() {
    this.bounds = DOMUtils.getBounds(this.element, this.application!.scroll)

    this.onScroll(this.application!.scroll)
  }

  onScroll(scroll: number) {
    const { height, top } = this.bounds

    const x = MathUtils.map(scroll, top, top + height - Viewport.height, 0, -49, true)

    this.elements.gallery.style.setProperty('--x', `${x}%`)
  }
}
