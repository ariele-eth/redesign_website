import Education from '@/app/pages/Education'
import { Providers } from '@/components/Providers'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

const knowledgeGraphQuery = `*[_type == "knowledgeGraphNode" && isVisible != false]
  | order(coalesce(sortOrder, 9999) asc, title asc)
  {
    _id,
    title,
    level,
    popupContent,
    connections[]->{ _id, title },
    resources[]{ title, kind, "fileUrl": file.asset->url, url, storageUrl }
  }`

const learningTracksQuery = `*[_type == "learningTrackCard" && isVisible != false]
  | order(coalesce(sortOrder, 9999) asc, title asc)
  { _id, title, summary, details, level, ctaLink, nodes[]->{ _id } }`

const startHereQuery = `*[_type == "educationStartHere" && _id == "educationStartHere"][0]{
  entries[]{
    _key,
    label,
    resourceTitle,
    node->{
      _id,
      title,
      level,
      popupContent,
      connections[]->{ _id, title },
      resources[]{ title, kind, "fileUrl": file.asset->url, url, storageUrl }
    }
  }
}`

export default async function EducationPage() {
  const [knowledgeNodes, learningTracks, startHere] = await Promise.all([
    client.fetch(knowledgeGraphQuery),
    client.fetch(learningTracksQuery),
    client.fetch(startHereQuery),
  ])

  return (
    <Providers>
      <Education
        knowledgeNodes={knowledgeNodes}
        learningTracks={learningTracks}
        startHereEntries={startHere?.entries ?? []}
      />
    </Providers>
  )
}
