import 'dotenv/config'

import * as fs from 'node:fs'

import { client } from './client.js'
import { fetchContent } from './utilities/content.js'

const body = await fetchContent(client)

fs.writeFile('content.json', JSON.stringify(body, null, 4), 'utf8', () => {
  console.log('Content generated under content.json.')
})
