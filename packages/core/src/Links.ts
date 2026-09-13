import type { ApplicationManager } from './App.js'
import { EventEmitter } from './EventEmitter.js'
import { Link } from './Link.js'

export class Links extends EventEmitter {
  declare application: ApplicationManager
  declare links: Array<Link>

  constructor(application: ApplicationManager) {
    super()

    this.application = application
    this.application.on('page', this.refresh)

    this.refresh()
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
    this.application.navigate(href)
  }

  refresh() {
    this.addEventListeners()
  }

  destroy() {
    this.application.off('page', this.refresh)

    this.links?.forEach((link) => {
      link.destroy()
    })

    super.destroy()
  }
}
