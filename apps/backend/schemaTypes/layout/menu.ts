import { defineArrayMember, defineField, defineType } from 'sanity'

export const menu = defineType({
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'list',
      of: [
        defineArrayMember({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
      type: 'array',
    }),

    defineField({
      name: 'sublist',
      of: [
        defineArrayMember({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
      type: 'array',
    }),
  ],
  name: 'menu',
  title: 'Menu',
  type: 'document',
})
