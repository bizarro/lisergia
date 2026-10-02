import { Component } from './Component.js'

function getURL(element: HTMLAnchorElement) {
  return new URL(element.href, window.location.href)
}

function isHTTP(url: URL) {
  return url.protocol === 'http:' || url.protocol === 'https:'
}

// Whether the link points to another page of this site that the application
// router can load, ignoring modifier keys (see `shouldHandleLinkClick`).
export function isRoutableLink(element: HTMLAnchorElement) {
  if (element.hasAttribute('download')) {
    return false
  }

  const target = element.getAttribute('target')

  if (target && target.toLowerCase() !== '_self') {
    return false
  }

  const url = getURL(element)
  const isLocal = isHTTP(url) && url.origin === window.location.origin
  const hasHashReference = element.getAttribute('href')?.includes('#') ?? false
  const isSameDocumentHash =
    hasHashReference && url.pathname === window.location.pathname && url.search === window.location.search

  return isLocal && !isSameDocumentHash
}

export function shouldHandleLinkClick(element: HTMLAnchorElement, event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return false
  }

  return isRoutableLink(element)
}

// External links open in a new tab, without access to this window.
export function prepareExternalLink(element: HTMLAnchorElement) {
  const url = getURL(element)

  if (!isHTTP(url) || url.origin === window.location.origin) {
    return
  }

  if (!element.hasAttribute('target')) {
    element.setAttribute('target', '_blank')
  }

  if (element.target === '_blank') {
    const rel = new Set(element.rel.split(/\s+/).filter(Boolean))

    rel.add('noopener')

    element.rel = Array.from(rel).join(' ')
  }
}

// Standalone link component. The application uses `Links`, which delegates a
// single listener for every link instead of creating one of these per anchor.
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

    this.fire('click', getURL(this.element).href)
  }

  shouldHandleClick(event: MouseEvent) {
    return shouldHandleLinkClick(this.element, event)
  }

  addEventListeners() {
    const url = getURL(this.element)
    const isLocal = isHTTP(url) && url.origin === window.location.origin

    if (isLocal) {
      this.element.onclick = this.onClick
    } else {
      prepareExternalLink(this.element)
    }
  }

  removeEventListeners() {
    if (this.element.onclick === this.onClick) {
      this.element.onclick = null
    }
  }
}
