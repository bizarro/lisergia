import { defineField, defineType } from 'sanity'

export const media = defineType({
  fields: [
    defineField({
      name: 'media',
      title: 'Media',
      type: 'file',
    }),
  ],
  name: 'media',
  title: 'Media',
  type: 'object',
})
