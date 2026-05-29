'use client'

import { Button } from './ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { toPlainText } from '@/sanity/lib/portableText'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '') ?? ''

type EventTypeRef = {
  title?: string | null
  slug?: string | null
}

type EventRow = {
  _id?: string
  id?: string
  title: string
  description?: unknown
  startsAt?: string
  start_time?: string
  endsAt?: string | null
  end_time?: string | null
  location?: string | null
  registrationLink?: string | null
  luma_url?: string | null
  image?: unknown
  image_url?: string | null
  eventType?: EventTypeRef | string | null
}

interface EventCardProps {
  event: EventRow
  className?: string
  variant?: 'default' | 'compact'
}

function formatEventDate(startISO: string, endISO?: string | null, tz = 'Europe/Zurich') {
  const start = new Date(startISO)
  const end = endISO ? new Date(endISO) : null

  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(start)

  const day = parts.find((part) => part.type === 'day')?.value ?? '00'

  const hourFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const monthFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    month: 'short',
  })

  const startTime = hourFormatter.format(start)
  const endTime = end ? hourFormatter.format(end) : ''
  const monthLabel = monthFormatter.format(start).toUpperCase()

  return { day, month: monthLabel, timeLine: `${startTime}${endTime ? ` · ${endTime}` : ''}` }
}

function getEventTypeLabel(eventType?: EventTypeRef | string | null) {
  if (!eventType) return 'Event'
  return typeof eventType === 'string' ? eventType : eventType.title ?? 'Event'
}

function getEventTypeKey(eventType?: EventTypeRef | string | null) {
  if (!eventType) return 'event'
  if (typeof eventType === 'string') return eventType.toLowerCase()
  return eventType.slug ?? eventType.title?.toLowerCase().replace(/\s+/g, '-') ?? 'event'
}

function getDescription(event: EventRow) {
  if (typeof event.description === 'string') return event.description
  return toPlainText(event.description) || 'More details coming soon.'
}

function isImageLikeUrl(value: string) {
  return /(?:\.png|\.jpe?g|\.webp|\.gif|\.svg)(?:\?|$)/i.test(value)
}

function normalizeSupabaseImageUrl(value: string) {
  if (!value) return null
  if (value.startsWith('http') || value.startsWith('/')) return value
  if (!supabaseUrl) return value

  let name = value.includes('/') ? value.split('/').pop() ?? value : value
  name = name.replace(/\s+/g, '-')

  if (!/\.[a-zA-Z0-9]+$/.test(name)) {
    name = `${name}.jpg`
  }

  return `${supabaseUrl}/storage/v1/object/public/events/${encodeURIComponent(name)}`
}

function getImageUrl(event: EventRow) {
  if (event.image) {
    try {
      return urlFor(event.image as never).width(1200).height(675).fit('crop').auto('format').quality(88).url()
    } catch {
      // fall back
    }
  }
  if (event.image_url) return normalizeSupabaseImageUrl(event.image_url)
  if (event.luma_url && isImageLikeUrl(event.luma_url)) return event.luma_url
  return null
}

function getRegistrationLink(event: EventRow) {
  return event.registrationLink ?? event.luma_url ?? null
}

export function EventCard({ event, className, variant = 'default' }: EventCardProps) {
  const startsAt = event.startsAt ?? event.start_time ?? ''
  const endsAt = event.endsAt ?? event.end_time
  const { day, month, timeLine } = formatEventDate(startsAt, endsAt)
  const eventType = getEventTypeLabel(event.eventType)
  const eventTypeKey = getEventTypeKey(event.eventType)
  const description = getDescription(event)
  const registrationLink = getRegistrationLink(event)
  const imageUrl = getImageUrl(event)

  return (
    <Card
      className={cn(
        'group w-full overflow-hidden rounded-[2rem] border border-[rgba(98,129,255,0.16)] bg-[linear-gradient(135deg,rgba(8,14,29,0.96)_0%,rgba(14,22,43,0.96)_56%,rgba(10,16,31,0.98)_100%)] p-0 transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(109,146,255,0.28)] hover:shadow-[0_20px_48px_rgba(5,10,24,0.28)]',
        variant === 'compact' ? 'max-w-xl' : 'w-full',
        className
      )}
    >
      {variant === 'compact' ? (
        <div className="flex h-full flex-col gap-4 p-5 md:p-6">
          {imageUrl ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <img src={imageUrl} alt={event.title} className="h-40 w-full object-cover object-center" />
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#9eb0d7]">
            <span className={cn('badge', eventTypeKey === 'hackathon' ? 'badge-green' : '')}>{eventType}</span>
            <span>{timeLine}</span>
            {event.location ? <span>{event.location}</span> : null}
          </div>

          <h3 className="font-head text-[1.1rem] font-semibold leading-snug text-white md:text-[1.2rem]">
            {event.title}
          </h3>

          <p className="line-clamp-3 text-sm leading-6 text-[#a7b6d8]">{description}</p>

          <div className="pt-1">
            {registrationLink ? (
              <Button asChild className="inline-flex w-fit px-5 py-2 text-sm hero-cta-primary">
                <a href={registrationLink} target="_blank" rel="noopener noreferrer" aria-label={`Register for ${event.title}`}>
                  Register
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      ) : (
        // ── DEFAULT variant: horizontal card, date panel left, content right ──
        <div className="grid grid-cols-[180px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)]">

          {/* LEFT: date panel — height driven entirely by right content */}
          <div className="flex items-center justify-center border-r border-white/10 bg-[linear-gradient(180deg,rgba(19,29,53,0.98)_0%,rgba(11,17,33,0.98)_100%)] px-6 py-8 text-center">
            <div className="flex flex-col items-center gap-1">
              <span className="font-head text-[3.7rem] font-semibold leading-none tracking-tight text-[#86a7ff] md:text-[4.25rem]">
                {day}
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.44em] text-[#8fa7df]">
                {month}
              </span>
            </div>
          </div>

          {/* RIGHT: content — drives the card height */}
          <div className="flex min-w-0 flex-col px-14 py-12">

            {/* TOP: badge + time + location */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.72rem] text-[#9eb0d7] md:text-xs">
              <span className={cn('badge', eventTypeKey === 'hackathon' ? 'badge-green' : '')}>{eventType}</span>
              <span>{timeLine}</span>
              {event.location ? <span>{event.location}</span> : null}
            </div>

            {/* MIDDLE: title + description */}
            <div className="mt-8 min-w-0">
              <h3 className="mb-5 font-head text-[1.35rem] font-semibold leading-tight text-white md:text-[1.55rem]">
                {event.title}
              </h3>
              <p className="max-w-4xl line-clamp-2 text-[0.86rem] leading-6 text-[#a7b6d8] md:text-[0.9rem]">
                {description}
              </p>
            </div>

            {/* BOTTOM: register button */}
            <div className="mt-10">
              {registrationLink ? (
                <Button asChild className="inline-flex w-fit px-5 py-2.5 text-sm hero-cta-primary">
                  <a href={registrationLink} target="_blank" rel="noopener noreferrer" aria-label={`Register for ${event.title}`}>
                    Register
                  </a>
                </Button>
              ) : null}
            </div>

          </div>
        </div>
      )}
    </Card>
  )
}
