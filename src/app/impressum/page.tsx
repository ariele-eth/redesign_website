import {PortableText, type PortableTextComponents} from 'next-sanity'

import {Footer} from '@/components/Footer'
import {Navigation} from '@/components/Navigation'
import {client} from '@/sanity/lib/client'

export const revalidate = 60

type LegalDocument = {
  title?: string
  slug?: {current?: string}
  content?: unknown
  lastUpdated?: string
}

const impressumQuery = `*[_type == "impressum" && _id == "impressum"][0]{
  title,
  slug,
  content,
  lastUpdated
}`

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({children}) => <h2 className="h2">{children}</h2>,
  },
}

function formatDate(value?: string) {
  if (!value) return null
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(parsed)
}

export default async function ImpressumPage() {
  const legalDocument: LegalDocument | null = await client.fetch(impressumQuery)
  const formattedDate = formatDate(legalDocument?.lastUpdated)

  return (
    <div className="legal-page min-h-screen">
      <div className="page-grid-bg" />
      <Navigation />

      <main>
        <section className="legal-hero">
          <div className="hero-top-brand">
            <span className="hero-top-line" />
            <span className="hero-top-text">LEGAL</span>
          </div>
          <h1 className="hero-title-main">
            <span>{legalDocument?.title ?? 'Impressum'}</span>
          </h1>
          {formattedDate ? <p className="legal-date">As of: {formattedDate}</p> : null}
        </section>

        <section className="legal-content">
          {Array.isArray(legalDocument?.content) && legalDocument.content.length > 0 ? (
            <div className="legal-section">
              <PortableText value={legalDocument.content} components={portableTextComponents} />
            </div>
          ) : (
            <div className="legal-section">
              <p>Content coming soon.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
