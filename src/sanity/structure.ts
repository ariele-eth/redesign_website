import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Legal Documents')
        .child(
          S.list()
            .title('Legal Documents')
            .items([
              S.listItem()
                .title('Privacy Policy')
                .child(S.document().schemaType('privacyPolicy').documentId('privacyPolicy')),
              S.listItem()
                .title('Impressum')
                .child(S.document().schemaType('impressum').documentId('impressum')),
              S.listItem()
                .title('Code of Ethics')
                .child(S.document().schemaType('codeOfEthics').documentId('codeOfEthics')),
            ])
        ),
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return id !== 'privacyPolicy' && id !== 'impressum' && id !== 'codeOfEthics'
      }),
    ])
