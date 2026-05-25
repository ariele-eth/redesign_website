import Home from '@/app/pages/Home'
import { Providers } from '@/components/Providers'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

const homePartnersQuery = `*[_type == "partner" && isVisible != false && showOnHome != false]
  | order(coalesce(sortOrder, 9999) asc, name asc)
  { _id, name, website, logo }`

const homeAdvisorsQuery = `*[_type == "advisor" && isVisible != false && showOnHome != false]
  | order(coalesce(sortOrder, 9999) asc, name asc)
  { _id, name, title, description, logo }`

const homeEventsQuery = `*[_type == "event" && isVisible != false && startsAt >= $now]
  | order(coalesce(sortOrder, 9999) asc, startsAt asc)
  [0...3]
  { _id, title, startsAt, description, "eventType": eventType->title }`

const siteStatsQuery = `*[_type == "siteStats"][0] {
  members,
  events,
  partners,
  committees,
  builders
}`

export default async function RootPage() {
  const now = new Date().toISOString()
  const [partners, advisors, events, siteStats] = await Promise.all([
    client.fetch(homePartnersQuery),
    client.fetch(homeAdvisorsQuery),
    client.fetch(homeEventsQuery, { now }),
    client.fetch(siteStatsQuery),
  ])

  return (
    <Providers>
      <Home partners={partners} advisors={advisors} events={events} siteStats={siteStats} />
    </Providers>
  )
}
