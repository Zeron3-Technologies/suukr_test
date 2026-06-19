import type {
  AboutPage,
  ContactPage,
  HomePage,
  IntegrationSetting,
  LegalPage,
  LocationPage,
  Media,
  MenuItem,
  SiteSetting,
} from '@/payload-types'

import { getPayloadClient } from '@/lib/cms'
import {
  DEFAULT_HOME_HERO,
  DEFAULT_LOCATION,
  DEFAULT_SITE,
  type PublicHeroData,
  type PublicLink,
  type PublicLocationData,
  type PublicProduct,
  type PublicSiteData,
} from '@/lib/publicDefaults'
import { richTextToParagraphs } from '@/lib/richText'

export { DEFAULT_HOME_HERO, DEFAULT_LOCATION, DEFAULT_SITE }

export const getMediaUrl = (media?: (number | null) | Media) => {
  if (typeof media === 'object' && media !== null) {
    return media.imagekitUrl || media.url || undefined
  }

  return undefined
}

export const getMenuItemImageUrl = (item: MenuItem) =>
  item.imageUrl || getMediaUrl(item.image) ||
  'https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/menu/no-image_YpnG7-VaB.png'

const toPublicLink = (link: PublicLink | undefined | null): PublicLink | undefined =>
  link?.label && link?.url
    ? {
        label: link.label,
        openInNewTab: link.openInNewTab,
        url: link.url,
      }
    : undefined

export const getSiteData = async (): Promise<PublicSiteData> => {
  try {
    const payload = await getPayloadClient()
    const [site, integrations] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', depth: 1 }) as Promise<SiteSetting>,
      payload.findGlobal({ slug: 'integration-settings', depth: 0 }) as Promise<IntegrationSetting>,
    ])

    return {
      ...DEFAULT_SITE,
      brandName: site.brand?.name || DEFAULT_SITE.brandName,
      contactEmail: site.contact?.email,
      contactPhone: site.contact?.phone,
      footerLinks: site.footerLinks?.length ? site.footerLinks : DEFAULT_SITE.footerLinks,
      instagramUrl:
        site.social?.instagramUrl || integrations.instagram?.profileUrl || DEFAULT_SITE.instagramUrl,
      navigation: site.navigation?.length ? site.navigation : DEFAULT_SITE.navigation,
      orderLabel: integrations.orderNow?.ctaLabel || DEFAULT_SITE.orderLabel,
      orderUrl:
        integrations.orderNow?.uberEatsUrl ||
        integrations.orderNow?.squareOnlineUrl ||
        DEFAULT_SITE.orderUrl,
      shopifyMerchUrl:
        integrations.shopify?.merchCollectionUrl ||
        integrations.shopify?.storefrontUrl ||
        DEFAULT_SITE.shopifyMerchUrl,
    }
  } catch {
    return DEFAULT_SITE
  }
}

export const getLocationData = async (): Promise<PublicLocationData> => {
  try {
    const payload = await getPayloadClient()
    const page = (await payload.findGlobal({ slug: 'location-page', depth: 1 })) as LocationPage
    const address = page.address
    const addressLines = [
      address?.line1,
      address?.line2,
      [address?.suburb, address?.state, address?.postcode].filter(Boolean).join(' '),
    ].filter(Boolean) as string[]

    return {
      ...DEFAULT_LOCATION,
      addressLines: addressLines.length ? addressLines : DEFAULT_LOCATION.addressLines,
      directionsUrl: page.googleMapsDirectionsUrl || DEFAULT_LOCATION.directionsUrl,
      hours: page.openingHours?.length ? page.openingHours : DEFAULT_LOCATION.hours,
      parkingParagraphs: richTextToParagraphs(page.parkingInfo).length
        ? richTextToParagraphs(page.parkingInfo)
        : DEFAULT_LOCATION.parkingParagraphs,
    }
  } catch {
    return DEFAULT_LOCATION
  }
}

export const getHomeData = async () => {
  try {
    const payload = await getPayloadClient()
    const page = (await payload.findGlobal({ slug: 'home-page', depth: 2 })) as HomePage
    const signatureItems = (page.signatureItems || []).filter(
      (item): item is MenuItem => typeof item === 'object' && item !== null,
    )

    const products: PublicProduct[] = signatureItems.map((item) => ({
      description: item.description || '',
      id: item.id,
      image: getMenuItemImageUrl(item),
      name: item.name,
      tag: item.tag || undefined,
    }))

    return {
      brandParagraphs: richTextToParagraphs(page.brandTeaser?.body),
      brandTeaserHeading: page.brandTeaser?.heading || 'Made for sweet rituals',
      hero: {
        ...DEFAULT_HOME_HERO,
        eyebrow: page.hero?.eyebrow || DEFAULT_HOME_HERO.eyebrow,
        heading: page.hero?.heading || DEFAULT_HOME_HERO.heading,
        imageUrl: getMediaUrl(page.hero?.image) || DEFAULT_HOME_HERO.imageUrl,
        primaryCTA: toPublicLink(page.hero?.primaryCTA) || DEFAULT_HOME_HERO.primaryCTA,
        subheading: page.hero?.subheading,
      } satisfies PublicHeroData,
      products,
    }
  } catch {
    return {
      brandParagraphs: [],
      brandTeaserHeading: 'Made for sweet rituals',
      hero: DEFAULT_HOME_HERO,
      products: [],
    }
  }
}

export const getGlobalPage = async <T extends AboutPage | ContactPage | LocationPage>(
  slug: 'about-page' | 'contact-page' | 'location-page',
) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug, depth: 2 }) as Promise<T>
}

export const getLegalPage = async (slug: 'privacy-policy' | 'terms') => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'legal-pages',
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] as LegalPage | undefined
}
