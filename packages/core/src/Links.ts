import { reaction } from 'mobx'

import type { ApplicationManager } from './App.js'
import { EventEmitter } from './EventEmitter.js'
import { Link } from './Link.js'

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
    this.links?.forEach((link) => {
      link.destroy()
    })

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
    const url = new URL(href, window.location.href)

    this.application.route = `${url.pathname}${url.search}${url.hash}`
  }

  refresh() {
    this.addEventListeners()
  }
}
