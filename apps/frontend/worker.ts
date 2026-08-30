import { Elysia } from 'elysia'
import { CloudflareAdapter } from 'elysia/adapter/cloudflare-worker'

import page from './controllers/page'
import { router } from './router/index.ts'

const app = new Elysia({
  name: 'lisergia.cloudflare',
  adapter: CloudflareAdapter,
})
  .onError(({ code, request }) => {
    if (code === 'NOT_FOUND') return page('not-found', request, 404)
  })
  .use(router)
  .compile()

export default app
