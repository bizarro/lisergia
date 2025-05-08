import { defineArrayMember, defineField, defineType } from 'sanity'

export const settings = defineType({
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),

        defineField({
          name: 'placeholder',
          title: 'Placeholder',
          type: 'string',
        }),

        defineField({
          name: 'submit',
          title: 'Submit',
          type: 'string',
        }),
      ],
      name: 'newsletter',
      title: 'Newsletter',
      type: 'object',
    }),

    defineField({
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
      ],
      name: 'social',
      title: 'Social',
      type: 'object',
    }),
  ],
  name: 'settings',
  title: 'Settings',
  type: 'document',
})
