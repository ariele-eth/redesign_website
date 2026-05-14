import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'knowledgeGraphNode',
  title: 'Knowledge Graph Node',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Node Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'popupContent',
      title: 'Popup Content',
      type: 'richText',
    }),
    defineField({
      name: 'connections',
      title: 'Connected Nodes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'knowledgeGraphNode'}]}],
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [{type: 'educationResource'}],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      description: 'Lower numbers show first.',
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
      subtitle: 'slug.current',
    },
  },
})
