import { getPayloadClient } from "@/lib/cms";
import { seedMenuCategories, seedMenuItems } from "@/data/menu-data";

const slugify = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function upsertCategory(payload: Awaited<ReturnType<typeof getPayloadClient>>, title: string, sortOrder: number) {
  const slug = slugify(title);
  const existing = await payload.find({
    collection: "menu-categories",
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
    sortOrder,
    isActive: true,
  };

  if (existing.docs[0]) {
    return payload.update({
      collection: "menu-categories",
      id: existing.docs[0].id,
      data,
    });
  }

  return payload.create({
    collection: "menu-categories",
    data,
  });
}

async function seed() {
  const payload = await getPayloadClient();
  const categoriesByTitle = new Map<string, number>();

  for (const [index, title] of seedMenuCategories.entries()) {
    const category = await upsertCategory(payload, title, index);
    categoriesByTitle.set(category.title, category.id);
  }

  for (const [index, item] of seedMenuItems.entries()) {
    const categoryId = categoriesByTitle.get(item.category);

    if (!categoryId) {
      throw new Error(`Missing category for ${item.name}: ${item.category}`);
    }

    const slug = slugify(`${item.category}-${item.name}`);
    const existing = await payload.find({
      collection: "menu-items",
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    const data = {
      name: item.name,
      slug,
      description: item.desc,
      category: categoryId,
      imageUrl: item.image,
      tag: item.tag as
        | "Signature"
        | "Bestseller"
        | "Chef's Pick"
        | "Fan Fave"
        | "Limited"
        | "New"
        | "Pre-order"
        | undefined,
      isAvailable: true,
      isSignature: item.tag === "Signature",
      sortOrder: index,
      _status: "published" as const,
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "menu-items",
        id: existing.docs[0].id,
        data,
      });
    } else {
      await payload.create({
        collection: "menu-items",
        data,
      });
    }
  }

  payload.logger.info(`Seeded ${seedMenuCategories.length} categories and ${seedMenuItems.length} menu items.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
