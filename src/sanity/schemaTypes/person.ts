import {defineField, defineType} from 'sanity'

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
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'socialLink'}],
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 4,
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
