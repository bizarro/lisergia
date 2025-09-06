import { defineType, defineField } from 'sanity'

export const category = defineType({
  type: 'document',
  name: 'category',
  fields: [
    defineField({
      name: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
