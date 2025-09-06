import { defineArrayMember, defineField, defineType } from 'sanity'

export const list = defineType({
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
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
      name: 'button',
      title: 'Button',
      type: 'link',
    }),
  ],
  name: 'list',
  title: 'List',
  type: 'object',
})
