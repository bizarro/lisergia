import { defineDocuments, defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

const mainDocuments = defineDocuments([
  {
    route: '/',
    filter: `_type == "page" && slug.current == "home"`,
  },
  {
    route: '/product/:slug',
    filter: `_type == "product" && slug.current == $slug`,
  },
  {
    route: '/:slug',
    filter: `_type == "page" && slug.current == $slug`,
  },
])

const locations: NonNullable<PresentationPluginOptions['resolve']>['locations'] = {
  page: defineLocations({
    select: {
      slug: 'slug.current',
      title: 'title',
    },
    resolve: (document) => ({
      locations: [
        {
          href: document?.slug === 'home' ? '/' : `/${document?.slug}`,
          title: document?.title || 'Untitled page',
        },
      ],
    }),
  }),
  product: defineLocations({
    select: {
      slug: 'slug.current',
      title: 'title',
    },
    resolve: (document) => ({
      locations: [
        {
          href: `/product/${document?.slug}`,
          title: document?.title || 'Untitled product',
        },
      ],
    }),
  }),
}

export const resolve: PresentationPluginOptions['resolve'] = {
  locations,
  mainDocuments,
}
