import { defineArrayMember, defineField, defineType } from 'sanity'

import { imageConfiguration } from '../shared/image'

export const highlight = defineType({
  fields: [
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
  name: 'highlight',
  title: 'Highlight',
  type: 'object',
})
