import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis, { LenisOptions } from 'lenis'
import { makeObservable, observable } from 'mobx'

import { ApplicationManager } from './App'
import { Component, ComponentClasses, ComponentSelectors } from './Component'

export interface PageParameters {
  application: ApplicationManager
  classes?: ComponentClasses
  datasets: Array<{ component: typeof Component; selector: string }>
  element: HTMLElement
  elements: ComponentSelectors
  scrollEnabled: boolean
  scrollOptions?: LenisOptions
}

export class Page extends Component {
  declare element: HTMLElement
  declare elements: {
    wrapper: HTMLElement
  }

  declare application: ApplicationManager

  datasets: Array<{
    component: typeof Component
    selector: string
  }> = []

  scroll: number = 0
  scrollEnabled: boolean = true
  scrollOptions: LenisOptions = {}

  constructor({
    application,
    classes,
    datasets,
    element,
    elements,
    scrollEnabled = true,
    scrollOptions = {},
  }: PageParameters) {
    super({
      autoMount: false,
      autoListeners: false,
      classes,
      element,
      elements,
    })

    this.scrollOptions = scrollOptions

    this.application = application
    this.datasets = datasets

    this.scrollEnabled = scrollEnabled

    makeObservable(this, {
      components: observable,
      lenis: observable,
      scroll: observable,
    })
  }

  create() {
    super.create()

    this.createResizeObserver()
    this.createComponents()
    this.createScroll()

    this.addEventListeners()
  }

  //
  // Observer.
  //
  resizeObserver: ResizeObserver

  createResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.onResize()
    })

    this.resizeObserver.observe(this.elements.wrapper)
  }

  destroyResizeObserver() {
    this.resizeObserver.disconnect()
  }

  //
  // Components.
  //
  components: Set<Component> = new Set()

  createComponents() {
    this.datasets.map(({ component: Component, selector }) => {
      const elements = this.element.querySelectorAll(selector)

      const components = Array.from(elements).map((element) => {
        const component = new Component({
          application: this.application,
          element: element as HTMLElement,
        })

        return component
      })

      components.forEach((component) => {
        this.application.addComponent(component)

        this.components.add(component)
      })
    })
  }

  destroyComponents() {
    this.components.forEach((component) => {
      this.application.removeComponent(component)
    })

    this.components.clear()
  }

  //
  // Scroll.
  //
  lenis: Lenis

  createScroll() {
    if (!this.scrollEnabled) {
      this.element.addEventListener('scroll', this.onScrollFallback)

      return
    }

    this.lenis = new Lenis({
      content: this.elements.wrapper as HTMLElement,
      wrapper: this.element,
      ...this.scrollOptions,
    })

    this.lenis.on('scroll', ScrollTrigger.update)
    this.lenis.on('scroll', (event) => this.emitter.emit('scroll', event))
  }

  destroyScroll() {
    if (!this.scrollEnabled) {
      this.element.removeEventListener('scroll', this.onScrollFallback)

      return
    }

    this.lenis?.destroy()
  }

  //
  // Events.
  //
  onResize() {
    ScrollTrigger.refresh()

    this.lenis?.resize()
  }

  onRAF(time: number) {
    this.lenis?.raf(time)
  }

  onScroll(scroll: number) {
    this.scroll = scroll
  }

  onScrollFallback() {
    this.scroll = this.element.scrollTop

    this.emitter.emit('scroll', { scroll: this.scroll })
  }

  //
  // Destroy.
  //
  destroy() {
    super.destroy()

    this.destroyResizeObserver()
    this.destroyComponents()
    this.destroyScroll()
  }
}
