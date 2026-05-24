import MenuClient, { type MenuItemView } from "@/components/MenuClient";
import { getPayloadClient } from "@/lib/cms";
import { getLocationData, getSiteData } from "@/lib/publicContent";
import type { Media, MenuCategory, MenuItem } from "@/payload-types";

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dmzeehrbh/image/upload/v1778778702/suukr/site-assets/menu/no-image.png";

export const dynamic = "force-dynamic";

const getCategoryTitle = (category: MenuItem["category"]) => {
  if (typeof category === "object" && category !== null) {
    return category.title;
  }

  return "Other";
};

const getImageUrl = (item: MenuItem) => {
  const image = item.image;

  if (item.imageUrl) {
    return item.imageUrl;
  }

  if (typeof image === "object" && image !== null) {
    const media = image as Media;
    return media.cloudinarySecureUrl || media.url || FALLBACK_IMAGE;
  }

  return FALLBACK_IMAGE;
};

const mapMenuItem = (item: MenuItem): MenuItemView => ({
  name: item.name,
  desc: item.description || "",
  image: getImageUrl(item),
  category: getCategoryTitle(item.category),
  tag: item.tag || undefined,
});

export default async function MenuPage() {
  const payload = await getPayloadClient();

  const [categoriesResult, itemsResult, site, location] = await Promise.all([
    payload.find({
      collection: "menu-categories",
      depth: 0,
      limit: 100,
      sort: "sortOrder",
      where: {
        isActive: {
          equals: true,
        },
      },
    }),
    payload.find({
      collection: "menu-items",
      depth: 1,
      limit: 300,
      sort: "sortOrder",
      where: {
        isAvailable: {
          equals: true,
        },
      },
    }),
    getSiteData(),
    getLocationData(),
  ]);

  const categoryTitles = [
    "All Menu",
    ...categoriesResult.docs.map((category: MenuCategory) => category.title),
  ];

  const menuItems = itemsResult.docs.map(mapMenuItem);

  return <MenuClient categories={categoryTitles} location={location} menuItems={menuItems} site={site} />;
}
