import { defineArrayMember, defineField, defineType } from 'sanity'

import { imageConfiguration } from '../shared/image'

export const quote = defineType({
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
    }),

    defineField({
      name: 'list',
      of: [
        defineArrayMember({
          name: 'image',
          title: 'Image',
          type: 'image',
          ...imageConfiguration,
        }),
      ],
      type: 'array',
    }),
  ],
  name: 'quote',
  title: 'Quote',
  type: 'object',
})
