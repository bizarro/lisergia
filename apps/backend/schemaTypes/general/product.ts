import { defineField, defineType } from 'sanity'

export const product = defineType({
  fields: [
    defineField({
      name: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      title: 'Slug',
      type: 'slug',
    }),

    defineField({
      name: 'social',
      title: 'Social',
      type: 'social',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),

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
      name: 'price',
      title: 'Price',
      type: 'string',
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'content',
    }),
  ],
  name: 'product',
  title: 'Product',
  type: 'document',
})
