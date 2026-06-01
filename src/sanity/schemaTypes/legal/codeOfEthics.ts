import {defineField, defineType} from 'sanity'

import {ptHeading, ptParagraph} from './legalDocumentHelpers'

export default defineType({
  name: 'codeOfEthics',
  title: 'Code of Ethics',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Terms of Use',
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
        current: 'terms-of-use',
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
      validation: (Rule) => Rule.required(),
      initialValue: [
        ptParagraph(
          'The ETH Blockchain Club is a student initiative at ETH Zurich dedicated to promoting blockchain technology, Web3, and digital innovation. We provide information on our activities, events, projects, and educational content on our website.'
        ),
        ptParagraph('ETH Blockchain Club'),
        ptParagraph('c/o ETH Zurich'),
        ptParagraph('Postfach 58'),
        ptParagraph('Raemistrasse 101'),
        ptParagraph('8092 Zurich'),
        ptParagraph('Email: contact@eth-blockchain.org'),
        ptHeading('Liability and Accuracy'),
        ptParagraph(
          'The ETH Blockchain Club assumes no liability whatsoever with regard to the correctness, accuracy, up-to-dateness, reliability, and completeness of the information provided. Liability claims regarding damage caused by the use of any information provided, including any kind of information which is incomplete or incorrect, will therefore be rejected.'
        ),
        ptParagraph(
          'All offers are non-binding. The ETH Blockchain Club expressly reserves the right to change, supplement, delete or temporarily or permanently cease publication of parts of the pages or the entire website without prior notice.'
        ),
        ptParagraph(
          'References and links to third-party websites are outside our area of responsibility. We decline any responsibility for such websites. Access to and use of such websites is at the user\'s own risk.'
        ),
        ptParagraph(
          'The copyrights and all other rights to the content, images, photos or other files on the website belong exclusively to the ETH Blockchain Club or the specifically named rights holders. Our written consent must be obtained for the reproduction of any elements.'
        ),
        ptHeading('Educational Content and Downloads'),
        ptParagraph(
          'The educational content available on the website (for example, presentations, texts, and videos) is intended solely for personal, non-commercial educational purposes. It does not replace professional advice (for example, legal, tax, or financial). Distribution, modification, or commercial use is prohibited without our written consent.'
        ),
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
      title: title ?? 'Terms of Use',
      subtitle: subtitle ? `Last updated: ${subtitle}` : 'No date set',
    }),
  },
})
