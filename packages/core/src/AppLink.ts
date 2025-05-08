import { Component } from './Component'

export class AppLink extends Component {
  declare element: HTMLLinkElement & { redirect: Function }

  constructor({ element }: { element: HTMLAnchorElement }) {
    super({
      element,
    })

    this.element.redirect = this.onClick
  }

  onClick(event: MouseEvent) {
    event.preventDefault()

    this.fire('click', this.element.href)
  }

  addEventListeners() {
    const isLocal = this.element.href.includes(window.location.origin)
    const isLocalPrevented = this.element.dataset.linkOverride === ''
    const isNotEmail = !this.element.href.startsWith('mailto')
    const isNotPhone = !this.element.href.startsWith('tel')
    const isDownload = this.element.hasAttribute('download')
    const isAnchor = this.element.href.includes('#')

    if (isAnchor) {
      const hash = this.element.href.split('#')[1]
      const element = document.querySelector(`#${hash}`)

      if (element) {
        return
      }
    }

    if (isLocalPrevented || isDownload) {
      return
    }

    if (isLocal) {
      this.element.onclick = this.onClick
    } else if (isNotEmail && isNotPhone) {
      this.element.rel = 'noopener'
      this.element.target = '_blank'
    }
  }

  removeEventListeners() {
    this.element.onclick = null
  }
}
