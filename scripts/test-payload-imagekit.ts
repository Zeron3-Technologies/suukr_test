import fs from 'node:fs'
import path from 'node:path'
import { getPayloadClient } from '../lib/cms.js'
import ImageKit from '@imagekit/nodejs'

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

// Initialize ImageKit client for verification
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
})

async function runTest() {
  console.log('--- STARTING PAYLOAD IMAGEKIT INTEGRATION TEST ---')
  
  try {
    console.log('Initializing Payload CMS Client...')
    const payload = await getPayloadClient()
    
    // Create a 1x1 transparent PNG buffer
    const testPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    const fileBuffer = Buffer.from(testPngBase64, 'base64')
    
    console.log('Uploading test image buffer to Payload CMS Media collection...')
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: 'Payload ImageKit Integration Test Image',
        caption: 'This is a test image created programmatically to verify ImageKit uploads.',
      },
      file: {
        data: fileBuffer,
        mimetype: 'image/png',
        name: 'test-payload-imagekit.png',
        size: fileBuffer.length,
      },
    })
    
    console.log('Payload Media Created successfully! Resulting Record:')
    console.log(JSON.stringify(media, null, 2))
    
    // Assertions
    if (!media.imagekitUrl) {
      throw new Error('Test FAILED: media.imagekitUrl is missing!')
    }
    
    if (!media.imagekitFileId) {
      throw new Error('Test FAILED: media.imagekitFileId is missing!')
    }
    
    if (!media.imagekitUrl.startsWith('https://ik.imagekit.io/3rpgznkyd/')) {
      throw new Error(`Test FAILED: media.imagekitUrl does not match the expected endpoint! URL: ${media.imagekitUrl}`)
    }
    
    console.log('\n[PASS] Upload verification succeeded!')
    console.log(`ImageKit URL: ${media.imagekitUrl}`)
    console.log(`ImageKit File ID: ${media.imagekitFileId}`)
    
    // Verify file exists on ImageKit via their API
    console.log('\nVerifying file metadata directly from ImageKit API...')
    const fileDetails = await imagekit.files.get(media.imagekitFileId)
    console.log('ImageKit API returned file details successfully!')
    console.log(`ImageKit File Name: ${fileDetails.name}`)
    console.log(`ImageKit File Size: ${fileDetails.size} bytes`)
    
    // Clean up
    console.log('\nDeleting test media record from Payload CMS (should trigger afterDelete hook to delete from ImageKit)...')
    await payload.delete({
      collection: 'media',
      id: media.id,
    })
    
    console.log('[PASS] Payload media record deleted successfully.')
    
    // Verify file was deleted from ImageKit
    console.log('Verifying file deletion on ImageKit...')
    try {
      await imagekit.files.get(media.imagekitFileId)
      throw new Error('Test FAILED: File still exists on ImageKit after deletion!')
    } catch (getErr: any) {
      if (getErr?.status === 404 || getErr?.statusCode === 404 || getErr?.message?.includes('404')) {
        console.log('[PASS] File successfully deleted from ImageKit (returned 404 as expected).')
      } else {
        throw getErr
      }
    }
    
    console.log('\n--- ALL PAYLOAD IMAGEKIT INTEGRATION TESTS PASSED SUCCESSFULLY! ---')
    process.exit(0)
  } catch (error: any) {
    console.error('\n--- TEST FAILED ---')
    console.error(error?.stack || error?.message || error)
    process.exit(1)
  }
}

runTest()
