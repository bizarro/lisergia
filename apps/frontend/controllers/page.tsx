import { Html } from '@elysiajs/html'
import { getData } from '../utilities/data'
import { Layout } from '../views/Layout'

export default (context: any) => {
  const data = getData(context)
  return context.html(<Layout page={data} />)
}
