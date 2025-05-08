import AutoBind from 'auto-bind'
import { Emitter, Unsubscribe, createNanoEvents } from 'nanoevents'

export class EventEmitter {
  emitter: Emitter
  entries: Map<Function, Unsubscribe> = new Map()

  constructor() {
    AutoBind(this)

    this.emitter = createNanoEvents()
  }

  on(event: string, callback: (...args: any) => void) {
    if (!callback) {
      return console.trace('No callback provided')
    }

    const emitter = this.emitter.on(event, callback)

    this.entries.set(callback, emitter)

    return emitter
  }

  off(event: string, callback: (...args: any) => void) {
    const unsubscribe = this.entries.get(callback)

    if (unsubscribe) {
      unsubscribe()
    }
  }

  fire(event: string, ...args: any[]) {
    this.emitter.emit(event, ...args)
  }

  destroy() {
    this.entries.forEach((unsubscribe) => unsubscribe())
  }
}
