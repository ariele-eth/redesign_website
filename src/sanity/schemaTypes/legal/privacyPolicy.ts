import {defineField, defineType} from 'sanity'

import {ptBullet, ptHeading, ptParagraph} from './legalDocumentHelpers'

export default defineType({
  name: 'privacyPolicy',
  title: 'Privacy Policy',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Privacy Policy',
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
        current: 'privacy-policy',
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
      validation: (Rule) => Rule.required(),
      initialValue: [
        ptParagraph(
          'This privacy policy explains how the ETH Blockchain Club collects, uses, and protects personal data submitted through https://eth-blockchain.org/ and other online forms associated with the ETH Blockchain Club. This document is based on the Swiss Federal Act on Data Protection (DSG, in force since September 1, 2023).'
        ),
        ptHeading('Collected Data'),
        ptParagraph('Data is collected through website forms, events, or other channels when you provide it.'),
        ptParagraph('The following data may be collected:'),
        ptBullet('Email address'),
        ptBullet('Name'),
        ptBullet('Address'),
        ptBullet('University and academic department'),
        ptBullet('Industry and experience'),
        ptBullet('Mobile number'),
        ptParagraph('Additional data may be collected depending on your role and interaction.'),
        ptHeading('Purpose of Data Processing'),
        ptParagraph('The collected data may be used for:'),
        ptBullet('Communication'),
        ptBullet('Application handling'),
        ptBullet('Spreading information about our events, activities, or mission'),
        ptParagraph(
          'The data is processed by committee members of our club. For more information about the members processing data, please contact us using the details below.'
        ),
        ptHeading('Data Sharing'),
        ptParagraph('Personal data will not be shared with third parties without explicit consent. Exceptions:'),
        ptParagraph(
          'Supabase: To keep our data organized, we use services provided by Supabase, Inc. (USA). This service is used to store and access data securely. Data can only be accessed by club members. As Supabase is based in the United States, your data may be transferred to and stored in the USA. Supabase maintains appropriate safeguards for such transfers. For further information, please refer to their privacy policy at https://supabase.com/privacy.'
        ),
        ptBullet('If required by law, legal process, or to protect the Club\'s legitimate interests.'),
        ptBullet(
          'If the data is needed to establish, exercise, or enforce legal claims before a court or other competent authority.'
        ),
        ptBullet(
          'If disclosure is necessary to protect the life or physical integrity of the data subject or a third party, and consent cannot be obtained in time.'
        ),
        ptHeading('Retention'),
        ptParagraph(
          'Your personal data will be retained as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.'
        ),
        ptHeading('Your Rights'),
        ptParagraph(
          'In accordance with the Swiss Federal Act on Data Protection (DSG), you have the right to:'
        ),
        ptBullet('Request confirmation of whether we hold or process any of your personal data.'),
        ptBullet('Obtain the identity and contact details of the responsible person within the club.'),
        ptBullet('Access your personal data.'),
        ptBullet('Request information about the duration for which we retain your personal data.'),
        ptBullet('Request the correction of inaccurate personal data.'),
        ptBullet('Request the deletion of your personal data.'),
        ptBullet(
          'Request the transfer of your personal data in a commonly used electronic format (data portability), where applicable.'
        ),
        ptBullet('Restrict or object to processing.'),
        ptBullet('Lodge a complaint with the Federal Data Protection and Information Commissioner (FDPIC).'),
        ptParagraph('To exercise your rights, please refer to our contacts below.'),
        ptHeading('Cookies and Tracking'),
        ptParagraph('Our website does not use any cookies or similar tracking technologies.'),
        ptHeading('Security'),
        ptParagraph(
          'We implement reasonable technical and organizational measures to protect your data. However, due to the inherent risks of online transmission, we cannot guarantee absolute security.'
        ),
        ptHeading('Contact'),
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
      title: title ?? 'Privacy Policy',
      subtitle: subtitle ? `Last updated: ${subtitle}` : 'No date set',
    }),
  },
})
