import About from '@/app/pages/About'
import { Providers } from '@/components/Providers'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

const committeesQuery = `*[_type == "committee"] | order(order asc) {
  _id,
  name,
  groupType,
  description,
  "yourRole": purpose,
  "whatYouBring": coreResponsibilities,
  "whatToExpect": goals,
  order,
  icon,
  "slug": slug.current
}`

const siteStatsQuery = `*[_type == "siteStats"][0] {
  members,
  events,
  partners,
  committees,
  builders
}`

const partnersQuery = `*[_type == "partner" && isVisible != false && showOnAbout != false]
  | order(coalesce(sortOrder, 9999) asc, name asc)
  { _id, name, website, logo }`

const advisorsQuery = `*[_type == "advisor" && isVisible != false && showOnAbout != false]
  | order(coalesce(sortOrder, 9999) asc, name asc)
  { _id, name, title, logo }`

const peopleQuery = `*[_type == "person" && isVisible != false]
  | order(coalesce(sortOrder, 9999) asc, name asc)
  {
    _id,
    name,
    role,
    bio,
    isBoardMember,
    image,
    "groups": groups[]->{ _id, name, "slug": slug.current, groupType },
    "committee": committee->{ _id, name, "slug": slug.current, groupType }
  }`

export default async function AboutPage() {
  const [committees, people, partners, advisors, siteStats] = await Promise.all([
    client.fetch(committeesQuery),
    client.fetch(peopleQuery),
    client.fetch(partnersQuery),
    client.fetch(advisorsQuery),
    client.fetch(siteStatsQuery),
  ])

  return (
    <Providers>
      <About
        committees={committees}
        people={people}
        partners={partners}
        advisors={advisors}
        siteStats={siteStats}
      />
    </Providers>
  )
}
