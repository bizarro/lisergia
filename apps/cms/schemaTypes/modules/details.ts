import { defineArrayMember, defineField, defineType } from 'sanity'

export const details = defineType({
  fields: [
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
      name: 'gallery',
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
  name: 'details',
  title: 'Details',
  type: 'object',
})
