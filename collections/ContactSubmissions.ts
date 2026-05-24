import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/lib/access'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
    group: 'Inbox',
    useAsTitle: 'name',
  },
  access: {
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone (optional)',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Closed', value: 'closed' },
      ],
      required: true,
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => siblingData?.status !== 'new',
      },
    },
  ],
}
