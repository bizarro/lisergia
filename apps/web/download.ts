import * as fs from 'fs'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

import * as AssetUtils from '@sanity/asset-utils'

import { client } from './client.js'

const [footer] = await client.fetch(`*[_type == "footer"]`)
const [menu] = await client.fetch(`*[_type == "menu"]`)
const [settings] = await client.fetch(`*[_type == "settings"]`)

const categories = await client.fetch(`*[_type == "category"]`)
const pages = await client.fetch(`*[_type == "page"]`)
const products = await client.fetch(`*[_type == "product"]`)

const references = [...categories, ...products]

const traverse = (object: any, callback: Function) => {
  for (const property in object) {
    const value = object[property]

    callback(object, property, value)

    if (isArray(value)) {
      value.forEach((value) => {
        traverse(value, callback)
      })
    }

    if (isObject(value)) {
      traverse(value, callback)
    }
  }
}

const parsePage = (page: any) => {
  const map = new Map()

  traverse(page, (object: any, key: string, value: any) => {
    if (key === '_ref') {
      if (value.includes('image-')) {
        return
      }

      const reference = references.find((document) => document._id === value)

      if (reference) {
        map.set(object, reference)
      }
    }
  })

  Array.from(map.entries()).forEach(([entry, reference]) => {
    Object.assign(entry, { ...reference })
  })
}

const allPages = [...categories, ...products, ...pages]

allPages.forEach((page) => parsePage(page))

const body = {
  categories,
  footer,
  menu,
  pages,
  products,
  settings,
}

fs.writeFile('content.json', JSON.stringify(body, null, 4), 'utf8', () => {
  console.log('Content generated under content.json.')
})
