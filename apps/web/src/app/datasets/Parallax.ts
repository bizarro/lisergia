import { Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { DOMRectBounds, DOMUtils, MathUtils } from '@lisergia/utilities'
import { autorun } from 'mobx'

export default class extends Component {
  declare amount: number
  declare offset: DOMRectBounds

  declare element: HTMLElement
  declare elements: {
    media: HTMLImageElement | HTMLVideoElement
  }

  constructor({ element }: { element: HTMLElement }) {
    super({
      element,
      elements: {
        media: element.querySelector('img, video')!,
      },
    })

    Viewport.on('resize', this.onResize)

    autorun(this.onUpdate)
  }

  onResize() {
    this.amount = Viewport.isPhone ? 10 : 100
    this.offset = DOMUtils.getBounds(this.element)
  }

  onUpdate() {
    const scroll = this.application!.scroll
    const offset = scroll + innerHeight

    if (offset >= this.offset.top) {
      const parallax = MathUtils.map(
        this.offset.top - scroll,
        -this.offset.height,
        innerHeight,
        this.amount,
        -this.amount,
      )

      const scale = MathUtils.map(this.offset.top - scroll, -this.offset.height, innerHeight, 1, 1.2)

      this.elements.media.style.transform = `translate3d(0, ${parallax}px, 0) scale(${scale})`
    } else {
      this.elements.media.style.transform = `translate3d(0, -${this.amount}px, 0) scale(1.2)`
    }
  }
}
