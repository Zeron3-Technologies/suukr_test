import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/lib/access'

export const MenuCategories: CollectionConfig = {
  slug: 'menu-categories',
  admin: {
    defaultColumns: ['title', 'slug', 'sortOrder', 'isActive'],
    group: 'Menu',
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
      type: 'text',
      admin: {
        description: 'Stable identifier for filters and URLs, for example classic-shake.',
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show on website',
    },
  ],
}
