import 'dotenv/config'

import { html } from '@elysiajs/html'
import { Elysia } from 'elysia'
import path from 'path'
import staticify from 'staticify'
import { fileURLToPath } from 'url'

import newsletter from './controllers/newsletter'
import notFound from './controllers/notFound'
import page from './controllers/page'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = new Elysia({ aot: false })
app.use(html())

const staticifyInstance = staticify(path.join(__dirname, 'build'))

app
  .decorate('getVersionedPath', staticifyInstance.getVersionedPath)
  .get('/', page)
  .get('/:slug', page)
  .get('/product/:slug', page)
  .post('/signup', newsletter)
  .get('*', notFound)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
