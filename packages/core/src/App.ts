import { autorun, computed, IArrayDidChange, makeObservable, observable, observe } from 'mobx'

import { AppLinks } from './AppLinks'
import { Component, ComponentParameters } from './Component'
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

  id: string = document.documentElement.id ?? 'not-found'
  template: string = document.documentElement.dataset.template ?? '404'

  constructor() {
    super({
      autoListeners: false,
      element: '.app',
    })

    makeObservable(this, {
      canvas: observable,
      components: observable,
      element: observable,
      nextPage: observable,
      id: observable,
      page: observable,
      route: observable,
      template: observable,
      transition: observable,

      scroll: computed,
    })

    observe(this.components, this.onComponentChange)

    autorun(() => {
      const title = this.nextPage?.title

      if (title) {
        document.title = title
      }
    })

    autorun(() => {
      document.documentElement.id = this.id
    })

    autorun(() => {
      const template = this.nextPage?.template

      if (template) {
        document.documentElement.dataset.template = template

        this.template = template
      }
    })

    this.addEventListeners()
  }

  //
  // Components.
  //
  components: Array<Component> = []

  canvas?: Component
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
  initPage() {
    this.createLinks()
    this.createPage()
  }

  //
  // Links.
  //
  declare links: AppLinks

  createLinks() {
    this.links = new AppLinks()
    this.links.on('navigate', this.onNavigate)
  }

  //
  // Page.
  //
  page?: Page = undefined

  createPage(template = this.template) {
    const PageClass = this.pages.get(template)!

    const page = new PageClass({
      application: this,
      datasets: this.datasets,
    })

    this.page = page
    this.page.create()

    this.links.refresh()
  }

  destroyPage() {
    if (this.page) {
      this.page.destroy()
    }
  }

  //
  // Navigate.
  //
  route: string = window.location.pathname

  async onNavigate({ href, pushState = true }: { href: string; pushState: boolean }) {
    href = href.replace(window.location.origin, '')

    this.route = href

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
    id?: string
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
      id: html.id,
      template: html.dataset.template ?? this.template,
      title: dom.title ?? document.title,
    }

    if (this.transition) {
      await this.transition.onTransition?.(this)
    } else {
      this.element.removeChild(this.element.firstElementChild!)

      this.page!.destroy()

      this.element.appendChild(this.nextPage.element!.firstElementChild!)

      this.createPage(this.nextPage.template)

      this.id = this.nextPage.id!
    }

    if (pushState) {
      window.history.pushState({}, this.nextPage.title!, href)
    }
  }

  //
  // Pop State.
  //
  pathname: string = document.location.pathname

  onPopState() {
    if (document.location.pathname === this.pathname) {
      return
    }

    this.pathname = document.location.pathname

    this.onNavigate({
      href: window.location.href,
      pushState: false,
    })
  }

  //
  // Scroll.
  //
  get scroll() {
    return this.page?.scroll ?? 0
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
