// src/components/EventCard.tsx
'use client'

import { Card } from '@/components/ui/card'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

type EventRow = {
  id: string
  title: string
  description?: string | null
  start_time: string
  end_time?: string | null
  location?: string | null
  image_url?: string | null
  luma_url?: string | null // <— add this
}

interface EventCardProps {
  event: EventRow
  className?: string
}

function formatEventDate(
  startISO: string,
  endISO?: string | null,
  tz = 'Europe/Zurich'
) {
  const start = new Date(startISO)
  const end = endISO ? new Date(endISO) : null

  const md = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(start)
  const M = md.find((p) => p.type === 'month')?.value ?? '00'
  const D = md.find((p) => p.type === 'day')?.value ?? '00'

  const hh = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    hour12: false,
  })
  const h1 = hh.format(start)
  const h2 = end ? hh.format(end) : ''

  return `${M}.${D} | ${h1}H${h2 ? ` - ${h2}H` : ''}`
}

export function EventCard({ event, className }: EventCardProps) {
  const dateStr = formatEventDate(event.start_time, event.end_time)

  return (
    <Card
      className={cn(
        'p-6 text-center shadow-glass hover:shadow-elegant transition-smooth group bg-gray-50',
        className
      )}
    >
      {/* Banner */}
      <div className="w-full aspect-[16/9] rounded-xl mx-auto mb-4 overflow-hidden group-hover:scale-[1.01] transition-smooth">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold">
            {event.title
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 4)}
          </div>
        )}
      </div>

      {/* Date (same blue as PersonCard role) */}
      <p
        className="text-primary text-sm mb-2 font-medium"
        style={{ color: 'hsl(199 100% 35%)' }}
      >
        {dateStr}
      </p>

      {/* Title */}
      <h3 className="font-semibold text-[1.35rem] md:text-[1.5rem] leading-snug mb-1 text-gray-900">
        {event.title}
      </h3>

      {event.location && (
        <p className="text-sm text-gray-700 mb-2">{event.location}</p>
      )}

      {event.description && (
        <p className="text-sm text-gray-600 mb-4">{event.description}</p>
      )}

      {/* Luma CTA */}
      {event.luma_url && (
        <Button
          asChild
          className="w-full gradient-primary shadow-elegant group text-white"
        >
          <a
            href={event.luma_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open event on Luma"
          >
            View on Luma{' '}
            <span className="ml-2 group-hover:translate-x-0.5 transition-transform">
              ↗
            </span>
          </a>
        </Button>
      )}
    </Card>
  )
}
