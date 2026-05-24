import type { GlobalConfig } from 'payload'

import { authenticated } from '@/lib/access'
import { heroFields, seoFields } from './shared'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: heroFields,
    },
    {
      name: 'signatureItems',
      type: 'relationship',
      hasMany: true,
      relationTo: 'menu-items',
    },
    {
      name: 'brandTeaser',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'body',
          type: 'richText',
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'gallery',
      type: 'relationship',
      hasMany: true,
      relationTo: 'media',
    },
    {
      name: 'seo',
      type: 'group',
      fields: seoFields,
    },
  ],
  versions: {
    drafts: true,
  },
}
