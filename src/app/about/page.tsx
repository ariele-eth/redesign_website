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

const advisorsQuery = `*[_type == "advisor" && isVisible != false && showOnAbout != false]
  | order(coalesce(sortOrder, 9999) asc, name asc)
  { _id, name, title, description, logo }`

const peopleQuery = `*[_type == "person" && isVisible != false]
  | order(coalesce(sortOrder, 9999) asc, name asc)
  {
    _id,
    name,
    role,
    bio,
    isBoardMember,
    image,
    socials[]{
      platform,
      url
    },
    "groups": groups[]->{ _id, name, "slug": slug.current, groupType },
    "committee": committee->{ _id, name, "slug": slug.current, groupType }
  }`

export default async function AboutPage() {
  const [committees, people, advisors, siteStats] = await Promise.all([
    client.fetch(committeesQuery),
    client.fetch(peopleQuery),
    client.fetch(advisorsQuery),
    client.fetch(siteStatsQuery),
  ])

  return (
    <Providers>
      <About
        committees={committees}
        people={people}
        advisors={advisors}
        siteStats={siteStats}
      />
    </Providers>
  )
}
