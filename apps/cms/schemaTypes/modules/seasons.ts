import { defineArrayMember, defineField, defineType } from 'sanity'

export const seasons = defineType({
  fields: [
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
      name: 'label',
      title: 'Label',
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
  name: 'seasons',
  title: 'Seasons',
  type: 'object',
})
