import { type ApplicationManager, Component } from '@lisergia/core'
import { type DOMRectBounds, DOMUtils, MathUtils } from '@lisergia/utilities'

import { splitText, type TextSplitter } from 'animejs/text'

const WORD_TEMPLATE = '<div><div data-word="{i}">{value}</div></div>'

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

  declare titleSplit: TextSplitter
  declare bounds: DOMRectBounds

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

    const title = this.elements.heroTitle
    const titleBounds = title.getBoundingClientRect()
    const isInitiallyVisible = titleBounds.bottom > 0 && titleBounds.top < window.innerHeight

    // Measure before splitting the title, so reads aren't interleaved with writes.
    this.onResize()

    if (isInitiallyVisible) {
      this.element.classList.add(this.classes.active)
    }

    title.setAttribute('aria-label', title.textContent?.trim() ?? '')

    this.titleSplit = splitText(title, {
      accessible: false,
      words: WORD_TEMPLATE,
    })

    this.titleSplit.words.forEach((word: HTMLElement) => {
      word.setAttribute('aria-hidden', 'true')
    })

    if (!isInitiallyVisible) {
      void this.animateIn()
    }

    this.application!.onResize()
  }

  // Only runs when the title starts offscreen, so the hero is hidden while the
  // timeline loads on demand instead of shipping with the hero chunk.
  async animateIn() {
    const { createTimeline } = await import('animejs')

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
  }

  onResize() {
    this.bounds = DOMUtils.getBounds(this.element, this.application!.scroll)
  }

  onScroll(scroll: number) {
    const { height, top } = this.bounds

    const scale = MathUtils.map(scroll, top, top + height, 1, 1.5)
    const translateY = MathUtils.map(scroll, top, top + height, 0, 100)

    this.elements.heroMedia.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
  }

  destroy() {
    this.titleSplit.revert()

    super.destroy()
  }
}
