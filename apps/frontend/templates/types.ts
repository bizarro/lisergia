import type { SanityFileSource, SanityImageSource } from '@sanity/asset-utils'

export type { SanityFileSource, SanityImageSource }

export interface SanityImageAsset {
  url: string
  alt?: string
  width?: number
  height?: number
}

export interface SanityFileAsset {
  url: string
}

export interface NavItem {
  text: string
  url: string
}

export interface SocialItem {
  text: string
  url: string
}

export interface Category {
  title: string
  slug?: { current: string }
}

export interface Menu {
  list: NavItem[]
  sublist: NavItem[]
}

export interface Footer {
  list: NavItem[]
  copyright: string
  credits: unknown
}

export interface Newsletter {
  title: string
  placeholder: string
  submit: string
}

export interface Social {
  title: string
  list: SocialItem[]
}

export interface Settings {
  newsletter: Newsletter
  social: Social
}

export interface PageSocial {
  title?: string
  description?: string
  image?: SanityImageSource
}

export interface PageData {
  posthog?: {
    key: string
    host: string
  }
  typekit?: string
  categories: Category[]
  footer: Footer
  menu: Menu
  settings: Settings
  content?: Section[]
  social?: PageSocial
  slug?: { current: string }
  title?: string
  label?: string
  price?: number
  image?: SanityImageSource
  isPreview: boolean
  isDesktop: boolean
  isPhone: boolean
  isTablet: boolean
}

// ─── Section types ────────────────────────────────────────────────────────────

export interface ButtonData {
  text?: string
  url?: string
}

export interface HeroSection {
  _type: 'hero'
  image: SanityImageSource
  title?: string
  button?: ButtonData
}

export interface HeaderSection {
  _type: 'header'
  image: SanityImageSource
  title?: string
}

export interface IntroSection {
  _type: 'intro'
  label?: string
  title?: string
  description?: string
  image: SanityImageSource
}

export interface CategoriesSection {
  _type: 'categories'
  label?: string
  title?: string
  list?: Array<{
    link?: { title?: string }
    image: SanityImageSource
  }>
}

export interface ColumnsSection {
  _type: 'columns'
  type?: string
  label?: string
  title?: string
  description?: string
  list?: Array<{ asset: SanityImageSource }>
}

export interface ContactSection {
  _type: 'contact'
  list?: Array<{
    title?: string
    description?: unknown
  }>
}

export interface DetailsSection {
  _type: 'details'
  description?: unknown
  gallery?: SanityImageSource[]
}

export interface DisclaimerSection {
  _type: 'disclaimer'
  title?: string
  author?: string
  description?: unknown
}

export interface ErrorSection {
  _type: 'error'
  image: SanityImageSource
  title?: string
  description?: string
  button?: ButtonData
}

export interface GallerySection {
  _type: 'gallery'
  title?: string
  list?: Array<{ asset: SanityImageSource }>
}

export interface HighlightSection {
  _type: 'highlight'
  label?: string
  title?: string
  description?: string
  list?: SanityImageSource[]
}

export interface InformationSection {
  _type: 'information'
  type?: string
  image?: { asset: SanityImageSource }
  description?: unknown
}

export interface IngredientsSection {
  _type: 'ingredients'
  title?: string
  description?: unknown
  image: SanityImageSource
  list?: Array<{
    title?: string
    region?: string
    ingredient?: string
  }>
}

export interface ListSection {
  _type: 'list'
  label?: string
  button?: ButtonData
  list?: Array<{
    text?: string
    url?: string
  }>
}

export interface LookbookSection {
  _type: 'lookbook'
  list?: Array<{
    content?: Array<{
      entry: {
        type: 'image' | 'text'
        image?: SanityImageSource
        title?: unknown
      }
    }>
  }>
}

export interface MarqueeSection {
  _type: 'marquee'
  title?: string
}

export interface MediaSection {
  _type: 'media'
  media: SanityFileSource
}

export interface QuoteSection {
  _type: 'quote'
  title?: string
  list?: Array<{ asset: SanityImageSource }>
}

export interface SeasonsSection {
  _type: 'seasons'
  title?: string
  description?: string
  label?: string
  list?: Array<{ asset: SanityImageSource }>
}

export interface ShopSection {
  _type: 'shop'
  list?: Array<{
    content?: Array<{
      entry: {
        type: 'product' | 'image'
        product?: {
          slug: { current: string }
          image: { asset: SanityImageSource }
          label?: string
          title?: string
          price?: number
        }
        image?: { asset: SanityImageSource }
      }
    }>
  }>
}

export type Section =
  | HeroSection
  | HeaderSection
  | IntroSection
  | CategoriesSection
  | ColumnsSection
  | ContactSection
  | DetailsSection
  | DisclaimerSection
  | ErrorSection
  | GallerySection
  | HighlightSection
  | InformationSection
  | IngredientsSection
  | ListSection
  | LookbookSection
  | MarqueeSection
  | MediaSection
  | QuoteSection
  | SeasonsSection
  | ShopSection
