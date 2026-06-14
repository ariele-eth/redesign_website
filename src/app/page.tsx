import Home from '@/app/pages/Home'
import { Providers } from '@/components/Providers'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

const homeAdvisorsQuery = `*[_type == "advisor" && isVisible != false && showOnHome != false]
  | order(coalesce(sortOrder, 9999) asc, name asc)
  { _id, name, title, description, logo }`

const homeEventsQuery = `*[_type == "event" && isVisible != false && startsAt >= $now]
  | order(coalesce(sortOrder, 9999) asc, startsAt asc)
  [0...3]
  { _id, title, startsAt, endsAt, location, description, registrationLink, "eventType": eventType->{ _id, title, "slug": slug.current } }`

const siteStatsQuery = `coalesce(
  *[_type == "siteStats" && _id == "siteStats"][0],
  *[_type == "siteStats"][0]
) {
  members,
  events,
  "collaborators": coalesce(collaborators, partners),
  committees,
  "teamMembers": coalesce(teamMembers, builders)
}`

export default async function RootPage() {
  const now = new Date().toISOString()
  const [advisors, events, siteStats] = await Promise.all([
    client.fetch(homeAdvisorsQuery),
    client.fetch(homeEventsQuery, { now }),
    client.fetch(siteStatsQuery),
  ])

  return (
    <Providers>
      <Home advisors={advisors} events={events} siteStats={siteStats} />
    </Providers>
  )
}
