declare interface Promise<T> {
  reject: any
  resolve: any
}

declare interface PromiseConstructor {
  create(): Promise<any>
}

Promise.create = function () {
  const promise = new Promise((resolve, reject) => {
    this.tempResolve = resolve
    this.tempReject = reject
  })

  promise.resolve = this.tempResolve
  promise.reject = this.tempReject

  delete this.tempResolve
  delete this.tempReject

  return promise
}
