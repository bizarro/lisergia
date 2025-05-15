import { computed, makeObservable, observable } from 'mobx'
import { Unsubscribe } from 'nanoevents'

import { EventEmitter } from '@lisergia/core'

export class ViewportManager extends EventEmitter {
  static PHONE = 768
  static TABLET = 1024
  static DESKTOP = 1280

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
    return this.width < ViewportManager.PHONE
  }

  get isTablet() {
    return this.width >= ViewportManager.PHONE && this.width < ViewportManager.TABLET
  }

  get isDesktop() {
    return this.width >= ViewportManager.TABLET
  }

  on(event: string, callback: (...args: any[]) => void) {
    const unsubscribe = super.on(event, callback)

    if (unsubscribe) {
      this.entries.set(callback, unsubscribe)
    }

    callback(this)

    return unsubscribe
  }

  off(event: string, callback: (...args: any[]) => void) {
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
