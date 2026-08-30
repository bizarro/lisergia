import { defineField, defineType } from 'sanity'

import { imageConfiguration } from '../shared/image'

export const intro = defineType({
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      ...imageConfiguration,
    }),

    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
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
  name: 'intro',
  title: 'Intro',
  type: 'object',
})
