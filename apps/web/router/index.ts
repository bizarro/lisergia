import express from 'express'

import newsletter from '../controllers/newsletter'
import page from '../controllers/page'

import { getData } from '../utilities/data'

const router = express.Router()

router.get('/', page)
router.get('/:slug', page)
router.get('/product/:slug', page)

router.post('/signup', newsletter)

router.use((request, response) => {
  const data = getData(request)

  response.status(404)

  response.render('pages/not-found', { ...data })
})

export { router }
