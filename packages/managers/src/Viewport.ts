import { EventEmitter } from '@lisergia/core'

export class ViewportManager extends EventEmitter {
  static PHONE = 768
  static TABLET = 1024
  static DESKTOP = 1280

  constructor() {
    super()

    this.onResize()

    window.addEventListener('resize', this.onResize)
  }

  get height() {
    return window.innerHeight
  }

  get width() {
    return window.innerWidth
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

  on<Arguments extends unknown[]>(event: string, callback: (...args: Arguments) => void) {
    const unsubscribe = super.on(event, callback)

    if (unsubscribe) {
      this.entries.set(callback, unsubscribe)
    }

    Reflect.apply(callback, undefined, [this])

    return unsubscribe
  }

  off<Arguments extends unknown[]>(event: string, callback: (...args: Arguments) => void) {
    super.off(event, callback)

    const unsubscribe = this.entries.get(callback)

    if (unsubscribe) {
      unsubscribe()
    }

    this.entries.delete(callback)
  }

  onResize() {
    document.documentElement.style.setProperty('--100vh', `${this.height}px`)

    this.fire('resize', this)
  }

  destroy() {
    super.destroy()

    this.entries.forEach((unsubscribe) => {
      unsubscribe()
    })

    this.entries.clear()

    window.removeEventListener('resize', this.onResize)
  }
}

export const Viewport = new ViewportManager()
