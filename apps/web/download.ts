import * as fs from 'fs'

import * as AssetUtils from '@sanity/asset-utils'

import { client } from './client.js'

const [footer] = await client.fetch(`*[_type == "footer"]`)
const [menu] = await client.fetch(`*[_type == "menu"]`)
const [settings] = await client.fetch(`*[_type == "settings"]`)

const pages = await client.fetch(`*[_type == "page"]`)

const body = {
  footer,
  menu,
  pages,
  settings,
}

fs.writeFile('content.json', JSON.stringify(body, null, 4), 'utf8', () => {
  console.log('Content generated under content.json.')
})
