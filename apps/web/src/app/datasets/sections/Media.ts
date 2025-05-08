import { ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { DOMUtils, MathUtils } from '@lisergia/utilities'

import { autorun, computed, makeObservable } from 'mobx'

export default class Hero extends Component {
  declare amount: number

  declare element: HTMLElement
  declare elements: {
    mediaVideo: HTMLElement
  }

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        mediaVideo: '.media__video',
      },
    })

    makeObservable(this, {
      offset: computed,
    })

    autorun(this.onUpdate)
  }

  get offset() {
    return DOMUtils.getBounds(this.element)
  }

  onUpdate() {
    const scroll = this.application!.scroll

    const { height, top } = this.offset

    const headerScale = MathUtils.map(scroll, top - Viewport.height, top + height, 1, 1.5, true)
    const headerY = scroll - top

    this.elements.mediaVideo.style.transform = `translate3d(0, ${headerY}px, 0) scale(${headerScale})`
  }
}
