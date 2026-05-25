import { NextResponse } from 'next/server'

import { supabaseAdmin } from '@/lib/supabase'
import { hasWriteToken, writeClient } from '@/sanity/lib/writeClient'

export const runtime = 'edge'

const bucket =
  process.env.SUPABASE_EDUCATIONAL_CONTENT_BUCKET ||
  process.env.SUPABASE_KNOWLEDGE_BUCKET ||
  'educational-content'
const webhookSecret = process.env.SANITY_WEBHOOK_SECRET

type Resource = {
  _key?: string
  title?: string
  url?: string | null
  storageUrl?: string | null
  file?: {
    asset?: {
      _id?: string
      url?: string
      originalFilename?: string
      mimeType?: string
    }
  }
}

type KnowledgeDoc = {
  _id: string
  resources?: Resource[]
}

const docQuery = `*[_id == $id][0]{
  _id,
  resources[]{
    _key,
    title,
    url,
    storageUrl,
    file{asset->{_id, url, originalFilename, mimeType}}
  }
}`

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80) || 'file'
}

function getExtension(filename?: string, fallback = 'pdf') {
  if (!filename) return fallback
  const parts = filename.split('.')
  if (parts.length < 2) return fallback
  return parts.pop() || fallback
}

function resolveDocId(rawId: string) {
  return rawId.startsWith('drafts.') ? rawId.slice('drafts.'.length) : rawId
}

export async function POST(request: Request) {
  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Missing SANITY_WEBHOOK_SECRET' },
      { status: 500 }
    )
  }

  if (!hasWriteToken) {
    return NextResponse.json(
      { error: 'Missing SANITY_API_TOKEN' },
      { status: 500 }
    )
  }

  const headerSecret = request.headers.get('x-sanity-webhook-secret')
  const urlSecret = new URL(request.url).searchParams.get('secret')
  const secret = headerSecret || urlSecret

  if (!secret || secret !== webhookSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const rawId: string | undefined = body?._id || body?.documentId || body?.ids?.[0]

  if (!rawId) {
    return NextResponse.json({ error: 'Missing document id' }, { status: 400 })
  }

  if (rawId.startsWith('drafts.')) {
    return NextResponse.json({ ok: true, skipped: 'draft' })
  }

  const docId = resolveDocId(rawId)
  const document = await writeClient.fetch<KnowledgeDoc | null>(docQuery, { id: docId })

  if (!document) {
    return NextResponse.json({ ok: true, skipped: 'not_found' })
  }

  const updates: Array<{ key: string; url: string }> = []

  for (const resource of document.resources ?? []) {
    if (!resource?._key) continue
    if (resource.storageUrl) continue
    if (resource.url) continue

    const asset = resource.file?.asset
    if (!asset?.url) continue

    const originalName = asset.originalFilename || asset.url.split('/').pop() || 'file.pdf'
    const ext = getExtension(originalName)
    const baseName = slugify(originalName.replace(/\.[^/.]+$/, ''))
    const path = `nodes/${docId}/${resource._key}-${baseName}.${ext}`

    const response = await fetch(asset.url)
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to download asset: ${asset.url}` },
        { status: 502 }
      )
    }

    const arrayBuffer = await response.arrayBuffer()
    const fileBody = new Uint8Array(arrayBuffer)
    const contentType = response.headers.get('content-type') || asset.mimeType || 'application/pdf'

    const upload = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, fileBody, { contentType, upsert: false })

    if (upload.error && !upload.error.message.toLowerCase().includes('already exists')) {
      return NextResponse.json(
        { error: `Supabase upload failed: ${upload.error.message}` },
        { status: 500 }
      )
    }

    const publicUrl = supabaseAdmin.storage.from(bucket).getPublicUrl(path).data.publicUrl

    if (publicUrl) {
      updates.push({ key: resource._key, url: publicUrl })
    }
  }

  if (!updates.length) {
    return NextResponse.json({ ok: true, updated: 0 })
  }

  let patch = writeClient.patch(docId)
  updates.forEach((update) => {
    patch = patch.set({ [`resources[_key=="${update.key}"].storageUrl`]: update.url })
  })

  await patch.commit()

  return NextResponse.json({ ok: true, updated: updates.length })
}
