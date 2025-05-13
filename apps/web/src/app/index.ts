import '../styles/index.scss'

import { configure } from 'mobx'

configure({
  enforceActions: 'never',
})

import {
  Application,
  ApplicationComponentData,
  ApplicationComponentDatasetData,
  ApplicationRoute,
  Component,
  ComponentParameters,
  Page,
  PageParameters,
} from '@lisergia/core'

import Menu from './components/Menu'
import Navigation from './components/Navigation'
import Transition from './components/Transition'

import Newsletter from './datasets/Newsletter'
import Paragraph from './datasets/Paragraph'
import Parallax from './datasets/Parallax'
import Reveal from './datasets/Reveal'
import Source from './datasets/Source'
import Title from './datasets/Title'
import Translate from './datasets/Translate'

import Categories from './datasets/sections/Categories'
import Footer from './datasets/sections/Footer'
import Hero from './datasets/sections/Hero'
import List from './datasets/sections/List'
import Media from './datasets/sections/Media'
import Shop from './datasets/sections/Shop'

import Standard from './templates/Standard'

const components: Array<ApplicationComponentData> = [
  {
    component: Menu as new (params?: ComponentParameters) => Component,
  },
  {
    component: Navigation as new (params?: ComponentParameters) => Component,
  },
  {
    component: Transition as new (params?: ComponentParameters) => Component,
  },
]

const datasets: Array<ApplicationComponentDatasetData> = [
  {
    component: Newsletter as new (params?: ComponentParameters) => Component,
    selector: '[data-newsletter]',
  },
  {
    component: Parallax as new (params?: ComponentParameters) => Component,
    selector: '[data-parallax]',
  },
  {
    component: Paragraph as new (params?: ComponentParameters) => Component,
    selector: '[data-paragraph]',
  },
  {
    component: Reveal as new (params?: ComponentParameters) => Component,
    selector: '[data-reveal]',
  },
  {
    component: Source as new (params?: ComponentParameters) => Component,
    selector: '[data-src]',
  },
  {
    component: Title as new (params?: ComponentParameters) => Component,
    selector: '[data-title]',
  },
  {
    component: Translate as new (params?: ComponentParameters) => Component,
    selector: '[data-translate]',
  },

  {
    component: Categories as new (params?: ComponentParameters) => Component,
    selector: '.categories',
  },
  {
    component: Footer as new (params?: ComponentParameters) => Component,
    selector: '.footer',
  },
  {
    component: Hero as new (params?: ComponentParameters) => Component,
    selector: '.hero',
  },
  {
    component: List as new (params?: ComponentParameters) => Component,
    selector: '.list',
  },
  {
    component: Media as new (params?: ComponentParameters) => Component,
    selector: '.media',
  },
  {
    component: Shop as new (params?: ComponentParameters) => Component,
    selector: '.shop',
  },
]

const routes: Array<ApplicationRoute> = [
  {
    component: Standard as new (params?: PageParameters) => Page,
    template: 'page',
  },
]

Application.initRoutes(routes)
Application.initSprites()

document.fonts.ready.then(() => {
  document.documentElement.classList.add('loaded')

  Application.initDatasets(datasets)
  Application.initPage()

  Application.initComponents(components)
})
