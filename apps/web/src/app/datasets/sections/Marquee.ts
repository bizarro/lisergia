import { ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { DOMUtils, MathUtils } from '@lisergia/utilities'

import Tempus from 'tempus'

export default class extends Component {
  declare element: HTMLElement
  declare elements: {
    list: HTMLElement
    items: NodeListOf<
      HTMLElement & {
        extra: number
        width: number
        offset: number
        position: number
        isBefore: boolean
        isAfter: boolean
        clamp: number
      }
    >
  }

  declare length: number
  declare widthTotal: number

  multiplier = 1
  scroll = {
    clamp: 0,
    current: 0,
    ease: 0.1,
    last: 0,
    position: 0,
    target: 0,
  }

  declare unsubscribeRaf: (() => void) | undefined

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        list: '.marquee__wrapper',
        items: 'span',
      },
    })

    this.widthTotal = this.elements.list.getBoundingClientRect().width

    this.reset()

    Viewport.on('resize', this.onResize)

    this.unsubscribeRaf = Tempus.add(this.onUpdate)
  }

  transform(element: HTMLElement, x: number) {
    element.style.transform = `translate3d(${Math.floor(x)}px, 0, 0)`
  }

  declare direction: 'up' | 'down'

  onUpdate() {
    this.scroll.target += this.multiplier
    this.scroll.current = MathUtils.lerp(this.scroll.current, this.scroll.target, this.scroll.ease)

    const scrollClamp = Math.round(this.scroll.current % this.widthTotal)

    if (this.scroll.current < this.scroll.last) {
      this.direction = 'down'
    } else {
      this.direction = 'up'
    }

    this.elements.items.forEach((element, index) => {
      element.position = -this.scroll.current - element.extra

      const bounds = element.position + element.offset + element.width

      element.isBefore = bounds < 0
      element.isAfter = bounds > this.widthTotal

      if (this.direction === 'up' && element.isBefore) {
        element.extra = element.extra - this.widthTotal

        element.isBefore = false
        element.isAfter = false
      }

      if (this.direction === 'down' && element.isAfter) {
        element.extra = element.extra + this.widthTotal

        element.isBefore = false
        element.isAfter = false
      }

      element.clamp = element.extra % scrollClamp

      this.transform(element, element.position)
    })

    this.scroll.last = this.scroll.current
    this.scroll.clamp = scrollClamp
  }

  onResize() {
    this.widthTotal = this.elements.list.getBoundingClientRect().width

    this.reset()

    this.scroll = {
      clamp: 0,
      current: 0,
      ease: 0.1,
      last: 0,
      position: 0,
      target: 0,
    }
  }

  reset() {
    this.elements.items.forEach((element) => {
      this.transform(element, 0)

      const bounds = DOMUtils.getBounds(element)

      element.extra = 0
      element.offset = bounds.left
      element.position = 0
      element.width = bounds.width
    })
  }

  destroy() {
    super.destroy()

    Viewport.off('resize', this.onResize)

    this.unsubscribeRaf?.()
    this.unsubscribeRaf = undefined
  }
}
