import { defineArrayMember, defineField, defineType } from 'sanity'

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
        }),
      ],
      type: 'array',
    }),
  ],
  name: 'quote',
  title: 'Quote',
  type: 'object',
})
