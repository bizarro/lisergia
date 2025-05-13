import { ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { DOMRectBounds, DOMUtils, MathUtils } from '@lisergia/utilities'

import { autorun, computed, makeObservable } from 'mobx'

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

    autorun(this.onUpdate)

    Viewport.on('resize', this.onResize)
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
      if (scroll + Viewport.height > category.bounds.top) {
        index = categoryIndex
      }
    })

    this.elements.header.style.transform = `translateY(-${100 * index}%)`
  }
}
