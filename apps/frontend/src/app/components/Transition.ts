import { type ApplicationManager, Component } from '@lisergia/core'

import { animate } from 'animejs'

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
      await animate(application.currentPage!.element, {
        duration: 1000,
        opacity: 0,
      })
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
      await animate(application.currentPage!.element, {
        duration: 1000,
        opacity: {
          from: 0,
          to: 1,
        },
      })
    }
  }
}
