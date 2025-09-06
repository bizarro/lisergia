import { ApplicationManager, Component } from '@lisergia/core'

export default class extends Component {
  declare classes: {
    buttonActive: string
    mediaActive: string
  }

  declare element: HTMLElement
  declare elements: {
    medias: NodeListOf<HTMLElement>
    mediasButtons: NodeListOf<HTMLElement>
  }

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      classes: {
        buttonActive: 'details__gallery__navigation__button--active',
        mediaActive: 'details__header__media--active',
      },
      element,
      elements: {
        medias: '.details__header__media',
        mediasButtons: '.details__gallery__navigation__button',
      },
    })
  }

  onToggle({ target }: MouseEvent) {
    const element = target as HTMLElement
    const index = parseInt(element.dataset.index!)

    this.elements.medias.forEach((media, mediaIndex) => {
      if (mediaIndex === index) {
        media.classList.add(this.classes.mediaActive)
      } else {
        media.classList.remove(this.classes.mediaActive)
      }
    })

    this.elements.mediasButtons.forEach((button, buttonIndex) => {
      if (buttonIndex === index) {
        button.classList.add(this.classes.buttonActive)
      } else {
        button.classList.remove(this.classes.buttonActive)
      }
    })
  }

  addEventListeners() {
    this.elements.mediasButtons.forEach((button) => {
      button.addEventListener('click', this.onToggle, { passive: true })
    })
  }

  removeEventListeners() {
    this.elements.mediasButtons.forEach((button) => {
      button.removeEventListener('click', this.onToggle)
    })
  }
}
