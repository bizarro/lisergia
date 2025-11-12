import { getData } from '../utilities/data'
import { renderTwig } from '../utilities/twig-helper'

export default (context: any) => {
  const { getVersionedPath } = context
  const data = getData(context)
  return new Response(renderTwig('pages/page', { ...data, getVersionedPath }), {
    status: 404,
    headers: { 'Content-Type': 'text/html' },
  })
}
