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
  ],
})