import { defineField, defineType } from 'sanity'

export const marquee = defineType({
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
  name: 'marquee',
  title: 'Marquee',
  type: 'object',
})
