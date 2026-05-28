import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'educationResource',
  title: 'Education Resource',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Resource Type',
      description: 'e.g., PDF, Slides, Presentation',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        storeOriginalFilename: true,
      },
    }),
    defineField({
      name: 'url',
      title: 'External URL',
      type: 'url',
    }),
    defineField({
      name: 'storageUrl',
      title: 'Storage URL (auto)',
      type: 'url',
      readOnly: true,
      hidden: true,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value?.file && !value?.url) {
        return 'Add a file or an external URL.'
      }
      return true
    }),
  preview: {
    select: {
      title: 'title',
      subtitle: 'kind',
    },
  },
})
