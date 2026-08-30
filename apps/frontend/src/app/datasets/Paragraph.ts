import { splitText, type TextSplitter } from 'animejs/text'

import Animation from '../classes/Animation'

const LINE_TEMPLATE = '<div><div data-line="{i}">{value}</div></div>'

function getAnimatedLines(split: TextSplitter) {
  return split.lines.flatMap((line: HTMLElement) => {
    const wrapper = line.parentElement

    return wrapper && wrapper !== split.$target ? [wrapper, line] : [line]
  })
}

export default class extends Animation {
  declare element: HTMLElement
  declare elements: {
    paragraphs: NodeListOf<HTMLElement>
    lines: Array<HTMLElement>
    target: HTMLElement
  }

  declare splits: Array<TextSplitter>

  constructor({ element }: { element: HTMLElement }) {
    const paragraphs = element.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6, li, p')
    const targets = paragraphs.length ? Array.from(paragraphs) : [element]
    const splits = targets.map((target) =>
      splitText(target, {
        lines: LINE_TEMPLATE,
        words: false,
      }),
    )

    const lines = splits.flatMap(getAnimatedLines)

    super({
      element,
      elements: {
        lines,
      },
    })

    this.splits = splits

    this.splits.forEach((split) => {
      split.addEffect(this.refreshLines)
    })
  }

  refreshLines() {
    this.elements.lines = this.splits.flatMap(getAnimatedLines)

    if (this.isVisible) {
      this.animateIn()
    } else {
      this.animateOut()
    }
  }

  animateIn() {
    super.animateIn()

    this.elements.lines.forEach((element, lineIndex) => {
      element.style.transform = 'translateY(0) rotate(0)'
      element.style.transition = `transform 1.5s ${0.1 + lineIndex * 0.1}s var(--ease-out-expo)`
    })
  }

  animateOut() {
    super.animateOut()

    let rotation = 0

    this.elements.lines.forEach((element) => {
      rotation += 0.15

      element.style.transform = `translateY(150%) rotate(${rotation}deg)`
      element.style.transition = ''
    })
  }

  destroy() {
    this.splits.forEach((split) => {
      split.revert()
    })

    super.destroy()
  }
}
