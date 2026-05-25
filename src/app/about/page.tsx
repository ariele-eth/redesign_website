import About from '@/app/pages/About'
import { Providers } from '@/components/Providers'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

const committeesQuery = `*[_type == "committee"] | order(order asc) {
  _id,
  name,
  purpose,
  coreResponsibilities,
  goals,
  order,
  icon,
  "slug": slug.current
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
    "committee": committee->{ name, "slug": slug.current }
  }`

export default async function AboutPage() {
  const [committees, people, partners, advisors] = await Promise.all([
    client.fetch(committeesQuery),
    client.fetch(peopleQuery),
    client.fetch(partnersQuery),
    client.fetch(advisorsQuery),
  ])

  return (
    <Providers>
      <About committees={committees} people={people} partners={partners} advisors={advisors} />
    </Providers>
  )
}
