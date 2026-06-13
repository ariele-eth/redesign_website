import {createElement} from 'react'
import {defineArrayMember, defineField, defineType} from 'sanity'

function getSocialPreviewMedia(platform?: string) {
  if ((platform ?? '').trim().toLowerCase() !== 'x') {
    return undefined
  }

  return createElement(
    'svg',
    {
      'aria-hidden': true,
      viewBox: '0 0 24 24',
      width: 18,
      height: 18,
      fill: 'currentColor',
    },
    createElement('path', {
      d: 'M18.244 2H21l-6.56 7.497L22 22h-5.828l-4.563-6.247L6.14 22H3.38l7.016-8.018L2 2h5.976l4.124 5.659L18.244 2Zm-.968 18h1.527L7.148 3.898H5.51z',
    }),
  )
}

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
                media: getSocialPreviewMedia(label),
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
