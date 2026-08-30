import type { PostHog } from '@posthog/types'

declare global {
  interface Window {
    posthog?: PostHog
  }
}
