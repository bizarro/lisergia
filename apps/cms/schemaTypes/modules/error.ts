import { defineField, defineType } from 'sanity'

export const error = defineType({
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

    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),

    defineField({
      name: 'button',
      title: 'Button',
      type: 'link',
    }),
  ],
  name: 'error',
  title: 'Error',
  type: 'object',
})
