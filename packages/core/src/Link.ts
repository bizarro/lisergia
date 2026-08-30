import { Component } from './Component.js'

export class Link extends Component {
  declare element: HTMLAnchorElement

  constructor({ element }: { element: HTMLAnchorElement }) {
    super({ element })
  }

  onClick(event: MouseEvent) {
    if (!this.shouldHandleClick(event)) {
      return
    }

    event.preventDefault()

    this.fire('click', new URL(this.element.href, window.location.href).href)
  }

  shouldHandleClick(event: MouseEvent) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      this.element.hasAttribute('data-link-override') ||
      this.element.hasAttribute('download')
    ) {
      return false
    }

    const target = this.element.getAttribute('target')

    if (target && target.toLowerCase() !== '_self') {
      return false
    }

    const url = new URL(this.element.href, window.location.href)
    const isHttp = url.protocol === 'http:' || url.protocol === 'https:'
    const isLocal = isHttp && url.origin === window.location.origin
    const hasHashReference = this.element.getAttribute('href')?.includes('#') ?? false
    const isSameDocumentHash =
      hasHashReference && url.pathname === window.location.pathname && url.search === window.location.search

    return isLocal && !isSameDocumentHash
  }

  addEventListeners() {
    const url = new URL(this.element.href, window.location.href)
    const isHttp = url.protocol === 'http:' || url.protocol === 'https:'
    const isLocal = isHttp && url.origin === window.location.origin

    if (isLocal) {
      this.element.addEventListener('click', this.onClick)
    } else if (isHttp) {
      if (!this.element.hasAttribute('target')) {
        this.element.setAttribute('target', '_blank')
      }

      if (this.element.target === '_blank') {
        const rel = new Set(this.element.rel.split(/\s+/).filter(Boolean))

        rel.add('noopener')
        this.element.rel = Array.from(rel).join(' ')
      }
    }
  }

  removeEventListeners() {
    this.element.removeEventListener('click', this.onClick)
  }
}
