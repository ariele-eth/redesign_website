// src/app/events/page.tsx (or wherever your Events page lives)
'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { EventCard } from '@/components/EventCard'
import { Button } from '@/components/ui/button'

type EventRow = {
  id: string
  title: string
  description: string | null
  start_time: string // ISO string
  end_time: string | null
  location: string | null
  image_url: string | null
  date: string // YYYY-MM-DD (generated in DB)
}

export default function Events() {
  const [events, setEvents] = useState<EventRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const from = new Date().toISOString()
    fetch(`/api/events?from=${encodeURIComponent(from)}`, { cache: 'no-store' })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then((j) => setEvents(j.events ?? []))
      .catch((e) => setError(e.message || 'Failed to load events'))
      .finally(() => setLoading(false))
  }, [])

  const [pastEvents, setPastEvents] = useState<EventRow[]>([])
  const [loadingPast, setLoadingPast] = useState(true)
  const [errorPast, setErrorPast] = useState<string | null>(null)

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
        setPastEvents(arr)
      })
      .catch((e) => setErrorPast(e.message || 'Failed to load past events'))
      .finally(() => setLoadingPast(false))
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-light-title mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Events
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r gradient-primary mx-auto mb-8" />
            </div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Join our workshops, talks, and hackathons to learn and build
              together in the blockchain ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Events from Supabase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
              Upcoming Events
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r gradient-primary mx-auto mb-8" />
            <p className="text-lg text-gray-600 mb-4 max-w-3xl mx-auto">
              Discover and register for our upcoming blockchain events,
              workshops, and meetups.
            </p>
          </div>

          {loading && (
            <p className="text-center text-gray-500">Loading events…</p>
          )}

          {!loading && error && (
            <p className="text-center text-red-600">Error: {error}</p>
          )}

          {!loading && !error && events.length === 0 && (
            <p className="text-center text-gray-500">No upcoming events.</p>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="max-w-7xl mx-auto flex justify-center">
              <div
                className={
                  `grid gap-8 auto-rows-fr ${
                    events.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  } justify-items-center`
                }
              >
                {events.map((e) => (
                  <EventCard key={e.id} event={e} className="max-w-xs sm:max-w-sm h-full" />
                ))}
              </div>
            </div>
          )}

          {/* Past Events Preview */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
                Recent Events
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r gradient-primary mx-auto mb-8" />
              <p className="text-lg text-gray-600 mb-4 max-w-3xl mx-auto">
                A preview of the most recent events hosted by the club.
              </p>
            </div>

            {loadingPast && (
              <p className="text-center text-gray-500">Loading past events…</p>
            )}

            {!loadingPast && errorPast && (
              <p className="text-center text-red-600">Error: {errorPast}</p>
            )}

            {!loadingPast && !errorPast && pastEvents.length === 0 && (
              <p className="text-center text-gray-500">No past events.</p>
            )}

            {!loadingPast && !errorPast && pastEvents.length > 0 && (
              <div className="max-w-7xl mx-auto flex justify-center">
                    <div className="flex flex-wrap justify-center gap-8">
                      {pastEvents.slice(0, 3).map((e) => (
                        <div key={e.id} className="w-full flex justify-center sm:w-auto">
                          <EventCard event={e} className="max-w-xs sm:max-w-sm h-full" />
                        </div>
                      ))}
                    </div>
              </div>
            )}

            {/* View all past events button */}
            {!loadingPast && pastEvents.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Link href="/events/past">
                  <Button
                    variant="outline"
                    className="transform transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md hover:border-primary/60 active:translate-y-0 active:shadow-sm px-6"
                  >
                    View All Past Events
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
