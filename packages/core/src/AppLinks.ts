import { AppLink } from './AppLink'
import { EventEmitter } from './EventEmitter'

export class AppLinks extends EventEmitter {
  declare links: Array<AppLink>

  addEventListeners() {
    this.links?.forEach((link) => link.destroy())

    const links = document.querySelectorAll('a')

    this.links = Array.from(links).map((element) => {
      const link = new AppLink({
        element,
      })

      link.on('click', this.onLinkClick)

      return link
    })
  }

  onLinkClick(href: string) {
    this.fire('navigate', { href })
  }

  refresh() {
    this.addEventListeners()
  }
}
