'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

type EventRow = {
  id: string
  title: string
  description: string | null
  start_time: string
  end_time: string | null
  location: string | null
  image_url: string | null
  date: string
  kind: 'All' | 'Workshop' | 'Panel' | 'Hackathon' | 'Networking'
  luma_url?: string | null
}

const upcomingEvents: EventRow[] = [
  {
    id: 'solidity-workshop',
    title: 'Intro to Smart Contracts with Solidity',
    description:
      'A hands-on workshop covering contract basics, testing, deployment, and common security mistakes to avoid.',
    start_time: '2026-04-15T18:00:00+02:00',
    end_time: '2026-04-15T21:00:00+02:00',
    location: 'ETH Main Building, HG F 30',
    image_url: null,
    date: '2026-04-15',
    kind: 'Workshop',
    luma_url: '#',
  },
  {
    id: 'defi-panel',
    title: 'The Future of DeFi - Industry Panel',
    description:
      'Founders and researchers discuss the state of decentralised finance, regulation, and product design in 2026.',
    start_time: '2026-04-22T19:00:00+02:00',
    end_time: '2026-04-22T20:30:00+02:00',
    location: 'ETH Alumni Pavilion',
    image_url: null,
    date: '2026-04-22',
    kind: 'Panel',
    luma_url: '#',
  },
  {
    id: 'web3-hackathon',
    title: 'ETH Zurich Web3 Hackathon 2026',
    description:
      'Our flagship weekend sprint with mentors, prizes, and a full room of builders focused on shipping real products.',
    start_time: '2026-05-03T10:00:00+02:00',
    end_time: '2026-05-05T18:00:00+02:00',
    location: 'ETH Zurich Campus',
    image_url: null,
    date: '2026-05-03',
    kind: 'Hackathon',
    luma_url: '#',
  },
]

const pastEvents: EventRow[] = [
  {
    id: 'zk-proofs',
    title: 'ZK Proofs Deep Dive',
    description: 'Technical evening on ZK proof systems and their applications.',
    start_time: '2026-02-12T18:30:00+01:00',
    end_time: '2026-02-12T20:30:00+01:00',
    location: 'ETH Zentrum',
    image_url: null,
    date: '2026-02-12',
    kind: 'Workshop',
  },
  {
    id: 'networking-night',
    title: 'Web3 Networking Night',
    description: '80+ students and professionals connecting over Web3.',
    start_time: '2026-01-28T19:00:00+01:00',
    end_time: '2026-01-28T21:00:00+01:00',
    location: 'ETH Polyterrasse',
    image_url: null,
    date: '2026-01-28',
    kind: 'Networking',
  },
  {
    id: 'dao-panel',
    title: 'DAO Governance Panel',
    description: 'Founders and operators on decentralised governance and treasury design.',
    start_time: '2025-12-04T18:00:00+01:00',
    end_time: '2025-12-04T20:00:00+01:00',
    location: 'ETH Hönggerberg',
    image_url: null,
    date: '2025-12-04',
    kind: 'Panel',
  },
]

const categoryOrder: EventRow['kind'][] = ['All', 'Workshop', 'Panel', 'Hackathon', 'Networking']

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
  const start = new Date(event.start_time)
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

export default function Events() {
  const [activeFilter, setActiveFilter] = useState<EventRow['kind']>('All')

  const filteredUpcoming = [...upcomingEvents].sort((a, b) => {
    const orderA = categoryOrder.indexOf(a.kind)
    const orderB = categoryOrder.indexOf(b.kind)
    if (orderA !== orderB) return orderA - orderB
    return new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  }).filter((event) => activeFilter === 'All' || event.kind === activeFilter)

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
              const { day, month } = getDayMonth(event.start_time)
              const meta = getMetaLine(event)

              return (
                <article key={event.id} className="events-card-lg">
                  <div className="events-date-col">
                    <div className="events-day">{day}</div>
                    <div className="events-month">{month}</div>
                  </div>

                  <div className="events-body">
                    <div className="events-meta-row">
                      <span className={`badge ${event.kind === 'Hackathon' ? 'badge-green' : ''}`}>
                        {event.kind}
                      </span>
                      <span className="events-meta-text">{meta}</span>
                    </div>

                    <h2 className="h2 events-title">{event.title}</h2>
                    <p>{event.description ?? 'More details coming soon.'}</p>

                    <div className="events-foot">
                      <a
                        href={event.luma_url ?? '#'}
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
              <article key={event.id} className="events-past-card">
                <div className="events-past-img">
                  <span className="events-past-photo-tag">PAST EVENT</span>
                </div>
                <div className="events-past-body">
                  <div className="events-past-meta">
                    <span className="badge">{event.kind}</span>
                    <span className="events-meta-text">{getPastMonthYear(event.start_time)}</span>
                  </div>
                  <div className="h3 events-past-title">{event.title}</div>
                  <p className="events-past-desc">{event.description ?? 'Club event recap and highlights.'}</p>
                </div>
              </article>
            ))}
            </div>
          </div>

          <div className="events-past-cta-wrap">
            <Link href="/events/past" className="hero-cta-secondary events-past-cta">
              View All Past Events
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
