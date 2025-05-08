import { defineField, defineType } from 'sanity'

export const link = defineType({
  fields: [
    defineField({
      name: 'text',
      type: 'string',
    }),

    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto'],
        }),
    }),
  ],
  name: 'link',
  title: 'Link',
  type: 'object',
})
