import fs from 'node:fs'
import path from 'node:path'
import ImageKit, { toFile } from '@imagekit/nodejs'

// Simple helper to load .env variables
const dotenvConfig = () => {
  try {
    const envPath = path.resolve(process.cwd(), '.env')
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, 'utf-8')
      const lines = envFile.split('\n')
      for (const line of lines) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
        if (match) {
          const key = match[1]
          let value = match[2] || ''
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
          } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.substring(1, value.length - 1)
          }
          process.env[key] = value
        }
      }
      console.log('Loaded .env file successfully.')
    }
  } catch (err) {
    console.error('Failed to load .env file', err)
  }
}

dotenvConfig()

// ImageKit credentials (with fallbacks to user-provided keys)
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || 'public_bsz2/9F4Z7ryxMXl2NRbCR+HjHk='
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || 'private_lTJpboh/OSb/foN3EkApd8WKo5E='
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/3rpgznkyd'
const baseFolder = process.env.IMAGEKIT_FOLDER || 'suukr'

console.log('Initializing ImageKit SDK...')
console.log('URL Endpoint:', urlEndpoint)
console.log('Public Key:', publicKey.substring(0, 15) + '...')

const imagekit = new ImageKit({
  privateKey,
})

const getDestinationFolderAndName = (key: string) => {
  // key is e.g. "/images/menu/Almond Maple Cold Brew.jpg"
  // or "/images/choco.jpg"
  const parts = key.split('/')
  const fileName = parts[parts.length - 1]
  
  // Extract subfolders starting from index 2 (after "" and "images")
  const subFolders = parts.slice(2, parts.length - 1)
  
  // Construct destination folder path: e.g. /suukr/site-assets/menu
  const folder = [`/${baseFolder}/site-assets`, ...subFolders].join('/')
  return { folder, fileName }
}

const filesToUpdate = [
  'app/menu/page.tsx',
  'components/Categories.tsx',
  'components/Footer.tsx',
  'components/GiftBanner.tsx',
  'components/MobileOrder.tsx',
  'components/ProductCarousel.tsx',
  'components/SwirlSection.tsx',
  'data/menu-data.ts',
  'lib/publicContent.ts',
]

async function migrate() {
  try {
    const cloudinaryAssetsPath = path.resolve(process.cwd(), 'data/cloudinary-assets.json')
    if (!fs.existsSync(cloudinaryAssetsPath)) {
      throw new Error(`Cloudinary assets registry not found at ${cloudinaryAssetsPath}`)
    }

    const cloudinaryAssets = JSON.parse(fs.readFileSync(cloudinaryAssetsPath, 'utf-8'))
    const imagekitAssets: Record<string, any> = {}
    const urlMap: Record<string, string> = {}

    console.log(`Found ${Object.keys(cloudinaryAssets).length} assets to migrate in cloudinary-assets.json`)

    for (const [key, details] of Object.entries(cloudinaryAssets) as [string, any][]) {
      const absolutePath = path.join(process.cwd(), 'public', key)
      const cloudinaryUrl = details.secureUrl

      if (!fs.existsSync(absolutePath)) {
        console.warn(`[WARNING] Local file not found: ${absolutePath}. Skipping.`)
        continue
      }

      const { folder, fileName } = getDestinationFolderAndName(key)

      console.log(`Uploading ${fileName} to ImageKit folder: ${folder}...`)
      try {
        const fileBuffer = fs.readFileSync(absolutePath)
        const uploadResult = await imagekit.files.upload({
          file: await toFile(fileBuffer, fileName),
          fileName: fileName,
          folder: folder,
        })

        console.log(`Uploaded successfully: ${uploadResult.url}`)

        // Save detailed imagekit metadata
        imagekitAssets[key] = {
          fileId: uploadResult.fileId,
          url: uploadResult.url,
          filePath: uploadResult.filePath,
          width: uploadResult.width,
          height: uploadResult.height,
          size: uploadResult.size,
        }

        if (uploadResult.url) {
          urlMap[cloudinaryUrl] = uploadResult.url
        }

      } catch (err: any) {
        console.error(`[ERROR] Failed to upload ${key} to ImageKit:`, err?.message || err)
      }
    }

    // Save ImageKit assets registry
    const imagekitAssetsPath = path.resolve(process.cwd(), 'data/imagekit-assets.json')
    fs.writeFileSync(imagekitAssetsPath, JSON.stringify(imagekitAssets, null, 2), 'utf-8')
    console.log(`Saved ImageKit assets registry to ${imagekitAssetsPath}`)

    // Update files in codebase with the new ImageKit URLs
    console.log('\nRewriting Cloudinary URLs in codebase files...')
    for (const filePath of filesToUpdate) {
      const absoluteFilePath = path.resolve(process.cwd(), filePath)
      if (!fs.existsSync(absoluteFilePath)) {
        console.warn(`[WARNING] File to update not found: ${absoluteFilePath}. Skipping.`)
        continue
      }

      let content = fs.readFileSync(absoluteFilePath, 'utf-8')
      let replacedCount = 0

      for (const [cloudinaryUrl, imagekitUrl] of Object.entries(urlMap)) {
        // Simple global replacement of the exact Cloudinary URL
        if (content.includes(cloudinaryUrl)) {
          // Escape regex special chars in cloudinaryUrl
          const escapedUrl = cloudinaryUrl.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
          content = content.replace(new RegExp(escapedUrl, 'g'), imagekitUrl)
          replacedCount++
        }
      }

      if (replacedCount > 0) {
        fs.writeFileSync(absoluteFilePath, content, 'utf-8')
        console.log(`Updated ${filePath} - replaced ${replacedCount} Cloudinary URLs.`)
      } else {
        console.log(`No Cloudinary URLs replaced in ${filePath}.`)
      }
    }

    console.log('\nMigration and URL rewriting complete!')
  } catch (error: any) {
    console.error('Migration failed:', error?.message || error)
    process.exit(1)
  }
}

migrate()
