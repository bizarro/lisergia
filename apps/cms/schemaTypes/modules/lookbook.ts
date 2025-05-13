import { defineArrayMember, defineField, defineType } from 'sanity'

export const lookbook = defineType({
  fields: [
    defineField({
      name: 'list',
      of: [
        defineArrayMember({
          fields: [
            defineField({
              name: 'content',
              of: [
                defineArrayMember({
                  fields: [
                    defineField({
                      fields: [
                        defineField({
                          name: 'type',
                          title: 'Type',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Image', value: 'image' },
                              { title: 'Text', value: 'text' },
                            ],
                          },
                        }),

                        defineField({
                          of: [
                            {
                              type: 'block',
                            },
                          ],
                          name: 'title',
                          title: 'Title',
                          type: 'array',
                          hidden: ({ parent }) => parent?.type !== 'text',
                        }),

                        defineField({
                          name: 'image',
                          title: 'Image',
                          type: 'image',
                          hidden: ({ parent }) => parent?.type !== 'image',
                        }),
                      ],
                      name: 'entry',
                      title: 'Entry',
                      type: 'object',
                    }),
                  ],
                  name: 'item',
                  title: 'Item',
                  type: 'object',
                }),
              ],
              type: 'array',
            }),
          ],
          name: 'item',
          title: 'Item',
          type: 'object',
        }),
      ],
      type: 'array',
    }),
  ],
  name: 'lookbook',
  title: 'Lookbook',
  type: 'object',
})
