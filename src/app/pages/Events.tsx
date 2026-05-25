'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { toPlainText } from '@/sanity/lib/portableText'

type EventRow = {
  _id: string
  title: string
  description?: unknown
  startsAt: string
  endsAt?: string | null
  location?: string | null
  registrationLink?: string | null
  eventType?: string | null
}

type EventType = {
  _id: string
  title: string
}

type EventsProps = {
  upcomingEvents: EventRow[]
  pastEvents: EventRow[]
  eventTypes: EventType[]
}

function getDayMonth(iso: string, tz = 'Europe/Zurich') {
  const date = new Date(iso)
  const swissLocale = 'de-CH'
  const day = new Intl.DateTimeFormat(swissLocale, {
    timeZone: tz,
    day: '2-digit',
  }).format(date)
  const month = new Intl.DateTimeFormat(swissLocale, {
    timeZone: tz,
    month: 'short',
  }).format(date)

  return { day, month }
}

function getMetaLine(event: EventRow, tz = 'Europe/Zurich') {
  const start = new Date(event.startsAt)
  const time = new Intl.DateTimeFormat('de-CH', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(start)

  return `${time}${event.location ? ` · ${event.location}` : ''}`
}

function getPastMonthYear(iso: string, tz = 'Europe/Zurich') {
  const date = new Date(iso)
  return new Intl.DateTimeFormat('de-CH', {
    timeZone: tz,
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export default function Events({ upcomingEvents, pastEvents, eventTypes }: EventsProps) {
  const categoryOrder = ['All', ...eventTypes.map((type) => type.title)]
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filteredUpcoming = [...upcomingEvents]
    .filter((event) => activeFilter === 'All' || event.eventType === activeFilter)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())

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
            <div className="filter-row events-filter-row">
              {categoryOrder.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`fb ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="label events-section-label">Upcoming</div>
          </div>

          <div className="events-upcoming-stack">
            {filteredUpcoming.map((event) => {
              const { day, month } = getDayMonth(event.startsAt)
              const meta = getMetaLine(event)
              const description = toPlainText(event.description) || 'More details coming soon.'

              return (
                <article key={event._id} className="events-card-lg">
                  <div className="events-date-col">
                    <div className="events-day">{day}</div>
                    <div className="events-month">{month}</div>
                  </div>

                  <div className="events-body">
                    <div className="events-meta-row">
                      <span className={`badge ${event.eventType === 'Hackathon' ? 'badge-green' : ''}`}>
                        {event.eventType ?? 'Event'}
                      </span>
                      <span className="events-meta-text">{meta}</span>
                    </div>

                    <h2 className="h2 events-title">{event.title}</h2>
                    <p>{description}</p>

                    <div className="events-foot">
                      <a
                        href={event.registrationLink ?? '#'}
                        className="btn btn-primary btn-sm"
                        aria-label={`Register for ${event.title}`}
                      >
                        Register
                      </a>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="events-past-block">
            <div className="label events-section-label events-section-label-past">Past Events</div>

            <div className="grid-3 events-past-grid">
            {pastEvents.map((event) => (
              <article key={event._id} className="events-past-card">
                <div className="events-past-img">
                  <span className="events-past-photo-tag">PAST EVENT</span>
                </div>
                <div className="events-past-body">
                  <div className="events-past-meta">
                    <span className="badge">{event.eventType ?? 'Event'}</span>
                    <span className="events-meta-text">{getPastMonthYear(event.startsAt)}</span>
                  </div>
                  <div className="h3 events-past-title">{event.title}</div>
                  <p className="events-past-desc">
                    {toPlainText(event.description) || 'Club event recap and highlights.'}
                  </p>
                </div>
              </article>
            ))}
            </div>
          </div>

          <div className="events-past-cta-wrap">
            <a href="https://luma.com/user/ethbclub" className="hero-cta-primary events-past-cta">
              View All Past Events
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
