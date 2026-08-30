import { defineArrayMember, defineField, defineType } from 'sanity'

import { imageConfiguration } from '../shared/image'

export const categories = defineType({
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
      name: 'list',
      of: [
        defineArrayMember({
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              ...imageConfiguration,
            }),

            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
          title: 'Entry',
          type: 'object',
        }),
      ],
      type: 'array',
    }),
  ],
  name: 'categories',
  title: 'Categories',
  type: 'object',
})
