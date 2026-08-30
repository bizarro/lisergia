import { defineField, defineType } from 'sanity'

import { imageConfiguration } from '../shared/image'

export const error = defineType({
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
      name: 'description',
      title: 'Description',
      type: 'string',
    }),

    defineField({
      name: 'button',
      title: 'Button',
      type: 'link',
    }),
  ],
  name: 'error',
  title: 'Error',
  type: 'object',
})
