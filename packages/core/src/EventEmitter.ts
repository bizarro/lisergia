import AutoBind from 'auto-bind'
import { createNanoEvents, type Emitter, type Unsubscribe } from 'nanoevents'

export class EventEmitter {
  emitter: Emitter
  entries: Map<unknown, Unsubscribe> = new Map()

  constructor() {
    AutoBind(this)

    this.emitter = createNanoEvents()
  }

  on<Arguments extends unknown[]>(event: string, callback: (...args: Arguments) => void) {
    if (!callback) {
      return console.trace('No callback provided')
    }

    const emitter = this.emitter.on(event, callback)

    this.entries.set(callback, emitter)

    return emitter
  }

  off<Arguments extends unknown[]>(_event: string, callback: (...args: Arguments) => void) {
    const unsubscribe = this.entries.get(callback)

    if (unsubscribe) {
      unsubscribe()
    }

    this.entries.delete(callback)
  }

  fire(event: string, ...args: unknown[]) {
    this.emitter.emit(event, ...args)
  }

  destroy() {
    this.entries.forEach((unsubscribe) => {
      unsubscribe()
    })

    this.entries.clear()
  }
}
