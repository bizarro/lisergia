import { defineField, defineType } from 'sanity'

export const social = defineType({
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
  ],
  name: 'social',
  title: 'Social',
  type: 'object',
})
