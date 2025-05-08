import { defineField, defineType } from 'sanity'

export const product = defineType({
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
    }),

    defineField({
      name: 'social',
      title: 'Social',
      type: 'social',
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'Content',
      title: 'Content',
      type: 'content',
    }),
  ],
  name: 'product',
  title: 'Product',
  type: 'document',
})
