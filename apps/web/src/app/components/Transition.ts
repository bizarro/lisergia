import { ApplicationManager, Component } from '@lisergia/core'

import { animate } from 'animejs'

export default class Transition extends Component {
  constructor({ application }: { application: ApplicationManager }) {
    super({
      application,
      id: 'transition',
    })
  }

  onTransition(application: ApplicationManager) {
    const animation = animate(application.currentPage!.element, {
      duration: 1000,
      opacity: 0,
    })

    animation.then(() => {
      application.currentPage!.element.remove()
      application.currentPage!.destroy()

      application.element.appendChild(application.nextPage.element!.firstElementChild!)

      application.createPage(application.nextPage.template)

      animate(application.currentPage!.element, {
        duration: 1000,
        opacity: {
          from: 0,
          to: 1,
        },
      })
    })
  }
}
