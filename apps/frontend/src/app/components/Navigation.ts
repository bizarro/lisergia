import { type ApplicationManager, Component } from '@lisergia/core'

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

    application.on('route', this.onChange)

    this.addDisposer(() => {
      application.off('route', this.onChange)
    })

    this.onChange()
  }

  onToggle() {
    if (document.documentElement.classList.contains(this.classes.open)) {
      document.documentElement.classList.remove(this.classes.open)

      window.posthog?.capture('navigation_menu_closed')
    } else {
      document.documentElement.classList.add(this.classes.open)

      window.posthog?.capture('navigation_menu_opened')
    }
  }

  onChange() {
    document.documentElement.classList.remove(this.classes.open)

    const { pathname } = new URL(this.application!.route, window.location.origin)

    this.elements.menuLinks.forEach((link) => {
      const linkPathname = new URL(link.href, window.location.origin).pathname
      const isActive = linkPathname === '/' ? pathname === '/' : pathname.startsWith(linkPathname)

      link.classList.toggle(this.classes.menuLinksActive, isActive)
    })
  }

  addEventListeners() {
    this.elements.button.addEventListener('click', this.onToggle, { passive: true })
  }

  removeEventListeners(): void {
    this.elements.button.removeEventListener('click', this.onToggle)
  }
}
