export const createPromise = <T>(): [Promise<T>, (value: T) => void] => {
  let resolve: (value: T) => void

  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise
  })

  return [promise, resolve!]
}

export const createPromiseWithReject = <T>(): [Promise<T>, (value: T) => void, (reason?: unknown) => void] => {
  let resolve: (value: T) => void
  let reject: (reason?: unknown) => void

  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise
    reject = rejectPromise
  })

  return [promise, resolve!, reject!]
}

export const createPromiseWithTimeout = <T>(
  timeout: number,
): [Promise<T>, (value: T) => void, (reason?: unknown) => void] => {
  let resolve: (value: T) => void
  let reject: (reason?: unknown) => void

  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise
    reject = rejectPromise
  })

  const timer = setTimeout(() => {
    reject(new Error('Promise timed out'))
  }, timeout)

  promise.finally(() => {
    clearTimeout(timer)
  })

  return [promise, resolve!, reject!]
}
