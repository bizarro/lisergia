import { defineArrayMember, defineType } from 'sanity'

export const content = defineType({
  name: 'content',
  of: [
    defineArrayMember({
      name: 'categories',
      type: 'categories',
    }),
    defineArrayMember({
      name: 'columns',
      type: 'columns',
    }),
    defineArrayMember({
      name: 'contact',
      type: 'contact',
    }),
    defineArrayMember({
      name: 'details',
      type: 'details',
    }),
    defineArrayMember({
      name: 'disclaimer',
      type: 'disclaimer',
    }),
    defineArrayMember({
      name: 'gallery',
      type: 'gallery',
    }),
    defineArrayMember({
      name: 'header',
      type: 'header',
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
      name: 'information',
      type: 'information',
    }),
    defineArrayMember({
      name: 'ingredients',
      type: 'ingredients',
    }),
    defineArrayMember({
      name: 'intro',
      type: 'intro',
    }),
    defineArrayMember({
      name: 'list',
      type: 'list',
    }),
    defineArrayMember({
      name: 'lookbook',
      type: 'lookbook',
    }),
    defineArrayMember({
      name: 'marquee',
      type: 'marquee',
    }),
    defineArrayMember({
      name: 'media',
      type: 'media',
    }),
    defineArrayMember({
      name: 'quote',
      type: 'quote',
    }),
    defineArrayMember({
      name: 'seasons',
      type: 'seasons',
    }),
    defineArrayMember({
      name: 'shop',
      type: 'shop',
    }),
  ],
  title: 'Content',
  type: 'array',
})
