import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'educationStartHere',
  title: 'Education Start Here',
  type: 'document',
  fields: [
    defineField({
      name: 'entries',
      title: 'Start Here Entries',
      description:
        'Pick specific knowledge graph nodes and optionally target a specific resource title from that node.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Card Label (optional)',
              type: 'string',
              description:
                'If empty, the selected resource title (or node title) is used.',
            }),
            defineField({
              name: 'node',
              title: 'Knowledge Node',
              type: 'reference',
              to: [{type: 'knowledgeGraphNode'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'resourceTitle',
              title: 'Resource Title (optional)',
              type: 'string',
              description:
                'Optional exact resource title from the node. If blank, the first resource on the node is used.',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              nodeTitle: 'node.title',
              resourceTitle: 'resourceTitle',
            },
            prepare({title, nodeTitle, resourceTitle}) {
              return {
                title: title || resourceTitle || nodeTitle || 'Start Here Entry',
                subtitle: nodeTitle ? `Node: ${nodeTitle}` : 'Node not selected',
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(8),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Education Start Here',
      }
    },
  },
})

