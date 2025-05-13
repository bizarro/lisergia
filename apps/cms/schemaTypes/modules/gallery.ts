import { defineArrayMember, defineField, defineType } from 'sanity'

export const gallery = defineType({
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
})
