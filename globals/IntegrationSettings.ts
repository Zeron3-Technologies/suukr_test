import type { GlobalConfig } from 'payload'

import { authenticated } from '@/lib/access'

export const IntegrationSettings: GlobalConfig = {
  slug: 'integration-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'orderNow',
      type: 'group',
      fields: [
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue: 'Order Now',
          required: true,
        },
        {
          name: 'uberEatsUrl',
          type: 'text',
          defaultValue: 'https://www.order.store/store/suukr/NYmzbdThSMqlw_FZwz-COA',
          label: 'Uber Eats URL',
        },
        {
          name: 'squareOnlineUrl',
          type: 'text',
          label: 'Square Online URL',
        },
        {
          name: 'alwaysVisible',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show always-visible CTA',
        },
      ],
    },
    {
      name: 'shopify',
      type: 'group',
      fields: [
        {
          name: 'storefrontUrl',
          type: 'text',
          label: 'Shopify storefront URL',
        },
        {
          name: 'merchCollectionUrl',
          type: 'text',
          label: 'Merch collection URL',
        },
      ],
    },
    {
      name: 'instagram',
      type: 'group',
      fields: [
        {
          name: 'embedUrl',
          type: 'text',
          label: 'Instagram embed/feed URL',
        },
        {
          name: 'profileUrl',
          type: 'text',
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          label: 'Google Analytics measurement ID',
        },
        {
          name: 'metaPixelId',
          type: 'text',
          label: 'Meta Pixel ID',
        },
      ],
    },
    {
      name: 'googleMaps',
      type: 'group',
      fields: [
        {
          name: 'placeId',
          type: 'text',
          label: 'Google Place ID',
        },
        {
          name: 'embedUrl',
          type: 'textarea',
          label: 'Maps embed URL',
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
