import type { ApplicationManager } from './App.js'
import { EventEmitter } from './EventEmitter.js'
import { isRoutableLink, prepareExternalLink, shouldHandleLinkClick } from './Link.js'

function getAnchor(event: Event) {
  const target = event.target

  if (!(target instanceof Element)) {
    return null
  }

  const anchor = target.closest('a[href]')

  return anchor instanceof HTMLAnchorElement ? anchor : null
}

// Handles every link through delegated listeners on the document, so links added
// later (e.g. by a new page) work without creating a component per anchor.
export class Links extends EventEmitter {
  declare application: ApplicationManager

  constructor(application: ApplicationManager) {
    super()

    this.application = application
    this.application.on('page', this.refresh)

    this.addEventListeners()

    this.refresh()
  }

  onClick(event: MouseEvent) {
    const anchor = getAnchor(event)

    if (!anchor || !shouldHandleLinkClick(anchor, event)) {
      return
    }

    event.preventDefault()

    this.application.navigate(anchor.href)
  }

  // Hover, touch and keyboard focus are early signals of a click.
  onIntent(event: Event) {
    const anchor = getAnchor(event)

    if (!anchor || !isRoutableLink(anchor)) {
      return
    }

    this.application.prefetch(anchor.href)
  }

  refresh() {
    document.querySelectorAll('a[href]').forEach((element) => {
      if (element instanceof HTMLAnchorElement) {
        prepareExternalLink(element)
      }
    })
  }

  addEventListeners() {
    document.addEventListener('click', this.onClick)
    document.addEventListener('focusin', this.onIntent)
    document.addEventListener('pointerover', this.onIntent, { passive: true })
    document.addEventListener('touchstart', this.onIntent, { passive: true })
  }

  removeEventListeners() {
    document.removeEventListener('click', this.onClick)
    document.removeEventListener('focusin', this.onIntent)
    document.removeEventListener('pointerover', this.onIntent)
    document.removeEventListener('touchstart', this.onIntent)
  }

  destroy() {
    this.application.off('page', this.refresh)

    this.removeEventListeners()

    super.destroy()
  }
}
