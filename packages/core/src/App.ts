import { autorun, computed, IArrayDidChange, IValueDidChange, makeObservable, observable, observe } from 'mobx'

import { Component, ComponentParameters } from './Component'
import { Links } from './Links'
import { Page, PageParameters } from './Page'

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
  transition?: Component & { onTransition?: (args: any) => Promise<void> }

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

  onComponentChange(event: IArrayDidChange<Component>) {
    if (event.type === 'splice') {
      const { added, removed } = event
    }
  }

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
  declare links: Links

  initPage() {
    this.createPage()
    this.createLinks()
  }

  //
  // Links.
  //
  createLinks() {
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
  route: string = window.location.pathname

  onRouteChange({ oldValue, newValue }: IValueDidChange<string>) {
    this.onRouteChangeRequest({
      href: newValue,
      pushState: true,
    })
  }

  async onRouteChangeRequest({ href, pushState = true }: { href: string; pushState: boolean }) {
    const request = await window.fetch(href)
    const response = await request.text()

    this.onRequest({
      href,
      response,
      pushState,
    })
  }

  //
  // Request.
  //
  nextPage: {
    element?: Element
    template?: string
    title?: string
  } = {}

  async onRequest({ href, response, pushState }: { href: string; response: string; pushState: boolean }) {
    const domParser = new DOMParser()
    const dom = domParser.parseFromString(response, 'text/html')

    const html = dom.querySelector('html')!
    const app = dom.querySelector('.app')!

    this.nextPage = {
      element: app,
      template: html.dataset.template ?? this.template,
      title: dom.title ?? document.title,
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
  }

  //
  // Pop State.
  //
  onPopState() {
    this.onRouteChangeRequest({
      href: document.location.pathname,
      pushState: false,
    })
  }

  //
  // Scroll.
  //
  get scroll() {
    return this.currentPage?.scroll ?? 0
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
