import { type ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { type DOMRectBounds, DOMUtils, MathUtils } from '@lisergia/utilities'

export default class List extends Component {
  declare classes: {
    active: string
  }

  declare element: HTMLElement
  declare elements: {
    categories: HTMLElement
  }

  declare bounds: DOMRectBounds

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

    this.onResize()
  }

  onResize() {
    this.bounds = DOMUtils.getBounds(this.element, this.application!.scroll)

    this.onScroll(this.application!.scroll)
  }

  onScroll(scroll: number) {
    const { top } = this.bounds
    const { width } = Viewport

    if (scroll >= top + width * 0.6) {
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
