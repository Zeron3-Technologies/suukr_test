## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CMS

Payload CMS is mounted at [http://localhost:3000/admin](http://localhost:3000/admin).
On first run, Payload will ask you to create the first admin user.

Required local setup:

```bash
cp .env.example .env
npm run dev
```

To populate Payload with the current menu categories/items and Cloudinary image URLs:

```bash
npm run seed:menu
npm run seed:content
```

Editable content in Payload:

- Menu categories and menu items, including images, tags, prices, availability, sort order, dietary labels, and Square POS IDs.
- Media library with Cloudinary upload metadata.
- Home, About, Location, and Contact page content.
- Site settings for brand, navigation, footer, contact, and social links.
- Integration settings for Uber Eats, Square Online, Shopify merch, Instagram, Google Analytics, Meta Pixel, and Google Maps.
- Privacy Policy and Terms pages.
- Contact form submissions.

Cloudinary storage is enabled when these environment variables are set:

```bash
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=suukr
```
