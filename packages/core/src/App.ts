import {
  autorun,
  computed,
  type IArrayDidChange,
  type IValueDidChange,
  makeObservable,
  observable,
  observe,
} from 'mobx'

import { Component, type ComponentParameters } from './Component.js'
import { Links } from './Links.js'
import type { Page, PageParameters } from './Page.js'

export interface ApplicationComponentData {
  component: new (params?: ComponentParameters) => Component
}

export interface ApplicationComponentDatasetData extends ApplicationComponentData {
  selector: string
}

export interface ApplicationRoute {
  component: new (params?: PageParameters) => Page
  template: string
}

export class ApplicationManager extends Component {
  declare element: HTMLElement

  template: string = document.documentElement.dataset.template ?? '404'

  constructor() {
    super({
      autoListeners: false,
      element: '.app',
    })

    makeObservable(this, {
      // Application DOM Element.
      element: observable,

      // Components.
      canvas: observable,
      components: observable,
      transition: observable,

      // Page Information.
      currentPage: observable,
      nextPage: observable,

      // Route Information.
      route: observable,
      routeHistory: observable,

      // Template Information.
      template: observable,

      // Page Scroll.
      scroll: computed,
    })

    observe(this.components, this.onComponentChange)
    observe(this, 'route', this.onRouteChange)

    autorun(this.onTitleUpdate)
    autorun(this.onTemplateUpdate)

    this.addEventListeners()
  }

  onTitleUpdate() {
    const title = this.nextPage?.title

    if (title) {
      document.title = title
    }
  }

  onTemplateUpdate() {
    const template = this.nextPage?.template

    if (template) {
      document.documentElement.dataset.template = template

      this.template = template
    }
  }

  //
  // Components.
  //
  canvas?: Component
  components: Array<Component> = []
  transition?: Component & { onTransition?: (application: ApplicationManager) => void | Promise<void> }

  initComponents(components: Array<ApplicationComponentData>) {
    const classes = components.map(
      ({ component: Component }) =>
        new Component({
          application: this,
        }),
    )

    this.canvas = classes.find((component) => component.id === 'canvas')
    this.transition = classes.find((component) => component.id === 'transition')

    classes.forEach((component) => {
      this.addComponent(component)
    })
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  removeComponent(component: Component) {
    component.destroy()

    const index = this.components.indexOf(component)

    if (index !== -1) {
      this.components.splice(index, 1)
    }
  }

  onComponentChange(_event: IArrayDidChange<Component>) {}

  //
  // Datasets.
  //
  datasets: Array<ApplicationComponentDatasetData> = []

  initDatasets(datasets: Array<ApplicationComponentDatasetData>) {
    this.datasets = datasets
  }

  //
  // Routes.
  //
  pages: Map<string, new (args: PageParameters) => Page> = new Map()

  initRoutes(routes: Array<ApplicationRoute>) {
    routes.forEach(({ component, template }) => {
      this.pages.set(template, component)
    })
  }

  //
  // Sprites.
  //
  async initSprites(url = '/bundle.svg') {
    const request = await window.fetch(url)
    const response = await request.text()

    const sprite = document.createElement('div')

    sprite.innerHTML = response

    sprite.style.left = '-999999px'
    sprite.style.opacity = '0'
    sprite.style.position = 'absolute'
    sprite.style.top = '0'

    document.body.appendChild(sprite)
  }

  //
  // Initialization.
  //
  IS_LINKS_ENABLED = true

  declare links: Links

  initPage() {
    this.createPage()
    this.createLinks()
  }

  //
  // Links.
  //
  createLinks() {
    if (!this.IS_LINKS_ENABLED) {
      return
    }

    this.links = new Links(this)
  }

  //
  // Page.
  //
  currentPage?: Page = undefined

  createPage(template = this.template) {
    const PageClass = this.pages.get(template)!

    const page = new PageClass({
      application: this,
      datasets: this.datasets,
    })

    this.currentPage = page
    this.currentPage.create()
  }

  destroyPage() {
    if (this.currentPage) {
      this.currentPage.destroy()
    }
  }

  //
  // Navigate.
  //
  route: string = `${window.location.pathname}${window.location.search}${window.location.hash}`
  routeHistory: Array<string> = [this.route]
  routeRequestEnabled: boolean = true
  routePushState: boolean = true

  onRouteChange({ newValue }: IValueDidChange<string>) {
    if (!this.routeRequestEnabled) {
      return
    }

    const url = new URL(newValue, window.location.href)

    if (url.origin !== window.location.origin) {
      window.location.assign(url.href)

      return
    }

    const href = `${url.pathname}${url.search}${url.hash}`

    void this.onRouteChangeRequest({
      href,
      pushState: this.routePushState,
    })
  }

  async onRouteChangeRequest({ href, pushState = true }: { href: string; pushState: boolean }) {
    try {
      const request = await window.fetch(href)

      if (request.redirected) {
        window.location.assign(request.url || href)

        return
      }

      const contentType = request.headers.get('content-type')

      if (contentType && !contentType.toLowerCase().includes('text/html')) {
        window.location.assign(href)

        return
      }

      const response = await request.text()

      await this.onRequest({
        href,
        response,
        pushState,
      })
    } catch {
      window.location.assign(href)
    }
  }

  //
  // Request.
  //
  nextPage: {
    element?: HTMLElement
    template?: string
    title?: string
  } = {}

  async onRequest({ href, response, pushState }: { href: string; response: string; pushState: boolean }) {
    const dom = new DOMParser().parseFromString(response, 'text/html')
    const html = dom.documentElement
    const app = dom.querySelector<HTMLElement>('.app')
    const page = app?.firstElementChild
    const template = html.dataset.template ?? this.template

    if (!app || !(page instanceof HTMLElement) || !this.pages.has(template)) {
      window.location.assign(href)

      return
    }

    this.nextPage = {
      element: app,
      template,
      title: dom.title || document.title,
    }

    if (this.transition) {
      await this.transition.onTransition?.(this)
    } else {
      this.currentPage!.element.remove()
      this.currentPage!.destroy()

      this.element.appendChild(this.nextPage.element!.firstElementChild!)

      this.createPage(this.nextPage.template)
    }

    if (pushState) {
      window.history.pushState({}, this.nextPage.title!, href)
    }

    this.routeHistory.push(href)
  }

  //
  // Pop State.
  //
  onPopState() {
    const route = `${document.location.pathname}${document.location.search}${document.location.hash}`
    const currentUrl = new URL(this.route, window.location.origin)
    const nextUrl = new URL(route, window.location.origin)

    if (currentUrl.pathname === nextUrl.pathname && currentUrl.search === nextUrl.search) {
      this.routeRequestEnabled = false
      this.route = route
      this.routeRequestEnabled = true

      return
    }

    this.routePushState = false
    this.route = route
    this.routePushState = true
  }

  //
  // Scroll.
  //
  get scroll() {
    return this.currentPage!.scroll ?? 0
  }

  //
  // Listeners.
  //
  addEventListeners() {
    window.addEventListener('popstate', this.onPopState)
  }

  removeEventListeners() {
    window.removeEventListener('popstate', this.onPopState)
  }
}

export const Application = new ApplicationManager()
