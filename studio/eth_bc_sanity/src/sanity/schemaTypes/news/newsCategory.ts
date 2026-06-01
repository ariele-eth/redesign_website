import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsCategory',
  title: 'News Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
