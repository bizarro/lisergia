import 'dotenv/config'

import { Elysia } from 'elysia'

import html from '@elysiajs/html'
import newsletter from '../controllers/newsletter'
import page from '../controllers/page'

const app = new Elysia({
  aot: false,
  strictPath: false,
})

app
  .use(html())
  .get('/', page)
  .get('/:slug', page)
  .get('/product/:slug', page)
  .post('/signup', newsletter)
  .get('*', page) // Use page controller for 404s

export interface Env {
  SANITY_API?: string
  SANITY_DATABASE?: string
  SANITY_PROJECT?: string
  GOOGLE_ANALYTICS?: string
  TYPEKIT?: string
  KLAVIYO_API_KEY?: string
  KLAVIYO_LIST_ID?: string
}

export default {
  async fetch(request: Request, env: Env, ctx: any) {
    return app.handle(request)
  },
}

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
