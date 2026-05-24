import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/lib/access'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    defaultColumns: ['name', 'category', 'price', 'tag', 'isAvailable'],
    group: 'Menu',
    useAsTitle: 'name',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Optional URL-safe item slug.',
      },
      index: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'menu-categories',
      required: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description:
          'Cloudinary delivery URL used by the website. This can be set directly for already-uploaded images.',
      },
      label: 'Image URL',
    },
    {
      name: 'gallery',
      type: 'relationship',
      hasMany: true,
      relationTo: 'media',
    },
    {
      name: 'tag',
      type: 'select',
      options: [
        'Signature',
        'Bestseller',
        "Chef's Pick",
        'Fan Fave',
        'Limited',
        'New',
        'Pre-order',
      ],
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        description: 'AUD price. Leave blank if price is managed only in Square.',
        step: 0.01,
      },
    },
    {
      name: 'dietaryTags',
      type: 'select',
      hasMany: true,
      label: 'Dietary tags',
      options: ['Eggless', 'Gluten-free', 'Dairy-free', 'Vegan', 'Contains nuts'],
    },
    {
      name: 'isSignature',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature as signature item',
    },
    {
      name: 'isAvailable',
      type: 'checkbox',
      defaultValue: true,
      label: 'Available on website',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
    {
      name: 'square',
      type: 'group',
      admin: {
        description: 'Ready for Square POS catalogue integration.',
      },
      fields: [
        {
          name: 'catalogObjectId',
          type: 'text',
          label: 'Catalog object ID',
        },
        {
          name: 'variationId',
          type: 'text',
          label: 'Variation ID',
        },
        {
          name: 'lastSyncedAt',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
      ],
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
        {
          name: 'openGraphImage',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
