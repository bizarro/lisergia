import type { Category, Section } from '../types'
import Categories from './Categories'
import Columns from './Columns'
import Contact from './Contact'
import Details from './Details'
import Disclaimer from './Disclaimer'
import ErrorSection from './ErrorSection'
import Gallery from './Gallery'
import Hero from './Hero'
import Highlight from './Highlight'
import Information from './Information'
import Ingredients from './Ingredients'
import Intro from './Intro'
import List from './List'
import Lookbook from './Lookbook'
import Marquee from './Marquee'
import Media from './Media'
import Quote from './Quote'
import Seasons from './Seasons'
import SectionHeader from './SectionHeader'
import Shop from './Shop'

interface SectionsProps {
  content: Section[]
  categories: Category[]
  label?: string
  title?: string
  price?: number
  slug?: string
}

export default function Sections({ content, categories, label, title, price, slug }: SectionsProps) {
  return (
    <>
      {content.map((section, index) => {
        switch (section._type) {
          case 'categories':
            return <Categories key={index} section={section} />
          case 'columns':
            return <Columns key={index} section={section} />
          case 'contact':
            return <Contact key={index} section={section} />
          case 'details':
            return <Details key={index} section={section} label={label} title={title} price={price} slug={slug} />
          case 'disclaimer':
            return <Disclaimer key={index} section={section} />
          case 'error':
            return <ErrorSection key={index} section={section} />
          case 'gallery':
            return <Gallery key={index} section={section} />
          case 'header':
            return <SectionHeader key={index} section={section} />
          case 'hero':
            return <Hero key={index} section={section} />
          case 'highlight':
            return <Highlight key={index} section={section} />
          case 'information':
            return <Information key={index} section={section} />
          case 'ingredients':
            return <Ingredients key={index} section={section} />
          case 'intro':
            return <Intro key={index} section={section} />
          case 'list':
            return <List key={index} section={section} />
          case 'lookbook':
            return <Lookbook key={index} section={section} />
          case 'marquee':
            return <Marquee key={index} section={section} />
          case 'media':
            return <Media key={index} section={section} />
          case 'quote':
            return <Quote key={index} section={section} />
          case 'seasons':
            return <Seasons key={index} section={section} />
          case 'shop':
            return <Shop key={index} section={section} categories={categories} />
          default:
            return null
        }
      })}
    </>
  )
}
