import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'learningTrackCard',
  title: 'Learning Track Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'richText',
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      description: 'Difficulty level used for the card styling and label.',
      options: {
        list: [
          {title: 'Beginner', value: 'Beginner'},
          {title: 'Intermediate', value: 'Intermediate'},
          {title: 'Advanced', value: 'Advanced'},
        ],
        layout: 'radio',
      },
      initialValue: 'Beginner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
      description:
        'Optional external URL for this track. Explore now filters graph nodes, so this link is optional metadata.',
    }),
    defineField({
      name: 'nodes',
      title: 'Track Nodes',
      description:
        'Select the knowledge graph nodes that belong to this track. If empty, frontend falls back to the selected level.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'knowledgeGraphNode'}]}],
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
      subtitle: 'level',
    },
  },
})
