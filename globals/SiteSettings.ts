import type { GlobalConfig } from 'payload'

import { authenticated } from '@/lib/access'
import { linkFields } from './shared'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'brand',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Suükr',
          required: true,
        },
        {
          name: 'tagline',
          type: 'text',
        },
        {
          name: 'logo',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      fields: linkFields,
    },
    {
      name: 'footerLinks',
      type: 'array',
      fields: linkFields,
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'instagramHandle',
          type: 'text',
        },
        {
          name: 'instagramUrl',
          type: 'text',
        },
        {
          name: 'tiktokUrl',
          type: 'text',
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
