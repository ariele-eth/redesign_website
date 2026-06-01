import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'eventType',
  title: 'Event Type',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Type Name',
      description: 'e.g., Workshop, Panel, Hackathon',
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
  ],
})