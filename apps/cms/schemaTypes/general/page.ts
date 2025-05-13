import { defineField, defineType } from 'sanity'

export const page = defineType({
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
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'content',
    }),
  ],
  name: 'page',
  title: 'Page',
  type: 'document',
})
