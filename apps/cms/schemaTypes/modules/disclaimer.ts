import { defineField, defineType } from 'sanity'

export const disclaimer = defineType({
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),

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
  ],
  name: 'disclaimer',
  title: 'Disclaimer',
  type: 'object',
})
