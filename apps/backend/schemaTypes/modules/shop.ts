import { defineArrayMember, defineField, defineType } from 'sanity'

export const shop = defineType({
  fields: [
    defineField({
      name: 'list',
      of: [
        defineArrayMember({
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'reference',
              to: [{ type: 'category' }],
            }),

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
                              { title: 'Product', value: 'product' },
                            ],
                          },
                        }),

                        defineField({
                          name: 'product',
                          title: 'Product',
                          to: [{ type: 'product' }],
                          type: 'reference',
                          hidden: ({ parent }) => parent?.type !== 'product',
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
  name: 'shop',
  title: 'Shop',
  type: 'object',
})
