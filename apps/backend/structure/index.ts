import { CogIcon } from '@sanity/icons/Cog'
import { DocumentsIcon } from '@sanity/icons/Documents'
import { TiersIcon } from '@sanity/icons/Tiers'
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Lisergia')
    .items([
      S.documentTypeListItem('category').title('Categories').icon(DocumentsIcon),
      S.documentTypeListItem('product').title('Products').icon(DocumentsIcon),
      S.documentTypeListItem('page').title('Pages').icon(TiersIcon),

      S.listItem().title('Menu').id('menu').child(S.document().schemaType('menu').documentId('menu')).icon(CogIcon),

      S.listItem()
        .title('Footer')
        .id('footer')
        .child(S.document().schemaType('footer').documentId('footer'))
        .icon(CogIcon),

      S.listItem()
        .title('Settings')
        .id('settings')
        .child(S.document().schemaType('settings').documentId('settings'))
        .icon(CogIcon),
    ])
