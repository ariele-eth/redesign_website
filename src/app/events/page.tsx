import Events from '@/app/pages/Events'
import { Providers } from '@/components/Providers'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

const upcomingEventsQuery = `*[_type == "event" && isVisible != false && startsAt >= $now]
  | order(coalesce(sortOrder, 9999) asc, startsAt asc)
  { _id, title, startsAt, endsAt, location, description, registrationLink, "eventType": eventType->title }`

const pastEventsQuery = `*[_type == "event" && isVisible != false && startsAt < $now]
  | order(startsAt desc)
  { _id, title, startsAt, endsAt, location, description, registrationLink, "eventType": eventType->title }`

const eventTypesQuery = `*[_type == "eventType"] | order(title asc) { _id, title }`

export default async function EventsPage() {
  const now = new Date().toISOString()
  const [upcomingEvents, pastEvents, eventTypes] = await Promise.all([
    client.fetch(upcomingEventsQuery, { now }),
    client.fetch(pastEventsQuery, { now }),
    client.fetch(eventTypesQuery),
  ])

  return (
    <Providers>
      <Events
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
        eventTypes={eventTypes}
      />
    </Providers>
  )
}
