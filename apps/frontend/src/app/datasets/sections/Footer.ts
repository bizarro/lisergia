import { type ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { type DOMRectBounds, DOMUtils, MathUtils } from '@lisergia/utilities'

export default class Footer extends Component {
  declare element: HTMLElement
  declare elements: {
    content: HTMLElement
    box: HTMLElement
    footer: HTMLElement
  }

  declare bounds: DOMRectBounds
  declare boundsFooter: DOMRectBounds

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        content: '.page__content',
        footer: '.page__footer',
      },
    })

    this.onResize()
  }

  onResize() {
    const { scroll } = this.application!

    this.bounds = DOMUtils.getBounds(this.element, scroll)
    this.boundsFooter = DOMUtils.getBounds(this.elements.footer, scroll)

    this.elements.footer.style.setProperty('--height', `${this.bounds.height}px`)

    this.onScroll(scroll)
  }

  onScroll(scroll: number) {
    const { top } = this.boundsFooter

    const scale = MathUtils.map(scroll + Viewport.height, top, top + this.bounds.height, 1, 0.95, true)

    this.elements.content.style.transform = `scale(${scale})`
  }
}
