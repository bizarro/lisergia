import { content } from './shared/content'
import { link } from './shared/link'
import { social } from './shared/social'

import { footer } from './layout/footer'
import { menu } from './layout/menu'

import { category } from './general/category'
import { page } from './general/page'
import { product } from './general/product'

import { settings } from './global/settings'

import { categories } from './modules/categories'
import { columns } from './modules/columns'
import { details } from './modules/details'
import { contact } from './modules/contact'
import { disclaimer } from './modules/disclaimer'
import { error } from './modules/error'
import { gallery } from './modules/gallery'
import { header } from './modules/header'
import { hero } from './modules/hero'
import { highlight } from './modules/highlight'
import { information } from './modules/information'
import { ingredients } from './modules/ingredients'
import { intro } from './modules/intro'
import { list } from './modules/list'
import { lookbook } from './modules/lookbook'
import { marquee } from './modules/marquee'
import { media } from './modules/media'
import { quote } from './modules/quote'
import { seasons } from './modules/seasons'
import { shop } from './modules/shop'

export const schemaTypes = [
  // Shared
  content,
  link,
  social,

  // Types
  category,
  page,
  product,

  // Modules
  categories,
  columns,
  contact,
  details,
  disclaimer,
  error,
  gallery,
  header,
  hero,
  highlight,
  information,
  ingredients,
  intro,
  list,
  lookbook,
  marquee,
  media,
  quote,
  seasons,
  shop,

  // Settings
  footer,
  menu,
  settings,
]
