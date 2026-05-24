import { getPayloadClient } from "@/lib/cms";
import { ORDER_NOW_URL } from "@/lib/links";
import { richTextFromText } from "@/lib/richText";

async function findMenuItems(payload: Awaited<ReturnType<typeof getPayloadClient>>) {
  const result = await payload.find({
    collection: "menu-items",
    depth: 0,
    limit: 5,
    sort: "sortOrder",
    where: {
      name: {
        in: [
          "Cold Brew",
          "Cookie Monster",
          "Italian Hot Choc",
          "Pistachio Knafeh",
          "Strawberry Cream",
        ],
      },
    },
  });

  return result.docs.map((item) => item.id);
}

async function upsertLegalPage(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  slug: "privacy-policy" | "terms",
  title: string,
  body: string,
) {
  const existing = await payload.find({
    collection: "legal-pages",
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const data = {
    title,
    slug,
    jurisdiction: "australia" as const,
    effectiveDate: new Date().toISOString(),
    body: richTextFromText(body),
    seo: {
      metaTitle: `${title} | Suükr`,
      metaDescription: `${title} for Suükr customers.`,
    },
    _status: "published" as const,
  };

  if (existing.docs[0]) {
    await payload.update({
      collection: "legal-pages",
      id: existing.docs[0].id,
      data,
    });
    return;
  }

  await payload.create({
    collection: "legal-pages",
    data,
  });
}

async function seed() {
  const payload = await getPayloadClient();
  const signatureItems = await findMenuItems(payload);

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      brand: {
        name: "SUÜKR",
        tagline: "Luxury dessert cafe",
      },
      navigation: [
        { label: "Menu", url: "/menu" },
        { label: "About", url: "/about" },
        { label: "Best Sellers", url: "/#best-sellers" },
        { label: "E-Gift", url: "/#e-gift" },
        { label: "Location", url: "/location" },
        { label: "Contact", url: "/contact" },
      ],
      footerLinks: [
        { label: "Privacy Policy", url: "/privacy-policy" },
        { label: "Terms", url: "/terms" },
      ],
      contact: {
        email: "hello@suukr.com.au",
        phone: "",
      },
      social: {
        instagramHandle: "@suukr.au",
        instagramUrl: "https://www.instagram.com/suukr.au",
      },
      _status: "published",
    },
  });

  await payload.updateGlobal({
    slug: "integration-settings",
    data: {
      orderNow: {
        ctaLabel: "Order Now",
        uberEatsUrl: ORDER_NOW_URL,
        alwaysVisible: true,
      },
      shopify: {
        storefrontUrl: "https://suukr.myshopify.com/",
        merchCollectionUrl: "https://suukr.myshopify.com/",
      },
      instagram: {
        profileUrl: "https://www.instagram.com/suukr.au",
      },
      googleMaps: {
        embedUrl: "",
        placeId: "",
      },
      analytics: {
        googleAnalyticsId: "",
        metaPixelId: "",
      },
      _status: "published",
    },
  });

  await payload.updateGlobal({
    slug: "home-page",
    data: {
      hero: {
        eyebrow: "Frozen Yogurt - Shakes - Waffles - Cold Brew",
        heading: "Sweet Moments.\nAlways",
        subheading: "Handcrafted desserts, cold brews, shakes, and waffles.",
        primaryCTA: { label: "View Menu", url: "/menu" },
        secondaryCTA: { label: "Order Now", url: ORDER_NOW_URL, openInNewTab: true },
      },
      signatureItems,
      brandTeaser: {
        heading: "Made for sweet rituals",
        body: richTextFromText(
          "Suükr is a dessert cafe for handcrafted frozen yoghurt, waffles, shakes, cold brew, and celebratory treats.\n\nBuilt for everyday cravings and small moments worth making sweeter.",
        ),
      },
      _status: "published",
    },
  });

  await payload.updateGlobal({
    slug: "about-page",
    data: {
      hero: {
        eyebrow: "About Suükr",
        heading: "A Sweeter Daily Ritual",
        primaryCTA: { label: "View Menu", url: "/menu" },
        secondaryCTA: { label: "Order Now", url: ORDER_NOW_URL, openInNewTab: true },
      },
      brandStory: richTextFromText(
        "Suükr is a dessert cafe built around small rituals: creamy frozen yoghurt, rich shakes, waffles, cold brew, and treats made for sharing.\n\nEvery detail is designed to feel playful, polished, and a little bit indulgent.",
      ),
      philosophy: richTextFromText(
        "We keep the experience generous, bright, and easy to love. Good ingredients, thoughtful textures, and desserts that feel like a proper little celebration.",
      ),
      behindTheScenes: [
        {
          title: "Handcrafted",
          body: "Desserts and drinks prepared with care, texture, and a strong sense of fun.",
        },
        {
          title: "Community first",
          body: "A neighbourhood stop for celebrations, catch-ups, and after-dinner cravings.",
        },
      ],
      _status: "published",
    },
  });

  await payload.updateGlobal({
    slug: "location-page",
    data: {
      hero: {
        eyebrow: "Visit Us",
        heading: "Find Suükr",
        primaryCTA: { label: "Get Directions", url: "https://maps.app.goo.gl/vCjQtX4E4naZ97qR9", openInNewTab: true },
        secondaryCTA: { label: "Contact", url: "/contact" },
      },
      address: {
        line1: "Opp. Woolworths",
        line2: "K2/30 Severn Vale Dr",
        suburb: "Kellyville",
        state: "NSW",
        postcode: "2155",
        country: "Australia",
      },
      googleMapsDirectionsUrl: "https://maps.app.goo.gl/vCjQtX4E4naZ97qR9",
      parkingInfo: richTextFromText("Parking is available in the shopping centre car park."),
      openingHours: [
        { day: "Monday - Friday", hours: "11:00 AM - 8:30 PM" },
        { day: "Saturday", hours: "9:00 AM - 9:00 PM" },
        { day: "Sunday", hours: "9:00 AM - 8:00 PM" },
      ],
      _status: "published",
    },
  });

  await payload.updateGlobal({
    slug: "contact-page",
    data: {
      hero: {
        eyebrow: "Contact",
        heading: "Talk To Us",
        primaryCTA: { label: "Get Directions", url: "/location" },
        secondaryCTA: { label: "Order Now", url: ORDER_NOW_URL, openInNewTab: true },
      },
      formIntro: "Questions, catering, feedback, or sweet ideas. Send us a note and we will get back to you.",
      recipientEmail: "hello@suukr.com.au",
      _status: "published",
    },
  });

  await upsertLegalPage(
    payload,
    "privacy-policy",
    "Privacy Policy",
    "This Australian privacy policy template is editable in Payload CMS.\n\nSuükr collects customer information only when needed to respond to enquiries, manage orders, improve services, or comply with legal obligations.\n\nCustomers can contact Suükr to request access to, correction of, or deletion of personal information where applicable.",
  );

  await upsertLegalPage(
    payload,
    "terms",
    "Terms & Conditions",
    "These Australian terms template is editable in Payload CMS.\n\nWebsite content, menu availability, pricing, ordering links, and trading hours may change without notice.\n\nBy using this website, customers agree to use it lawfully and understand that third-party ordering, maps, payment, and social platforms are governed by their own terms.",
  );

  payload.logger.info("Seeded public site globals and legal pages.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
