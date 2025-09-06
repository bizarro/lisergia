import { Request, Response } from 'express'

import { getData } from '../utilities/data'

export default async (request: Request, response: Response) => {
  response.render('pages/page', {
    ...getData(request),
  })
}
