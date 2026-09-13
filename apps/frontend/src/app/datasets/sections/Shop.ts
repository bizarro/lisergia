import { type ApplicationManager, Component } from '@lisergia/core'
import { Viewport } from '@lisergia/managers'
import { type DOMRectBounds, DOMUtils } from '@lisergia/utilities'

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

    this.onResize()
  }

  onResize() {
    const { scroll } = this.application!

    this.elements.categories.forEach((category) => {
      category.bounds = DOMUtils.getBounds(category, scroll)
    })

    this.onScroll(scroll)
  }

  onScroll(scroll: number) {
    let index = 0

    this.elements.categories.forEach((category, categoryIndex) => {
      if (scroll + Viewport.height > category.bounds?.top) {
        index = categoryIndex
      }
    })

    this.elements.header.style.transform = `translateY(-${100 * index}%)`
  }
}
