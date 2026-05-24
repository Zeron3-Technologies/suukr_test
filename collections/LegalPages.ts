import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/lib/access'

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    defaultColumns: ['title', 'slug', 'jurisdiction', 'effectiveDate'],
    group: 'Content',
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'select',
      options: [
        { label: 'Privacy Policy', value: 'privacy-policy' },
        { label: 'Terms & Conditions', value: 'terms' },
      ],
      required: true,
      unique: true,
    },
    {
      name: 'jurisdiction',
      type: 'select',
      defaultValue: 'australia',
      options: [{ label: 'Australia', value: 'australia' }],
      required: true,
    },
    {
      name: 'effectiveDate',
      type: 'date',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 180,
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
