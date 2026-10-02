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

export interface ApplicationResponse {
  contentType: string | null
  redirected: boolean
  text: string
  url: string
}

function getRequestKey(href: string) {
  const url = new URL(href, window.location.href)

  return `${url.pathname}${url.search}`
}

function isHTML(contentType: string | null) {
  return !contentType || contentType.toLowerCase().includes('text/html')
}

export class ApplicationManager extends Component {
  declare element: HTMLElement

  template: string = document.documentElement.dataset.template ?? '404'

  constructor() {
    super({
      autoListeners: false,
      element: '.app',
    })

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

    this.fire('page', page)
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

  setRoute(route: string) {
    if (route === this.route) {
      return false
    }

    this.route = route

    this.fire('route', route)

    return true
  }

  navigate(href: string, { pushState = true }: { pushState?: boolean } = {}) {
    const url = new URL(href, window.location.href)

    if (url.origin !== window.location.origin) {
      window.location.assign(url.href)

      return
    }

    const route = `${url.pathname}${url.search}${url.hash}`

    if (!this.setRoute(route)) {
      return
    }

    void this.onRouteChangeRequest({
      href: route,
      pushState,
    })
  }

  async onRouteChangeRequest({ href, pushState = true }: { href: string; pushState: boolean }) {
    try {
      const request = await this.request(href)

      if (request.redirected) {
        window.location.assign(request.url || href)

        return
      }

      if (!isHTML(request.contentType)) {
        window.location.assign(href)

        return
      }

      await this.onRequest({
        href,
        response: request.text,
        pushState,
      })
    } catch {
      window.location.assign(href)
    }
  }

  //
  // Prefetch.
  //
  // Responses are cached per path for the whole session, so hovering a link
  // warms up the navigation and going back to a visited page skips the network.
  // Disable (e.g. in preview mode) when pages can change between requests.
  //
  IS_PREFETCH_ENABLED = true

  requests: Map<string, Promise<ApplicationResponse>> = new Map()

  get isPrefetchEnabled() {
    const { connection } = window.navigator as Navigator & { connection?: { saveData?: boolean } }

    return this.IS_PREFETCH_ENABLED && !connection?.saveData
  }

  request(href: string) {
    const key = getRequestKey(href)
    const cached = this.requests.get(key)

    if (cached) {
      return cached
    }

    const request = window.fetch(href).then(async (response) => {
      const contentType = response.headers.get('content-type')

      return {
        contentType,
        redirected: response.redirected,
        // Skip reading non-HTML bodies (e.g. files), they are opened natively.
        text: isHTML(contentType) ? await response.text() : '',
        url: response.url,
      }
    })

    if (this.isPrefetchEnabled) {
      this.requests.set(key, request)

      request.catch(() => {
        this.requests.delete(key)
      })
    }

    return request
  }

  prefetch(href: string) {
    if (!this.isPrefetchEnabled) {
      return
    }

    const url = new URL(href, window.location.href)

    if (url.origin !== window.location.origin || getRequestKey(url.href) === getRequestKey(this.route)) {
      return
    }

    this.request(url.href).catch(() => {})
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

    this.onTitleUpdate()
    this.onTemplateUpdate()

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

    // Hash-only change: update the route without requesting a new page.
    if (currentUrl.pathname === nextUrl.pathname && currentUrl.search === nextUrl.search) {
      this.setRoute(route)

      return
    }

    this.navigate(route, { pushState: false })
  }

  //
  // Scroll.
  //
  get scroll() {
    return this.currentPage?.scroll ?? 0
  }

  //
  // Resize.
  //
  // Window resizes and page ResizeObserver callbacks are coalesced into a single
  // flush per frame. Components measure on `resize`, then write on `scroll`, so
  // layout is only computed once instead of once per component.
  //
  resizeFrame?: number

  onResize() {
    if (this.resizeFrame !== undefined) {
      return
    }

    this.resizeFrame = window.requestAnimationFrame(() => {
      this.resizeFrame = undefined

      this.fire('resize')
      this.fire('scroll', this.scroll)
    })
  }

  //
  // Listeners.
  //
  addEventListeners() {
    window.addEventListener('popstate', this.onPopState)
    window.addEventListener('resize', this.onResize)
  }

  removeEventListeners() {
    window.removeEventListener('popstate', this.onPopState)
    window.removeEventListener('resize', this.onResize)
  }
}

export const Application = new ApplicationManager()
