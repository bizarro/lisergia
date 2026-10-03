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

    // Measure now and write in the next resize flush, batched with every other
    // component, instead of forcing a layout per component while hydrating.
    this.onResize()
    this.application!.onResize()
  }

  onResize() {
    this.bounds = DOMUtils.getBounds(this.element, this.application!.scroll)
  }

  onScroll(scroll: number) {
    const { height, top } = this.bounds

    const x = MathUtils.map(scroll, top, top + height - Viewport.height, 0, -49, true)

    this.elements.gallery.style.transform = `translate3d(${x}%, -50%, 0)`
  }
}
