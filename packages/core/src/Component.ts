import { ApplicationManager } from './App'
import { EventEmitter } from './EventEmitter'

export interface ComponentClasses {
  [key: string]: string
}

export interface ComponentElements {
  [key: string]: Array<any> | Element | Array<Element> | HTMLElement | Array<HTMLElement> | NodeList | Window | null
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
  element?: ComponentSelector
  elements?: ComponentSelectors
  id?: string
}

export class Component extends EventEmitter {
  application?: ApplicationManager
  autoListeners: boolean
  autoMount: boolean
  classes?: ComponentClasses
  selector?: ComponentSelector
  selectors?: ComponentSelectors

  id?: string

  element?: HTMLElement
  elements: ComponentElements = {}

  constructor({
    application,
    autoListeners = true,
    autoMount = true,
    classes,
    element,
    elements,
    id,
  }: ComponentParameters) {
    super()

    this.application = application
    this.autoListeners = autoListeners
    this.autoMount = autoMount

    this.classes = classes

    this.selector = element
    this.selectors = elements

    this.id = id

    if (this.autoMount) {
      this.create()
    }

    if (this.autoListeners) {
      this.addEventListeners()
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

  addEventListeners() {}

  removeEventListeners() {}

  destroy() {
    super.destroy()

    this.removeEventListeners()
  }
}
