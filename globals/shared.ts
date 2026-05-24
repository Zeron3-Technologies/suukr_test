import type { Field } from 'payload'

export const linkFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'url',
    type: 'text',
    required: true,
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    defaultValue: false,
  },
]

export const seoFields: Field[] = [
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
]

export const heroFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
  },
  {
    name: 'heading',
    type: 'text',
    required: true,
  },
  {
    name: 'subheading',
    type: 'textarea',
  },
  {
    name: 'image',
    type: 'relationship',
    relationTo: 'media',
  },
  {
    name: 'primaryCTA',
    type: 'group',
    fields: linkFields,
    label: 'Primary CTA',
  },
  {
    name: 'secondaryCTA',
    type: 'group',
    fields: linkFields,
    label: 'Secondary CTA',
  },
]
