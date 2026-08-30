import { defineArrayMember, defineField, defineType } from 'sanity'

import { imageConfiguration } from '../shared/image'

export const details = defineType({
  fields: [
    defineField({
      name: 'description',
      of: [
        {
          type: 'block',
        },
      ],
      title: 'Description',
      type: 'array',
    }),

    defineField({
      name: 'gallery',
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
  name: 'details',
  title: 'Details',
  type: 'object',
})
