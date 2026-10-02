import type { ApplicationManager } from './App.js'
import { EventEmitter } from './EventEmitter.js'

export interface ComponentClasses {
  [key: string]: string
}

export interface ComponentElements {
  [key: string]: unknown[] | Element | Array<Element> | HTMLElement | Array<HTMLElement> | NodeList | Window | null
}

export type ComponentSelector = string | HTMLElement

export interface ComponentSelectors {
  [key: string]: string | Element | Array<Element> | HTMLElement | Array<HTMLElement> | NodeList | Window
}

export interface ComponentParameters {
  application?: ApplicationManager
  autoListeners?: boolean
  autoMount?: boolean
  classes?: ComponentClasses
  cullOffscreen?: boolean
  element?: ComponentSelector
  elements?: ComponentSelectors
  id?: string
}

//
// Visibility.
//
// One IntersectionObserver per scroll root, shared by every component inside it.
// The root is the current page (Lenis scrolls `.page`, which clips its children),
// so the margin can wake components up a bit before they enter the viewport and
// their first visible frame is already in sync with the scroll position.
//
interface VisibilityObserver {
  observer: IntersectionObserver
  targets: Map<Element, Set<Component>>
}

const visibilityObservers: Map<Element | null, VisibilityObserver> = new Map()

function getVisibilityObserver(root: Element | null) {
  let visibility = visibilityObservers.get(root)

  if (!visibility) {
    const targets: VisibilityObserver['targets'] = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          targets.get(entry.target)?.forEach((component) => {
            component.onVisibilityChange(entry.isIntersecting)
          })
        })
      },
      {
        root,
        rootMargin: '25% 0px',
      },
    )

    visibility = { observer, targets }

    visibilityObservers.set(root, visibility)
  }

  return visibility
}

export class Component extends EventEmitter {
  application?: ApplicationManager
  autoListeners: boolean
  autoMount: boolean
  classes?: ComponentClasses
  cullOffscreen: boolean
  disposers: Set<() => void> = new Set()
  selector?: ComponentSelector
  selectors?: ComponentSelectors

  id?: string

  element?: HTMLElement
  elements: ComponentElements = {}

  isInView: boolean = true

  constructor({
    application,
    autoListeners = true,
    autoMount = true,
    classes,
    cullOffscreen = true,
    element,
    elements,
    id,
  }: ComponentParameters) {
    super()

    this.application = application
    this.autoListeners = autoListeners
    this.autoMount = autoMount

    this.classes = classes
    this.cullOffscreen = cullOffscreen

    this.selector = element
    this.selectors = elements

    this.id = id

    if (this.autoMount) {
      this.create()
    }

    this.addApplicationListeners()

    if (this.autoListeners) {
      this.addEventListeners()
    }
  }

  //
  // Application.
  //
  // Only subscribe to the hooks a subclass actually overrides, so components
  // without scroll or resize logic cost nothing on every frame.
  //
  addApplicationListeners() {
    const application = this.application
    const prototype = Object.getPrototypeOf(this) as Component

    if (!application) {
      return
    }

    if (prototype.onScroll !== Component.prototype.onScroll) {
      application.on('scroll', this.onApplicationScroll)

      this.addDisposer(() => {
        application.off('scroll', this.onApplicationScroll)
      })

      this.observeVisibility()
    }

    if (prototype.onResize !== Component.prototype.onResize) {
      application.on('resize', this.onResize)

      this.addDisposer(() => {
        application.off('resize', this.onResize)
      })
    }
  }

  onApplicationScroll(scroll: number) {
    if (this.isInView) {
      this.onScroll(scroll)
    }
  }

  //
  // Visibility.
  //
  // Components start as visible until the observer reports otherwise. Subclasses
  // with their own loops (e.g. requestAnimationFrame) can call this and check
  // `isInView` to skip work while offscreen.
  //
  observeVisibility(element = this.element) {
    if (!this.cullOffscreen || !element) {
      return
    }

    // Fixed elements are always on screen, and never intersect the page root
    // because it isn't part of their containing block chain.
    if (getComputedStyle(element).position === 'fixed') {
      return
    }

    const page = this.application?.currentPage?.element
    const root = page?.contains(element) ? page : null
    const { observer, targets } = getVisibilityObserver(root)
    const components = targets.get(element) ?? new Set()

    if (!targets.has(element)) {
      targets.set(element, components)

      observer.observe(element)
    }

    components.add(this)

    this.addDisposer(() => {
      components.delete(this)

      if (components.size > 0) {
        return
      }

      targets.delete(element)
      observer.unobserve(element)

      if (targets.size === 0) {
        observer.disconnect()

        visibilityObservers.delete(root)
      }
    })
  }

  // Sync on both edges: entering catches up with scrolling done while culled,
  // leaving settles the final state after fast jumps (e.g. scrolling to top).
  onVisibilityChange(isInView: boolean) {
    this.isInView = isInView

    if (this.application) {
      this.onScroll(this.application.scroll)
    }
  }

  create() {
    if (this.selector) {
      this.initElement(this.selector)
    }

    if (this.selectors) {
      this.initElements(this.selectors)
    }
  }

  initElement(selector: ComponentSelector) {
    if (selector instanceof HTMLElement) {
      this.element = selector
    } else {
      this.element = document.querySelector(selector)!
    }
  }

  destroyElement() {
    this.element = undefined
  }

  initElements(selectors?: ComponentSelectors) {
    for (const key in selectors) {
      const selector = selectors[key]

      if (selector === window) {
        this.elements[key] = window
      } else if (selector instanceof HTMLElement) {
        this.elements[key] = selector
      } else if (selector instanceof NodeList) {
        this.elements[key] = selector
      } else if (Array.isArray(selector)) {
        this.elements[key] = selector
      } else {
        const elements = this.element!.querySelectorAll(selector as string)

        if (elements.length === 0) {
          const elements = document.querySelectorAll(selector as string)

          if (elements.length === 0) {
            this.elements[key] = null
          } else if (elements.length === 1) {
            this.elements[key] = elements[0] as HTMLElement
          } else {
            this.elements[key] = elements
          }
        } else if (elements.length === 1) {
          this.elements[key] = elements[0] as HTMLElement
        } else {
          this.elements[key] = elements
        }
      }
    }
  }

  destroyElements() {
    this.elements = {}
  }

  addDisposer(disposer: () => void) {
    this.disposers.add(disposer)

    return disposer
  }

  destroyDisposers() {
    this.disposers.forEach((dispose) => {
      dispose()
    })

    this.disposers.clear()
  }

  addEventListeners() {}

  removeEventListeners() {}

  //
  // Hooks.
  //
  // Called whenever the application page scrolls or resizes. Wired automatically
  // when the component receives an `application`; override in subclasses.
  //
  // `onScroll` only runs while the component is in view (see `cullOffscreen`).
  // `onResize` runs for every component and should only measure: the application
  // fires `scroll` right after `resize`, so all reads happen before any writes.
  //
  onResize() {}

  onScroll(_scroll: number) {}

  destroy() {
    this.destroyDisposers()

    super.destroy()

    this.removeEventListeners()

    this.destroyElements()
    this.destroyElement()
  }
}
