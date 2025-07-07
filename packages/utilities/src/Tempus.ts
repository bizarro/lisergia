import Tempus, { TempusCallback, TempusOptions } from 'tempus'

export class TempusUtilsManager {
  cache = new Map()

  add(callback: TempusCallback, options?: TempusOptions) {
    const cancel = Tempus.add(callback, options)

    this.cache.set(callback, cancel)
  }

  remove(callback: TempusCallback) {
    const cancel = this.cache.get(callback)

    if (cancel) {
      cancel()

      this.cache.delete(callback)
    }
  }
}

export const TempusUtils = new TempusUtilsManager()
