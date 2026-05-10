import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      description: 'e.g., Announcement, Research, Industry',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})