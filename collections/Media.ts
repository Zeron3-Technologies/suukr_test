import type {
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  CollectionConfig,
} from 'payload'
import ImageKit, { toFile } from '@imagekit/nodejs'

import { anyone, authenticated } from '@/lib/access'

type UploadFile = {
  data?: Buffer | Uint8Array
  mimetype?: string
  name?: string
}

type MediaDocument = {
  imagekitFileId?: string
  imagekitFilePath?: string
  imagekitUrl?: string
}

const hasImageKitConfig = () =>
  Boolean(
    process.env.IMAGEKIT_PUBLIC_KEY &&
      process.env.IMAGEKIT_PRIVATE_KEY &&
      process.env.IMAGEKIT_URL_ENDPOINT,
  )

const getImageKitClient = () => {
  return new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  })
}

const uploadToImageKit = async (
  file: UploadFile,
  folder: string,
): Promise<any> => {
  if (!file.data) {
    throw new Error('No file buffer was provided for ImageKit upload.')
  }

  const imagekit = getImageKitClient()
  const folderPath = folder.startsWith('/') ? folder : `/${folder}`
  const fileName = file.name || 'unnamed-file'
  const formattedFile = await toFile(Buffer.from(file.data), fileName)

  return imagekit.files.upload({
    file: formattedFile,
    fileName,
    folder: folderPath,
  })
}


const syncToImageKit: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  const file = (req as { file?: UploadFile }).file

  if (!file?.data || !hasImageKitConfig()) {
    return data
  }

  const result = await uploadToImageKit(
    file,
    process.env.IMAGEKIT_FOLDER || 'suukr',
  )

  return {
    ...data,
    imagekitFileId: result.fileId,
    imagekitFilePath: result.filePath,
    imagekitUrl: result.url,
    uploadedToImageKitAt: new Date().toISOString(),
    uploadSource: operation === 'create' ? 'payload-create' : 'payload-update',
  }
}

const deleteFromImageKit: CollectionAfterDeleteHook = async ({ doc }) => {
  const media = doc as MediaDocument

  if (!media.imagekitFileId || !hasImageKitConfig()) {
    return
  }

  const imagekit = getImageKitClient()
  await imagekit.files.delete(media.imagekitFileId)
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    defaultColumns: ['filename', 'alt', 'imagekitUrl', 'updatedAt'],
    group: 'Assets',
    useAsTitle: 'alt',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
      },
      {
        name: 'card',
        height: 900,
        width: 1200,
      },
      {
        name: 'hero',
        height: 1600,
        width: 2400,
      },
    ],
    mimeTypes: ['image/*'],
    staticDir: 'media',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
    },
    {
      name: 'imagekitUrl',
      type: 'text',
      admin: {
        description: 'Public HTTPS asset URL returned by ImageKit.',
        readOnly: true,
      },
      label: 'ImageKit URL',
    },
    {
      name: 'imagekitFileId',
      type: 'text',
      admin: {
        readOnly: true,
      },
      label: 'ImageKit File ID',
    },
    {
      name: 'imagekitFilePath',
      type: 'text',
      admin: {
        readOnly: true,
      },
      label: 'ImageKit File Path',
    },
    {
      name: 'uploadedToImageKitAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
      label: 'Uploaded to ImageKit At',
    },
    {
      name: 'uploadSource',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterDelete: [deleteFromImageKit],
    beforeChange: [syncToImageKit],
  },
}
