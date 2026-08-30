import { enableVisualEditing } from '@sanity/visual-editing/enable-visual-editing'

let applyingPresentationNavigation = false
let suppressNextPopState = false

enableVisualEditing({
  history: {
    subscribe: (navigate) => {
      const originalPushState = history.pushState.bind(history)
      const originalReplaceState = history.replaceState.bind(history)
      const notify = (type: 'push' | 'pop' | 'replace') => {
        if (applyingPresentationNavigation) return

        navigate({
          type,
          url: `${location.pathname}${location.search}${location.hash}`,
        })
      }

      history.pushState = (...args) => {
        originalPushState(...args)
        notify('push')
      }

      history.replaceState = (...args) => {
        originalReplaceState(...args)
        notify('replace')
      }

      const onPopState = () => {
        if (suppressNextPopState) {
          suppressNextPopState = false
          return
        }

        notify('pop')
      }
      addEventListener('popstate', onPopState)

      return () => {
        history.pushState = originalPushState
        history.replaceState = originalReplaceState
        removeEventListener('popstate', onPopState)
      }
    },
    update: (update) => {
      applyingPresentationNavigation = true

      try {
        if (update.type === 'push') history.pushState(null, '', update.url)
        if (update.type === 'replace') history.replaceState(null, '', update.url)

        if (update.type === 'pop') {
          suppressNextPopState = true
          history.back()
        }
      } finally {
        applyingPresentationNavigation = false
      }
    },
  },
  refresh: (payload) => {
    if (payload.source === 'manual' || payload.source === 'mutation') {
      location.reload()
      return new Promise<void>(() => {})
    }

    return false
  },
  onPerspectiveChange: async (perspective) => {
    const value = Array.isArray(perspective) ? perspective.join(',') : perspective
    const response = await fetch(`/api/draft-mode/perspective?perspective=${encodeURIComponent(value)}`)

    if (response.status === 200) location.reload()
  },
})
