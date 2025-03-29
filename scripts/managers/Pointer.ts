import { EventEmitter } from '../classes'

import { Viewport } from './Viewport'

export type PointerEvent = MouseEvent | TouchEvent

export interface PointerCustomEvent {
  event: MouseEvent | TouchEvent
  nativeEvent: MouseEvent | TouchEvent
  pointer: Pointer
}

export interface PointerCoordinates {
  event: MouseEvent | TouchEvent
  x: number
  y: number
  isTouch: boolean
}

class Vector {
  x: number = 0
  y: number = 0

  set(x?: number, y?: number) {
    if (x) this.x = x
    if (y) this.y = y
  }
}

export class Pointer extends EventEmitter {
  interacted: Promise<boolean> = Promise.create()

  x = 0
  y = 0

  isHolding: boolean = false
  isTouch: boolean = false

  delta: Vector = new Vector()
  hold: Vector = new Vector()
  last: Vector = new Vector()
  move: Vector = new Vector()
  normalized: Vector = new Vector()
  temp: Vector = new Vector()

  constructor() {
    super()

    this.addEventListeners()
  }

  getPointer(event: PointerEvent) {
    const t = {
      x: 0,
      y: 0,
    }

    const changedTouches = (event as TouchEvent).changedTouches
    const touches = (event as TouchEvent).touches

    const mouse = event as MouseEvent

    if (changedTouches?.length) {
      t.x = changedTouches[0].clientX
      t.y = changedTouches[0].clientY
    } else if (touches?.length) {
      t.x = touches[0].clientX
      t.y = touches[0].clientY
    } else {
      t.x = mouse.clientX
      t.y = mouse.clientY
    }

    return t
  }

  onMouseDown(event) {
    this.interacted.resolve(true)

    const pointer = this.getPointer(event)

    this.onStart({ event, ...pointer, isTouch: false })
  }

  onMouseMove(event) {
    const pointer = this.getPointer(event)

    this.onMove({ event, ...pointer, isTouch: false })
  }

  onMouseUp(event) {
    const pointer = this.getPointer(event)

    this.onEnd({ event, ...pointer, isTouch: false })
  }

  onTouchStart(event: TouchEvent) {
    const pointer = this.getPointer(event)

    this.onStart({ event, ...pointer, isTouch: true })
  }

  onTouchMove(event: TouchEvent) {
    const pointer = this.getPointer(event)

    this.onMove({ event, ...pointer, isTouch: true })
  }

  onTouchEnd(event: TouchEvent) {
    const pointer = this.getPointer(event)

    this.onEnd({ event, ...pointer, isTouch: true })
  }

  onStart({ event, x, y, isTouch }: PointerCoordinates) {
    this.isHolding = true
    this.isTouch = isTouch

    this.x = x
    this.y = y

    this.hold.set(x, y)
    this.last.set(x, y)
    this.delta.set(x, y)

    this.move.x = x - this.hold.x
    this.move.y = y - this.hold.y

    this.normalized.x = (this.x / Viewport.width) * 2 - 1
    this.normalized.y = -(this.y / Viewport.height) * 2 + 1

    this.emitter.emit('start', {
      nativeEvent: event,
      pointer: this,
    })
  }

  onMove({ event, x, y }: PointerCoordinates) {
    if (this.isHolding) {
      this.move.x = x - this.hold.x
      this.move.y = y - this.hold.y
    }

    this.x = x
    this.y = y

    this.delta.x = x - this.last.x
    this.delta.y = y - this.last.y

    this.last.x = x
    this.last.y = y

    this.normalized.x = (this.x / Viewport.width) * 2 - 1
    this.normalized.y = -(this.y / Viewport.height) * 2 + 1

    this.emitter.emit('move', {
      nativeEvent: event,
      pointer: this,
    })

    if (this.isHolding) {
      this.emitter.emit('drag', {
        nativeEvent: event,
        pointer: this,
      })
    }
  }

  onEnd({ event }: any) {
    this.emitter.emit('end', {
      nativeEvent: event,
      pointer: this,
    })

    this.delta.set(0, 0)
    this.move.set(0, 0)

    this.isHolding = false
  }

  onLeave({ event }: any) {
    this.emitter.emit('leave', {
      nativeEvent: event,
      pointer: this,
    })

    this.delta.set(0, 0)
    this.move.set(0, 0)

    this.isHolding = false
  }

  addEventListeners() {
    const options = { passive: false }

    window.addEventListener('mousedown', this.onMouseDown, options)
    window.addEventListener('mousemove', this.onMouseMove, options)
    window.addEventListener('mouseup', this.onMouseUp, options)

    window.addEventListener('touchstart', this.onTouchStart, options)
    window.addEventListener('touchmove', this.onTouchMove, options)
    window.addEventListener('touchend', this.onTouchEnd, options)
    window.addEventListener('touchcancel', this.onMouseUp, options)

    document.addEventListener('mouseleave', this.onLeave)
    document.addEventListener('contextmenu', this.onLeave)
  }

  removeEventListeners() {
    window.removeEventListener('mousedown', this.onMouseDown)
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)

    window.removeEventListener('touchstart', this.onTouchStart)
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchEnd)
    window.removeEventListener('touchcancel', this.onMouseUp)

    document.removeEventListener('mouseleave', this.onLeave)
    document.removeEventListener('contextmenu', this.onLeave)
  }
}
