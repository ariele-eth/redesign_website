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
      name: 'collaborators',
      title: 'Industry Collaborators',
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
      name: 'teamMembers',
      title: 'Team Members',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'partners',
      title: 'Legacy Industry Partners',
      type: 'number',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'builders',
      title: 'Legacy Builders',
      type: 'number',
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'members',
      subtitle: 'teamMembers',
      legacySubtitle: 'builders',
    },
    prepare: ({ title, subtitle, legacySubtitle }) => ({
      title: 'Site Stats',
      subtitle: `Members: ${title ?? '--'} · Team Members: ${subtitle ?? legacySubtitle ?? '--'}`,
    }),
  },
})
