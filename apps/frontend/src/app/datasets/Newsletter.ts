import { type ApplicationManager, Component } from '@lisergia/core'

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

    window.posthog?.capture('newsletter_signup_submitted')

    let response: Response

    try {
      response = await window.fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })
    } catch (error) {
      window.posthog?.captureException(error)

      this.element.classList.add(this.classes.error)
      return
    }

    this.elements.form.setAttribute('disabled', 'disabled')

    if (response.ok) {
      this.element.classList.add(this.classes.success)

      window.posthog?.capture('newsletter_signup_succeeded')

      if (typeof email === 'string' && email) {
        window.posthog?.identify(email, { email })
      }
    } else {
      this.element.classList.add(this.classes.error)

      window.posthog?.capture('newsletter_signup_failed', {
        status_code: response.status,
      })
    }
  }

  addEventListeners() {
    this.elements.form.addEventListener('submit', this.onSubmit)
  }

  removeEventListeners() {
    this.elements.form.removeEventListener('submit', this.onSubmit)
  }
}
