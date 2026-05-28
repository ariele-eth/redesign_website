import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'newsCategory'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'previewText',
      title: 'Short Preview Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document as {externalLink?: string} | undefined
          if (!value && !document?.externalLink) {
            return 'Provide content or an external link.'
          }
          return true
        }),
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Optional. Use when linking to an external article.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      description: 'Optional override for manual ordering.',
      type: 'number',
    }),
    defineField({
      name: 'isVisible',
      title: 'Visible',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
})
