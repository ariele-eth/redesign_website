// src/app/events/past/page.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EventCard } from '@/components/EventCard'

type EventRow = {
  id: string
  title: string
  description: string | null
  start_time: string
  end_time: string | null
  location: string | null
  image_url: string | null
}

export default function PastEventsPage() {
  const [events, setEvents] = useState<EventRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const to = new Date().toISOString()
    fetch(`/api/events?to=${encodeURIComponent(to)}&limit=200`, { cache: 'no-store' })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then((j) => {
        const arr: EventRow[] = (j.events ?? []).slice()
        arr.sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
        setEvents(arr)
      })
      .catch((e) => setError(e.message || 'Failed to load past events'))
      .finally(() => setLoading(false))
  }, [])

  // Responsive per-row grouping: recompute perRow on resize (1/2/3/4)
  const [perRow, setPerRow] = useState<number>(4)

  useEffect(() => {
    function computePer() {
      const w = window.innerWidth
      if (w >= 1024) setPerRow(4) // lg+
      else if (w >= 768) setPerRow(3) // md
      else if (w >= 640) setPerRow(2) // sm
      else setPerRow(1)
    }
    computePer()
    window.addEventListener('resize', computePer)
    return () => window.removeEventListener('resize', computePer)
  }, [])

  // Arrange events into rows so that bottom rows are full (`perRow` per row)
  // and the top row may contain fewer items (centered). Events are
  // already sorted newest -> oldest, so the top row holds the newest items.
  const rows = useMemo(() => {
    const per = perRow
    const n = events.length
    if (n === 0) return [] as EventRow[][]
    const rowsCount = Math.ceil(n / per)
    const firstRowCount = n - per * (rowsCount - 1)
    const out: EventRow[][] = []
    let idx = 0
    out.push(events.slice(0, firstRowCount))
    idx = firstRowCount
    while (idx < n) {
      out.push(events.slice(idx, idx + per))
      idx += per
    }
    return out
  }, [events, perRow])

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-light-title mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Past Events
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r gradient-primary mx-auto mb-8" />
            </div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Overview over all past events hosted by the club.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <p className="text-center text-gray-500">Loading events…</p>}
          {!loading && error && <p className="text-center text-red-600">Error: {error}</p>}
          {!loading && !error && events.length > 0 && (
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col gap-8">
                {rows.map((row, ri) => (
                  <div key={ri} className="flex justify-center gap-8">
                    {row.map((e) => (
                      <div key={e.id} className="w-full sm:w-auto">
                        <EventCard event={e} className="max-w-xs sm:max-w-sm h-full" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        
        </div>
      </section>

      <Footer />
    </div>
  )
}
