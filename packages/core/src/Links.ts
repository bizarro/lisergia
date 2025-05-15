import { reaction } from 'mobx'

import { ApplicationManager } from './App'
import { Link } from './Link'
import { EventEmitter } from './EventEmitter'

export class Links extends EventEmitter {
  declare application: ApplicationManager
  declare links: Array<Link>

  constructor(application: ApplicationManager) {
    super()

    this.application = application

    reaction(
      () => application.currentPage,
      () => this.refresh(),
      { fireImmediately: true },
    )
  }

  addEventListeners() {
    this.links?.forEach((link) => link.destroy())

    const links = document.querySelectorAll('a')

    this.links = Array.from(links).map((element) => {
      const link = new Link({
        element,
      })

      link.on('click', this.onLinkClick)

      return link
    })
  }

  onLinkClick(href: string) {
    this.application.route = href
  }

  refresh() {
    this.addEventListeners()
  }
}
