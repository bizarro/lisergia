import { ApplicationManager, Component } from '@lisergia/core'
import { DOMUtils, MathUtils, SplitText } from '@lisergia/utilities'

import { createTimeline } from 'animejs'

import { autorun, computed, makeObservable } from 'mobx'

export default class Hero extends Component {
  declare classes: {
    active: string
  }

  declare element: HTMLElement
  declare elements: {
    heroBox: HTMLElement
    heroMedia: HTMLElement
    heroTitle: HTMLElement
  }

  constructor({ application, element }: { application: ApplicationManager; element: HTMLElement }) {
    super({
      application,
      classes: {
        active: 'hero--active',
      },
      element,
      elements: {
        heroBox: '.hero__box',
        heroMedia: '.hero__media',
        heroTitle: '.hero__title',
      },
    })

    SplitText.create(this.elements.heroTitle, {
      type: 'words',
    })

    SplitText.create(this.elements.heroTitle, {
      type: 'words',
    })

    const timeline = createTimeline({
      defaults: {
        duration: 2000,
        ease: 'inOutCubic',
      },
    })

    timeline.set(this.elements.heroBox, {
      '--border': 0,
      '--inset': 0,
    })

    timeline.set(this.elements.heroMedia, {
      scale: 1.2,
    })

    timeline.label('start', 500)

    timeline.call(() => {
      this.element.classList.add(this.classes.active)
    }, 1000)

    timeline.add(
      this.elements.heroBox,
      {
        '--border': { to: 1 },
        '--inset': { to: 1 },
      },
      'start',
    )

    timeline.add(
      this.elements.heroMedia,
      {
        scale: { to: 1 },
      },
      'start',
    )

    timeline.play()

    makeObservable(this, {
      bounds: computed,
    })

    autorun(this.onUpdate)
  }

  get bounds() {
    return DOMUtils.getBounds(this.element)
  }

  onUpdate() {
    const { scroll } = this.application!
    const { height, top } = this.bounds

    const scale = MathUtils.map(scroll, top, top + height, 1, 1.5)
    const translateY = MathUtils.map(scroll, top, top + height, 0, 100)

    this.elements.heroMedia.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
  }
}
