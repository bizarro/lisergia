import { defineArrayMember, defineField, defineType } from 'sanity'

export const footer = defineType({
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
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
    }),

    defineField({
      name: 'credits',
      of: [
        {
          type: 'block',
        },
      ],
      title: 'Credits',
      type: 'array',
    }),
  ],
  name: 'footer',
  title: 'Footer',
  type: 'document',
})
