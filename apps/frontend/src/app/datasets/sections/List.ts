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

    // Measure now and write in the next resize flush, batched with every other
    // component, instead of forcing a layout per component while hydrating.
    this.onResize()
    this.application!.onResize()
  }

  onResize() {
    this.bounds = DOMUtils.getBounds(this.element, this.application!.scroll)
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

    // Written as a transform instead of custom properties, which inherit and
    // would restyle every descendant of the section on each frame.
    this.elements.categories.style.transform = `translate(${x}%, ${y}vw)`
  }
}
