// Vite build manifest, aliased in `wrangler.jsonc` to `build/.vite/manifest.json`.
declare module 'lisergia:manifest' {
  import type { Manifest } from 'vite'

  const manifest: Manifest

  export default manifest
}
