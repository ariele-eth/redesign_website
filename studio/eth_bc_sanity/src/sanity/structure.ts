import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(
          S.list()
            .title('Home Page')
            .items([
              S.documentTypeListItem('siteStats').title('Site Stats'),
            ])
        ),
      S.listItem()
        .title('About Page')
        .child(
          S.list()
            .title('About Page')
            .items([
              S.documentTypeListItem('committee').title('Committees'),
              S.documentTypeListItem('person').title('People'),
            ])
        ),
      S.listItem()
        .title('Collaborate Page')
        .child(
          S.list()
            .title('Collaborate Page')
            .items([
              S.documentTypeListItem('partner').title('Partners'),
              S.documentTypeListItem('advisor').title('Advisors'),
            ])
        ),
      S.listItem()
        .title('Education')
        .child(
          S.list()
            .title('Education')
            .items([
              S.listItem()
                .title('Start Here')
                .child(
                  S.document()
                    .schemaType('educationStartHere')
                    .documentId('educationStartHere')
                ),
              S.documentTypeListItem('knowledgeGraphNode').title('Knowledge Graph Nodes'),
              S.documentTypeListItem('learningTrackCard').title('Learning Track Cards'),
            ])
        ),
      S.listItem()
        .title('Events Page')
        .child(
          S.list()
            .title('Events Page')
            .items([
              S.documentTypeListItem('event').title('Events'),
              S.documentTypeListItem('eventType').title('Event Types'),
            ])
        ),
      S.listItem()
        .title('News Page')
        .child(
          S.list()
            .title('News Page')
            .items([
              S.documentTypeListItem('news').title('News Posts'),
              S.documentTypeListItem('quickUpdate').title('Quick Updates'),
              S.documentTypeListItem('newsCategory').title('News Categories'),
              S.documentTypeListItem('quickUpdateCategory').title('Quick Update Categories'),
              S.documentTypeListItem('category').title('Generic Categories'),
            ])
        ),
      S.listItem()
        .title('Join Page')
        .child(
          S.list()
            .title('Join Page')
            .items([
              S.documentTypeListItem('openPosition').title('Open Positions'),
            ])
        ),
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
      S.listItem()
        .title('Other Content')
        .child(
          S.list()
            .title('Other Content')
            .items(
              S.documentTypeListItems().filter((listItem) => {
                const id = listItem.getId()
                return (
                  id !== 'siteStats' &&
                  id !== 'committee' &&
                  id !== 'person' &&
                  id !== 'partner' &&
                  id !== 'advisor' &&
                  id !== 'educationStartHere' &&
                  id !== 'knowledgeGraphNode' &&
                  id !== 'learningTrackCard' &&
                  id !== 'event' &&
                  id !== 'eventType' &&
                  id !== 'news' &&
                  id !== 'quickUpdate' &&
                  id !== 'newsCategory' &&
                  id !== 'quickUpdateCategory' &&
                  id !== 'category' &&
                  id !== 'openPosition' &&
                  id !== 'privacyPolicy' &&
                  id !== 'impressum' &&
                  id !== 'codeOfEthics'
                )
              })
            )
        ),
    ])
