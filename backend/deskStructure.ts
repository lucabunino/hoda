import { CogIcon } from '@sanity/icons'
import { HomeIcon } from '@sanity/icons'
import {TranslateIcon} from '@sanity/icons'

export const myStructure = (S) => {
  const customListItems = [
    // S.listItem()
    //   .title('Homepage')
    //   .icon(HomeIcon)
    //   .child(S.document().schemaType('homepage').documentId('homepage')),
    // S.listItem()
    //   .title('Suites')
    //   .child(
    //     S.documentTypeList('suites')
    //       .title('Suites')
    //       .child(documentId =>
    //         S.document()
    //           .documentId(documentId)
    //           .schemaType('suites')
    //       )
    //   ),
    // S.listItem()
    //   .title('Piatti')
    //   .child(
    //     S.documentTypeList('dish')
    //       .title('Piatti')
    //       .child(documentId =>
    //         S.document()
    //           .documentId(documentId)
    //           .schemaType('dish')
    //       )
    //   ),
    // S.listItem()
    //   .title('Allergeni')
    //   .child(
    //     S.documentTypeList('allergen')
    //       .title('Allergeni')
    //       .child(documentId =>
    //         S.document()
    //           .documentId(documentId)
    //           .schemaType('allergen')
    //       )
    //   ),
    S.divider(),
    S.listItem()
      .title('Pages')
      .icon(HomeIcon)
      .child(S.document().schemaType('page').documentId('page').title('Pages')),
    S.listItem()
      .title('Site Settings')
      .icon(CogIcon)
      .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    S.listItem()
      .title('Translation Metadata')
      .icon(TranslateIcon)
      .child(S.document().schemaType('translation.metadata').documentId('translation.metadata').title('Translation Metadata')),
  ];

  // Filter out document types that are already included in customListItems
  const otherListItems = S.documentTypeListItems().filter(listItem => {
    const includedDocumentTypes = ['page', 'siteSettings', 'media.tag', 'translation.metadata'];
    return !includedDocumentTypes.includes(listItem.getId());
  });

  return S.list()
    .title('Base')
    .items([
      ...otherListItems,
      ...customListItems,
    ]);
};
