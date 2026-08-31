import { type ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { type DOMRectBounds, DOMUtils, MathUtils } from '@lisergia/utilities'

import { autorun, makeObservable, observable } from 'mobx'

export default class Media extends Component {
  declare element: HTMLElement
  declare elements: {
    mediaVideo: HTMLElement
  }
  bounds: DOMRectBounds
  resizeObserver: ResizeObserver

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        mediaVideo: '.media__video',
      },
    })

    this.bounds = DOMUtils.getBounds(this.element, application.scroll)

    makeObservable(this, {
      bounds: observable,
    })

    const disposeResize = Viewport.on('resize', this.onResize)

    if (disposeResize) {
      this.addDisposer(disposeResize)
    }

    this.resizeObserver = new ResizeObserver(this.onResize)
    this.resizeObserver.observe(this.element)

    const content = this.element.closest<HTMLElement>('.page__content')

    if (content) {
      this.resizeObserver.observe(content)
    }

    this.addDisposer(autorun(this.onUpdate))
  }

  onResize() {
    this.bounds = DOMUtils.getBounds(this.element, this.application!.scroll)
  }

  onUpdate() {
    const { scroll } = this.application!
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
