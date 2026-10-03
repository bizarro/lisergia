type IntersectionCallback = (isIntersecting: boolean) => void

interface SharedObserver {
  observer: IntersectionObserver
  targets: Map<Element, Set<IntersectionCallback>>
}

//
// One IntersectionObserver per scroll root and margin, shared by every target.
// Lenis scrolls `.page`, which clips its children, so it is used as the root:
// against the viewport, a margin could never reach content clipped by the page.
//
const observers: Map<string, Map<Element | null, SharedObserver>> = new Map()

function getObserver(root: Element | null, rootMargin: string) {
  let roots = observers.get(rootMargin)

  if (!roots) {
    roots = new Map()

    observers.set(rootMargin, roots)
  }

  let shared = roots.get(root)

  if (!shared) {
    const targets: SharedObserver['targets'] = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          targets.get(entry.target)?.forEach((callback) => {
            callback(entry.isIntersecting)
          })
        })
      },
      { root, rootMargin },
    )

    shared = { observer, targets }

    roots.set(root, shared)
  }

  return shared
}

// Returns a function that stops observing.
export function observeIntersection(element: Element, callback: IntersectionCallback, { rootMargin = '0px' } = {}) {
  const root = element.closest('.page')
  const { observer, targets } = getObserver(root, rootMargin)
  const callbacks = targets.get(element) ?? new Set()

  if (!targets.has(element)) {
    targets.set(element, callbacks)

    observer.observe(element)
  }

  callbacks.add(callback)

  return () => {
    callbacks.delete(callback)

    if (callbacks.size > 0) {
      return
    }

    targets.delete(element)
    observer.unobserve(element)

    if (targets.size === 0) {
      observer.disconnect()

      observers.get(rootMargin)?.delete(root)
    }
  }
}
