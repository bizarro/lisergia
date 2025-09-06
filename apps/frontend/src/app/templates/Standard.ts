import { Page, PageParameters } from '@lisergia/core'

export default class extends Page {
  declare element: HTMLElement

  constructor(args: PageParameters) {
    super({
      ...args,
      element: '.page:last-child',
      elements: {
        wrapper: '.page__wrapper',
      },
    })
  }
}
