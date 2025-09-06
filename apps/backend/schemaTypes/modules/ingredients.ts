import { defineArrayMember, defineField, defineType } from 'sanity'

export const ingredients = defineType({
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),

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
              name: 'region',
              title: 'Region',
              type: 'string',
            }),

            defineField({
              name: 'ingredient',
              title: 'Ingredient',
              type: 'string',
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
  name: 'ingredients',
  title: 'Ingredients',
  type: 'object',
})
