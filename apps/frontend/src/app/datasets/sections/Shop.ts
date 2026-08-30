import { type ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { type DOMRectBounds, DOMUtils } from '@lisergia/utilities'

import { autorun } from 'mobx'

export default class Shop extends Component {
  declare element: HTMLElement
  declare elements: {
    header: HTMLElement
    categories: NodeListOf<HTMLElement & { bounds: DOMRectBounds }>
  }

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      element,
      elements: {
        header: '.shop__header__titles__wrapper',
        categories: '.shop__category',
      },
    })

    const disposeResize = Viewport.on('resize', this.onResize)

    if (disposeResize) {
      this.addDisposer(disposeResize)
    }

    this.addDisposer(autorun(this.onUpdate))
  }

  onResize() {
    this.elements.categories.forEach((category) => {
      category.bounds = DOMUtils.getBounds(category)
    })
  }

  onUpdate() {
    const { scroll } = this.application!

    let index = 0

    this.elements.categories.forEach((category, categoryIndex) => {
      if (scroll + Viewport.height > category.bounds?.top) {
        index = categoryIndex
      }
    })

    this.elements.header.style.transform = `translateY(-${100 * index}%)`
  }
}
