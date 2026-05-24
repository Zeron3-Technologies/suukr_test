import type { GlobalConfig } from 'payload'

import { authenticated } from '@/lib/access'
import { heroFields, seoFields } from './shared'

export const LocationPage: GlobalConfig = {
  slug: 'location-page',
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
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'line1',
          type: 'text',
          required: true,
        },
        {
          name: 'line2',
          type: 'text',
        },
        {
          name: 'suburb',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'postcode',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
          defaultValue: 'Australia',
        },
      ],
    },
    {
      name: 'googleMapsEmbedUrl',
      type: 'textarea',
      label: 'Google Maps embed URL',
    },
    {
      name: 'googleMapsDirectionsUrl',
      type: 'text',
      label: 'Google Maps directions URL',
    },
    {
      name: 'parkingInfo',
      type: 'richText',
      label: 'Parking info',
    },
    {
      name: 'openingHours',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
        },
        {
          name: 'hours',
          type: 'text',
          required: true,
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
