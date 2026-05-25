export const runtime = 'edge'

export default function StudioPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 640, textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Studio Disabled on This Deployment</h1>
        <p style={{ opacity: 0.8 }}>
          The Sanity Studio route is disabled on this Cloudflare Pages target to keep the Worker bundle
          under the free plan size limit.
        </p>
      </div>
    </main>
  )
}
