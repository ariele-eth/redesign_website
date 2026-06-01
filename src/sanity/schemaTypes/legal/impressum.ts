import {defineField, defineType} from 'sanity'

import {ptParagraph} from './legalDocumentHelpers'

export default defineType({
  name: 'impressum',
  title: 'Impressum',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Impressum',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
      initialValue: {
        current: 'impressum',
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
      validation: (Rule) => Rule.required(),
      initialValue: [
        ptParagraph('ETH Blockchain Club'),
        ptParagraph('c/o ETH Zurich'),
        ptParagraph('Postfach 58'),
        ptParagraph('Raemistrasse 101'),
        ptParagraph('8092 Zurich'),
        ptParagraph('Email: contact@eth-blockchain.org'),
      ],
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      validation: (Rule) => Rule.required(),
      initialValue: '2026-04-06',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'lastUpdated',
    },
    prepare: ({title, subtitle}) => ({
      title: title ?? 'Impressum',
      subtitle: subtitle ? `Last updated: ${subtitle}` : 'No date set',
    }),
  },
})
