import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'quickUpdateCategory',
  title: 'Quick Update Category',
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
