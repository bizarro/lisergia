import { defineField, defineType } from 'sanity'

export const header = defineType({
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
  name: 'header',
  title: 'Header',
  type: 'object',
})
