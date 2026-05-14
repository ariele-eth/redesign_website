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
  const [committees, people] = await Promise.all([
    client.fetch(committeesQuery),
    client.fetch(peopleQuery),
  ])

  return (
    <Providers>
      <About committees={committees} people={people} />
    </Providers>
  )
}
