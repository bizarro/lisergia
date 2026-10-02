import { type ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { type DOMRectBounds, DOMUtils, MathUtils } from '@lisergia/utilities'

export default class Media extends Component {
  declare element: HTMLElement
  declare elements: {
    mediaVideo: HTMLElement
  }

  declare bounds: DOMRectBounds
  declare resizeObserver: ResizeObserver

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        mediaVideo: '.media__video',
      },
    })

    // Coalesced with every other resize source into one measure + write flush.
    this.resizeObserver = new ResizeObserver(() => {
      this.application!.onResize()
    })

    this.resizeObserver.observe(this.element)

    const content = this.element.closest<HTMLElement>('.page__content')

    if (content) {
      this.resizeObserver.observe(content)
    }

    this.onResize()
    this.onScroll(this.application!.scroll)
  }

  onResize() {
    this.bounds = DOMUtils.getBounds(this.element, this.application!.scroll)
  }

  onScroll(scroll: number) {
    const { height, top } = this.bounds

    const headerScale = MathUtils.map(scroll, top - Viewport.height, top + height, 1, 1.5, true)
    const headerY = MathUtils.clamp(scroll - top, -Viewport.height, height)

    this.elements.mediaVideo.style.transform = `translate3d(0, ${headerY}px, 0) scale(${headerScale})`
  }

  destroy() {
    this.resizeObserver.disconnect()

    super.destroy()
  }
}
