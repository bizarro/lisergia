import { defineField } from 'sanity'

export const imageConfiguration = {
  fields: [
    defineField({
      description:
        'Describe the image for people who cannot see it. Leave blank only when the image is purely decorative.',
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) => rule.required().warning('Alternative text improves accessibility and SEO.'),
    }),
  ],
  options: {
    hotspot: true,
  },
}
