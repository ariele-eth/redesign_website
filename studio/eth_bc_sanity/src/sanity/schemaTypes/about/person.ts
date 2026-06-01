import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'groups',
      title: 'Groups',
      description: 'Assign the person to one or more committees only.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'committee'}],
          options: {
            filter: 'groupType != $boardType',
            filterParams: {boardType: 'board'},
          },
        },
      ],
    }),
    defineField({
      name: 'committee',
      title: 'Committee',
      description: 'Legacy single-group link. Prefer Groups for new entries.',
      type: 'reference',
      to: [{type: 'committee'}],
      options: {
        filter: 'groupType != $boardType',
        filterParams: {boardType: 'board'},
      },
    }),
    defineField({
      name: 'isBoardMember',
      title: 'Board Member',
      description: 'Enable for people who are part of the Board.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      description: 'Add platform links that will appear as clickable icons on the person card.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'X', value: 'x'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'Telegram', value: 'telegram'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Website', value: 'website'},
                  {title: 'Other', value: 'other'},
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
            prepare({title, subtitle}) {
              const label = typeof title === 'string' && title.trim() ? title : 'social'
              return {
                title: label.charAt(0).toUpperCase() + label.slice(1),
                subtitle: subtitle ?? '',
              }
            },
          },
        }),
      ],
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
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
