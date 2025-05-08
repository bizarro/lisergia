import { content } from './shared/content'
import { link } from './shared/link'
import { social } from './shared/social'

import { footer } from './layout/footer'
import { menu } from './layout/menu'

import { page } from './general/page'
import { product } from './general/product'

import { settings } from './global/settings'

import { categories } from './modules/categories'
import { hero } from './modules/hero'
import { highlight } from './modules/highlight'
import { ingredients } from './modules/ingredients'
import { list } from './modules/list'
import { media } from './modules/media'
import { quote } from './modules/quote'

export const schemaTypes = [
  // Shared
  content,
  link,
  social,

  // Types
  page,
  product,

  // Modules
  categories,
  hero,
  highlight,
  ingredients,
  list,
  media,
  quote,

  // Settings
  footer,
  menu,
  settings,
]
