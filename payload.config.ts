import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { ContactSubmissions } from '@/collections/ContactSubmissions'
import { LegalPages } from '@/collections/LegalPages'
import { Media } from '@/collections/Media'
import { MenuCategories } from '@/collections/MenuCategories'
import { MenuItems } from '@/collections/MenuItems'
import { Users } from '@/collections/Users'
import { AboutPage } from '@/globals/AboutPage'
import { ContactPage } from '@/globals/ContactPage'
import { HomePage } from '@/globals/HomePage'
import { IntegrationSettings } from '@/globals/IntegrationSettings'
import { LocationPage } from '@/globals/LocationPage'
import { SiteSettings } from '@/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      description: 'Suükr content management',
      titleSuffix: '- Suükr CMS',
    },
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    MenuCategories,
    MenuItems,
    LegalPages,
    ContactSubmissions,
  ],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload.db',
    },
  }),
  editor: lexicalEditor(),
  globals: [
    SiteSettings,
    IntegrationSettings,
    HomePage,
    AboutPage,
    LocationPage,
    ContactPage,
  ],
  secret: process.env.PAYLOAD_SECRET || 'suukr-dev-payload-secret-change-me',
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
