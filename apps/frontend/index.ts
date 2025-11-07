import 'dotenv/config'

import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { Elysia } from 'elysia'
import path from 'path'
import { fileURLToPath } from 'url'

import page from './controllers/page'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = new Elysia({ aot: false })
  .use(html())
  .use(staticPlugin({ assets: path.join(__dirname, 'build'), prefix: '/' }))
  .get('/', page)
  // .get('/:slug', page)
  // .get('/product/:slug', page)
  // .post('/signup', newsletter)
  // .get('*', notFound)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
