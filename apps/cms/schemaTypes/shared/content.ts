import { defineArrayMember, defineType } from 'sanity'

export const content = defineType({
  name: 'content',
  of: [
    defineArrayMember({
      name: 'categories',
      type: 'categories',
    }),
    defineArrayMember({
      name: 'hero',
      type: 'hero',
    }),
    defineArrayMember({
      name: 'highlight',
      type: 'highlight',
    }),
    defineArrayMember({
      name: 'ingredients',
      type: 'ingredients',
    }),
    defineArrayMember({
      name: 'list',
      type: 'list',
    }),
    defineArrayMember({
      name: 'media',
      type: 'media',
    }),
    defineArrayMember({
      name: 'quote',
      type: 'quote',
    }),
  ],
  title: 'Content',
  type: 'array',
})
