import Events from '@/app/pages/Events'
import { Providers } from '@/components/Providers'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

const upcomingEventsQuery = `*[_type == "event" && isVisible != false && startsAt >= $now]
  | order(coalesce(sortOrder, 9999) asc, startsAt asc)
  { _id, title, startsAt, endsAt, location, description, registrationLink, image, "eventType": eventType->{ _id, title, "slug": slug.current } }`

const eventTypesQuery = `*[_type == "eventType"] | order(title asc) { _id, title, "slug": slug.current }`

export default async function EventsPage() {
  const now = new Date().toISOString()
  const [upcomingEvents, eventTypes] = await Promise.all([
    client.fetch(upcomingEventsQuery, { now }),
    client.fetch(eventTypesQuery),
  ])

  return (
    <Providers>
      <Events
        upcomingEvents={upcomingEvents}
        eventTypes={eventTypes}
      />
    </Providers>
  )
}
