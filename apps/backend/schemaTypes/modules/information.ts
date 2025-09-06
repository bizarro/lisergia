import { defineArrayMember, defineField, defineType } from 'sanity'

export const information = defineType({
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { value: 'left', title: 'Left' },
          { value: 'right', title: 'Right' },
        ],
      },
    }),

    defineField({
      name: 'description',
      of: [
        {
          type: 'block',
        },
      ],
      title: 'Description',
      type: 'array',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
  name: 'information',
  title: 'Information',
  type: 'object',
})
