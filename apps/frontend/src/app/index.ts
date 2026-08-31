import '../styles/index.scss'

import { configure } from 'mobx'

configure({
  enforceActions: 'never',
})

import {
  Application,
  type ApplicationComponentData,
  type ApplicationComponentDatasetData,
  type ApplicationRoute,
  type Component,
  type ComponentParameters,
  type Page,
  type PageParameters,
} from '@lisergia/core'

import createAsyncDataset from './AsyncDataset'
import Menu from './components/Menu'
import Navigation from './components/Navigation'
import Transition from './components/Transition'
import Source from './datasets/Source'

import Standard from './templates/Standard'

const Newsletter = createAsyncDataset(() => import('./datasets/Newsletter'))
const Paragraph = createAsyncDataset(() => import('./datasets/Paragraph'))
const Parallax = createAsyncDataset(() => import('./datasets/Parallax'))
const Reveal = createAsyncDataset(() => import('./datasets/Reveal'))
const Title = createAsyncDataset(() => import('./datasets/Title'))
const Translate = createAsyncDataset(() => import('./datasets/Translate'))

const Categories = createAsyncDataset(() => import('./datasets/sections/Categories'))
const Details = createAsyncDataset(() => import('./datasets/sections/Details'))
const Footer = createAsyncDataset(() => import('./datasets/sections/Footer'))
const Hero = createAsyncDataset(() => import('./datasets/sections/Hero'))
const List = createAsyncDataset(() => import('./datasets/sections/List'))
const Marquee = createAsyncDataset(() => import('./datasets/sections/Marquee'))
const Media = createAsyncDataset(() => import('./datasets/sections/Media'))
const Seasons = createAsyncDataset(() => import('./datasets/sections/Seasons'))
const Shop = createAsyncDataset(() => import('./datasets/sections/Shop'))

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
    component: Details as new (params?: ComponentParameters) => Component,
    selector: '.details',
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
    component: Marquee as new (params?: ComponentParameters) => Component,
    selector: '.marquee',
  },
  {
    component: Media as new (params?: ComponentParameters) => Component,
    selector: '.media',
  },
  {
    component: Seasons as new (params?: ComponentParameters) => Component,
    selector: '.seasons',
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

Application.initDatasets(datasets)
Application.initPage()

Application.initComponents(components)

if (document.documentElement.dataset.sanityPreview === 'true') {
  void import('./preview')
}
