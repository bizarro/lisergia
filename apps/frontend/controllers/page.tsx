import { Html } from '@elysiajs/html'
import { getData } from '../utilities/data'
import { Layout } from '../views/Layout'

export default (context: any) => {
  const data = getData(context)
  const html = context.html(<Layout page={data} />)

  // Return 404 status if the not-found page is being rendered
  if (data.data.slug?.current === 'not-found') {
    context.set.status = 404
  }

  return html
}
