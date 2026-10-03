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

  height?: number

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        content: '.page__content',
        footer: '.page__footer',
      },
    })

    // Measure now and write in the next resize flush, batched with every other
    // component, instead of forcing a layout per component while hydrating.
    this.onResize()
    this.application!.onResize()
  }

  onResize() {
    const { scroll } = this.application!

    this.bounds = DOMUtils.getBounds(this.element, scroll)
    this.boundsFooter = DOMUtils.getBounds(this.elements.footer, scroll)
  }

  // `onResize` only measures, so the spacer height is written here, and only
  // when it changes, since the footer is fixed and scrolls every frame.
  onScroll(scroll: number) {
    const { height } = this.bounds
    const { top } = this.boundsFooter

    if (this.height !== height) {
      this.height = height

      this.elements.footer.style.setProperty('--height', `${height}px`)
    }

    const scale = MathUtils.map(scroll + Viewport.height, top, top + height, 1, 0.95, true)

    // Only promote the page content to its own layer while it is scaling.
    this.elements.content.style.willChange = scale < 1 ? 'transform' : ''
    this.elements.content.style.transform = `scale(${scale})`
  }
}
