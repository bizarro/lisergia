import { defineField, defineType } from 'sanity'

export const hero = defineType({
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
      name: 'button',
      title: 'Button',
      type: 'link',
    }),
  ],
  name: 'hero',
  title: 'Hero',
  type: 'object',
})
