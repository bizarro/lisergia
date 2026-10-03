import { type ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { type DOMRectBounds, DOMUtils, MathUtils } from '@lisergia/utilities'

export default class Media extends Component {
  declare element: HTMLElement
  declare elements: {
    mediaVideo: HTMLVideoElement
  }

  declare bounds: DOMRectBounds

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        mediaVideo: '.media__video',
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

    const headerScale = MathUtils.map(scroll, top - Viewport.height, top + height, 1, 1.5, true)
    const headerY = MathUtils.clamp(scroll - top, -Viewport.height, height)

    this.elements.mediaVideo.style.transform = `translate3d(0, ${headerY}px, 0) scale(${headerScale})`
  }

  // Stop decoding the video while it is offscreen.
  onVisibilityChange(isInView: boolean) {
    const video = this.elements.mediaVideo

    if (isInView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }

    super.onVisibilityChange(isInView)
  }
}
