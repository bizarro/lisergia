import { ApplicationManager, Component } from '@lisergia/core'
import { autorun } from 'mobx'

export default class Navigation extends Component {
  declare classes: {
    active: string
    open: string
    menuLinksActive: string
  }

  declare element: HTMLElement
  declare elements: {
    button: HTMLElement
    menu: HTMLElement
    menuLinks: NodeListOf<HTMLAnchorElement>
  }

  constructor({ application }: { application: ApplicationManager }) {
    super({
      application,
      classes: {
        active: 'navigation--active',
        open: 'navigation--open',
        menuLinksActive: 'menu__list__link--active',
      },
      element: '.navigation',
      elements: {
        button: '.navigation__button',

        menu: '.menu',
        menuLinks: '.menu__list__link',
      },
    })

    autorun(this.onChange)
  }

  onToggle() {
    if (document.documentElement.classList.contains(this.classes.open)) {
      document.documentElement.classList.remove(this.classes.open)
    } else {
      document.documentElement.classList.add(this.classes.open)
    }
  }

  onChange() {
    document.documentElement.classList.remove(this.classes.open)

    this.elements.menuLinks.forEach((link) => {
      if (this.application!.route.indexOf(link.href) > -1) {
        link.classList.add(this.classes.menuLinksActive)
      } else {
        link.classList.remove(this.classes.menuLinksActive)
      }
    })
  }

  addEventListeners() {
    this.elements.button.addEventListener('click', this.onToggle, { passive: true })
  }

  removeEventListeners(): void {
    this.elements.button.removeEventListener('click', this.onToggle)
  }
}
