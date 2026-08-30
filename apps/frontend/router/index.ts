import { Elysia, t } from 'elysia'

import newsletter from '../controllers/newsletter'
import page from '../controllers/page'
import { disableDraftMode, enableDraftMode, updatePreviewPerspective } from '../utilities/draft-mode'

const router = new Elysia({ name: 'lisergia.router' })
  .get('/api/draft-mode/enable', ({ request }) => enableDraftMode(request))
  .get('/api/draft-mode/disable', () => disableDraftMode())
  .get('/api/draft-mode/perspective', ({ request }) => updatePreviewPerspective(request))
  .get('/', ({ request }) => page(undefined, request))
  .get('/product/:slug', ({ params, request }) => page(params.slug, request))
  .get('/:slug', ({ params, request }) => page(params.slug, request))
  .post('/signup', ({ body }) => newsletter(body.email), {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  })

export { router }
