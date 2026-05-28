'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { Footer } from '@/components/Footer'
import { Navigation } from '@/components/Navigation'
import { EventCard } from '@/components/EventCard'

type EventType = {
  _id: string
  title: string
  slug?: string | null
}

type EventRow = {
  _id: string
  title: string
  description?: unknown
  startsAt: string
  endsAt?: string | null
  location?: string | null
  registrationLink?: string | null
  eventType?: EventType | string | null
}

type EventsProps = {
  upcomingEvents: EventRow[]
  eventTypes: EventType[]
}

function getEventTypeKey(eventType?: EventType | string | null) {
  if (!eventType) return ''
  if (typeof eventType === 'string') return eventType.toLowerCase()
  return eventType.slug ?? eventType.title.toLowerCase().replace(/\s+/g, '-')
}

export default function Events({ upcomingEvents, eventTypes }: EventsProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = useMemo(
    () => [
      { label: 'All', value: 'all' },
      ...eventTypes.map((type) => ({ label: type.title, value: getEventTypeKey(type) })),
    ].filter((filter) => filter.value),
    [eventTypes]
  )

  const filteredUpcoming = useMemo(() => {
    const list = [...upcomingEvents].sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    )

    if (activeFilter === 'all') return list

    return list.filter((event) => getEventTypeKey(event.eventType) === activeFilter)
  }, [activeFilter, upcomingEvents])

  return (
    <div className="events-page min-h-screen">
      <div className="page-grid-bg" />
      <Navigation />

      <main>
        <section className="!min-h-0 events-hero-shell page-hero-shell">
          <div className="events-hero-grid">
            <div className="events-hero-title">
              <div className="hero-top-brand">
                <span className="hero-top-line" />
                <span className="hero-top-text">Calendar</span>
              </div>
              <h1 className="hero-title-main">
                <span>Events</span>
              </h1>
              <p className="hero-subtext events-hero-lead">
                Workshops, panels, hackathons, networking. Something for every stage of your Web3 journey.
              </p>
            </div>
          </div>
        </section>

        <section className="events-content-shell">
          <div className="events-upcoming-block">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="filter-row events-filter-row">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    className={`fb ${activeFilter === filter.value ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter.value)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <a href="https://lu.ma/user/ethbclub" target="_blank" rel="noopener noreferrer" className="hero-cta-secondary btn-sm whitespace-nowrap">
                Past Events
              </a>
            </div>

            <div className="label events-section-label">Upcoming</div>
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6">
            {filteredUpcoming.map((event) => (
              <EventCard key={event._id} event={event} variant="default" />
            ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}