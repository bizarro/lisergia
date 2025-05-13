import { defineArrayMember, defineField, defineType } from 'sanity'

export const contact = defineType({
  fields: [
    defineField({
      name: 'list',
      of: [
        defineArrayMember({
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
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
          ],
          name: 'entry',
          title: 'Entry',
          type: 'object',
        }),
      ],
      type: 'array',
    }),
  ],
  name: 'contact',
  title: 'Contact',
  type: 'object',
})
