import { defineField, defineType } from 'sanity'

import { imageConfiguration } from './image'

export const social = defineType({
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
  ],
  name: 'social',
  title: 'Social',
  type: 'object',
})
