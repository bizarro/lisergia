import { ApplicationManager, Component } from '@lisergia/core'

export default class Newsletter extends Component {
  declare classes: {
    error: string
    success: string
  }

  declare element: HTMLElement
  declare elements: {
    form: HTMLFormElement
  }

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      classes: {
        error: 'footer__newsletter--error',
        success: 'footer__newsletter--success',
      },
      element,
      elements: {
        form: 'form',
      },
    })
  }

  async onSubmit(event: Event) {
    event.preventDefault()

    const formData = new FormData(this.elements.form)
    const email = formData.get('email')

    const response = await window.fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })

    this.elements.form.setAttribute('disabled', 'disabled')

    if (response.ok) {
      this.element.classList.add(this.classes.success)
    } else {
      this.element.classList.add(this.classes.error)
    }
  }

  addEventListeners() {
    this.elements.form.addEventListener('submit', this.onSubmit)
  }

  removeEventListeners() {
    this.elements.form.removeEventListener('submit', this.onSubmit)
  }
}
