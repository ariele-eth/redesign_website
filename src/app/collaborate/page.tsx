import Collaborate from '@/app/pages/Collaborate'
import { Providers } from '@/components/Providers'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

const partnersQuery = `*[_type == "partner" && isVisible == true && showOnCollaborate == true]
  | order(coalesce(sortOrder, 9999) asc, name asc)
  { _id, name, website, logo }`

export default async function CollaboratePage() {
  const partners = await client.fetch(partnersQuery)

  return (
    <Providers>
      <Collaborate partners={partners} />
    </Providers>
  )
}
