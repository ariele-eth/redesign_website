import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteStats',
  title: 'Site Stats',
  type: 'document',
  fields: [
    defineField({
      name: 'members',
      title: 'Active Members',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'events',
      title: 'Events Per Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'partners',
      title: 'Industry Partners',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'committees',
      title: 'Active Committees',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'builders',
      title: 'Active Builders',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'members',
      subtitle: 'builders',
    },
    prepare: ({ title, subtitle }) => ({
      title: 'Site Stats',
      subtitle: `Members: ${title ?? '--'} · Builders: ${subtitle ?? '--'}`,
    }),
  },
})
