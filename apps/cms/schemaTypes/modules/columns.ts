import { defineArrayMember, defineField, defineType } from 'sanity'

export const columns = defineType({
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
      name: 'description',
      title: 'Description',
      type: 'string',
    }),

    defineField({
      name: 'list',
      of: [
        defineArrayMember({
          name: 'image',
          title: 'Image',
          type: 'image',
        }),
      ],
      type: 'array',
    }),
  ],
  name: 'columns',
  title: 'Columns',
  type: 'object',
})
