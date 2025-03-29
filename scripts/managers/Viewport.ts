import { computed, makeObservable, observable } from 'mobx'
import { Unsubscribe } from 'nanoevents'

import { EventEmitter } from '../classes/EventEmitter'

class ViewportManager extends EventEmitter {
  height: number = window.innerHeight
  width: number = window.innerWidth

  entries: Map<Function, Unsubscribe> = new Map()

  constructor() {
    super()

    makeObservable(this, {
      aspect: computed,
      dpr: computed,

      height: observable,
      width: observable,

      isPhone: computed,
      isTablet: computed,
      isDesktop: computed,
    })

    this.onResize()

    window.addEventListener('resize', this.onResize)
  }

  get aspect() {
    return this.width / this.height
  }

  get dpr() {
    return window.devicePixelRatio
  }

  get isPhone() {
    return this.width < 768
  }

  get isTablet() {
    return this.width >= 768 && this.width < 1024
  }

  get isDesktop() {
    return this.width >= 1024
  }

  on(event, callback) {
    const unsubscribe = super.on(event, callback)

    this.entries.set(callback, unsubscribe)

    callback(this)

    return unsubscribe
  }

  off(event, callback) {
    super.off(event, callback)
  }

  onResize() {
    this.height = window.innerHeight
    this.width = window.innerWidth

    document.documentElement.style.setProperty('--100vh', `${this.height}px`)

    this.fire('resize', this)
  }
}

export const Viewport = new ViewportManager()
