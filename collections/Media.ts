import type {
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  CollectionConfig,
} from 'payload'
import { Readable } from 'node:stream'

import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

import { anyone, authenticated } from '@/lib/access'

type UploadFile = {
  data?: Buffer | Uint8Array
  mimetype?: string
  name?: string
}

type MediaDocument = {
  cloudinaryPublicId?: string
  cloudinaryResourceType?: string
}

const hasCloudinaryConfig = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  )

const configureCloudinary = () => {
  cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    secure: true,
  })
}

const uploadToCloudinary = (
  file: UploadFile,
  folder: string,
): Promise<UploadApiResponse> =>
  new Promise((resolve, reject) => {
    if (!file.data) {
      reject(new Error('No file buffer was provided for Cloudinary upload.'))
      return
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Cloudinary did not return an upload result.'))
          return
        }

        resolve(result)
      },
    )

    Readable.from(Buffer.from(file.data)).pipe(uploadStream)
  })

const syncToCloudinary: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  const file = (req as { file?: UploadFile }).file

  if (!file?.data || !hasCloudinaryConfig()) {
    return data
  }

  configureCloudinary()

  const result = await uploadToCloudinary(
    file,
    process.env.CLOUDINARY_FOLDER || 'suukr',
  )

  return {
    ...data,
    cloudinaryPublicId: result.public_id,
    cloudinaryResourceType: result.resource_type,
    cloudinarySecureUrl: result.secure_url,
    cloudinaryUrl: result.url,
    cloudinaryVersion: String(result.version),
    uploadedToCloudinaryAt: new Date().toISOString(),
    uploadSource: operation === 'create' ? 'payload-create' : 'payload-update',
  }
}

const deleteFromCloudinary: CollectionAfterDeleteHook = async ({ doc }) => {
  const media = doc as MediaDocument

  if (!media.cloudinaryPublicId || !hasCloudinaryConfig()) {
    return
  }

  configureCloudinary()

  await cloudinary.uploader.destroy(media.cloudinaryPublicId, {
    resource_type: media.cloudinaryResourceType || 'image',
  })
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    defaultColumns: ['filename', 'alt', 'cloudinarySecureUrl', 'updatedAt'],
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
      name: 'cloudinarySecureUrl',
      type: 'text',
      admin: {
        description: 'Public HTTPS asset URL returned by Cloudinary.',
        readOnly: true,
      },
      label: 'Cloudinary Secure URL',
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      admin: {
        readOnly: true,
      },
      label: 'Cloudinary URL',
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      admin: {
        readOnly: true,
      },
      label: 'Cloudinary Public ID',
    },
    {
      name: 'cloudinaryResourceType',
      type: 'text',
      admin: {
        readOnly: true,
      },
      label: 'Cloudinary Resource Type',
    },
    {
      name: 'cloudinaryVersion',
      type: 'text',
      admin: {
        readOnly: true,
      },
      label: 'Cloudinary Version',
    },
    {
      name: 'uploadedToCloudinaryAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
      label: 'Uploaded to Cloudinary At',
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
    afterDelete: [deleteFromCloudinary],
    beforeChange: [syncToCloudinary],
  },
}
