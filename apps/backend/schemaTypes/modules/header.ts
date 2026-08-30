import { defineField, defineType } from 'sanity'

import { imageConfiguration } from '../shared/image'

export const header = defineType({
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      ...imageConfiguration,
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
  name: 'header',
  title: 'Header',
  type: 'object',
})
