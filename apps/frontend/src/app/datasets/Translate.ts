import { type ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { type DOMRectBounds, DOMUtils, MathUtils } from '@lisergia/utilities'

export default class Translate extends Component {
  declare element: HTMLElement
  declare elements: {
    media: HTMLElement
  }

  declare bounds: DOMRectBounds

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        media: element.firstElementChild as HTMLElement,
      },
    })

    this.onResize()
  }

  get amount() {
    return (Viewport.isPhone ? 10 : 100) * parseFloat(this.element.dataset.translate!)
  }

  onResize() {
    this.bounds = DOMUtils.getBounds(this.element, this.application!.scroll)

    this.onScroll(this.application!.scroll)
  }

  onScroll(scroll: number) {
    const { top, height } = this.bounds

    const parallax = MathUtils.map(top - scroll, -height, Viewport.height, this.amount, -this.amount)

    this.elements.media.style.transform = `translate3d(0, ${parallax}px, 0)`
  }
}
