import { type ApplicationManager, Component } from '@lisergia/core'

async function animateOpacity(element: HTMLElement, from: number, to: number) {
  const animation = element.animate(
    { opacity: [String(from), String(to)] },
    {
      duration: 1000,
      easing: 'linear',
      fill: 'forwards',
    },
  )

  await animation.finished

  element.style.opacity = String(to)

  animation.cancel()
}

export default class Transition extends Component {
  constructor({ application }: { application: ApplicationManager }) {
    super({
      application,
      id: 'transition',
    })
  }

  async onTransition(application: ApplicationManager) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      await animateOpacity(application.currentPage!.element, 1, 0)
    }

    application.currentPage!.element.remove()
    application.currentPage!.destroy()

    application.element.appendChild(application.nextPage.element!.firstElementChild!)

    application.createPage(application.nextPage.template)

    window.posthog?.capture('page_navigated', {
      template: application.nextPage.template,
      $current_url: window.location.href,
    })

    if (!prefersReducedMotion) {
      await animateOpacity(application.currentPage!.element, 0, 1)
    }
  }
}
