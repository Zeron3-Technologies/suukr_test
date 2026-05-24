import { ORDER_NOW_URL } from '@/lib/links'

export type PublicLink = {
  label: string
  openInNewTab?: boolean | null
  url: string
}

export type PublicSiteData = {
  brandName: string
  contactEmail?: string | null
  contactPhone?: string | null
  footerLinks: PublicLink[]
  instagramUrl?: string | null
  navigation: PublicLink[]
  orderLabel: string
  orderUrl: string
  shopifyMerchUrl?: string | null
}

export type PublicLocationData = {
  addressLines: string[]
  directionsUrl: string
  hours: { day: string; hours: string }[]
  mapImageUrl: string
  parkingParagraphs: string[]
}

export type PublicHeroData = {
  eyebrow: string
  heading: string
  imageUrl: string
  primaryCTA?: PublicLink
  subheading?: string | null
}

export type PublicProduct = {
  description: string
  id: number | string
  image: string
  name: string
  tag?: string
}

export const DEFAULT_HERO_IMAGE =
  'https://res.cloudinary.com/dmzeehrbh/image/upload/v1778778187/suukr/site-assets/suukr-hero-2880x2304.jpg'

export const DEFAULT_LOCATION: PublicLocationData = {
  addressLines: ['Opp. Woolworths,', 'K2/30 Severn Vale Dr,', 'Kellyville NSW 2155'],
  directionsUrl: 'https://maps.app.goo.gl/vCjQtX4E4naZ97qR9',
  hours: [
    { day: 'Monday - Friday', hours: '11:00 AM - 8:30 PM' },
    { day: 'Saturday', hours: '9:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '9:00 AM - 8:00 PM' },
  ],
  mapImageUrl:
    'https://res.cloudinary.com/dmzeehrbh/image/upload/v1778778728/suukr/site-assets/satellite-map.jpg',
  parkingParagraphs: ['Parking is available in the shopping centre car park.'],
}

export const DEFAULT_SITE: PublicSiteData = {
  brandName: 'SUÜKR',
  footerLinks: [
    { label: 'Privacy Policy', url: '/privacy-policy' },
    { label: 'Terms', url: '/terms' },
  ],
  instagramUrl: 'https://www.instagram.com/suukr.au',
  navigation: [
    { label: 'Menu', url: '/menu' },
    { label: 'About', url: '/about' },
    { label: 'Best Sellers', url: '/#best-sellers' },
    { label: 'E-Gift', url: '/#e-gift' },
    { label: 'Location', url: '/location' },
    { label: 'Contact', url: '/contact' },
  ],
  orderLabel: 'Order Now',
  orderUrl: ORDER_NOW_URL,
  shopifyMerchUrl: 'https://suukr.myshopify.com/',
}

export const DEFAULT_HOME_HERO: PublicHeroData = {
  eyebrow: 'Frozen Yogurt - Shakes - Waffles - Cold Brew',
  heading: 'Sweet Moments.\nAlways',
  imageUrl: DEFAULT_HERO_IMAGE,
  primaryCTA: { label: 'View Menu', url: '/menu' },
}
