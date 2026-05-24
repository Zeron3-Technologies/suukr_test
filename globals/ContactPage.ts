import type { GlobalConfig } from 'payload'

import { authenticated } from '@/lib/access'
import { heroFields, seoFields } from './shared'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
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
      name: 'formIntro',
      type: 'textarea',
      label: 'Form intro copy',
    },
    {
      name: 'recipientEmail',
      type: 'email',
      admin: {
        description: 'Optional future notification target for contact form emails.',
      },
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
