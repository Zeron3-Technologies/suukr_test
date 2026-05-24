import type { GlobalConfig } from 'payload'

import { authenticated } from '@/lib/access'
import { heroFields, seoFields } from './shared'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
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
      name: 'brandStory',
      type: 'richText',
      label: 'Brand story',
    },
    {
      name: 'philosophy',
      type: 'richText',
    },
    {
      name: 'behindTheScenes',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
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
