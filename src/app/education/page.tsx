import Education from '@/app/pages/Education'
import { Providers } from '@/components/Providers'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

const knowledgeGraphQuery = `*[_type == "knowledgeGraphNode" && isVisible != false]
  | order(coalesce(sortOrder, 9999) asc, title asc)
  {
    _id,
    title,
    popupContent,
    connections[]->{ _id, title },
    resources[]{ title, kind, "fileUrl": file.asset->url, url, storageUrl }
  }`

const learningTracksQuery = `*[_type == "learningTrackCard" && isVisible != false]
  | order(coalesce(sortOrder, 9999) asc, title asc)
  { _id, title, summary, details, ctaLabel, ctaLink }`

export default async function EducationPage() {
  const [knowledgeNodes, learningTracks] = await Promise.all([
    client.fetch(knowledgeGraphQuery),
    client.fetch(learningTracksQuery),
  ])

  return (
    <Providers>
      <Education knowledgeNodes={knowledgeNodes} learningTracks={learningTracks} />
    </Providers>
  )
}
