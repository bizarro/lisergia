import { defineField, defineType } from 'sanity'

import { imageConfiguration } from '../shared/image'

export const hero = defineType({
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

    defineField({
      name: 'button',
      title: 'Button',
      type: 'link',
    }),
  ],
  name: 'hero',
  title: 'Hero',
  type: 'object',
})
