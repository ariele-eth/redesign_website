import Collaborate from '@/app/pages/Collaborate'
import { Providers } from '@/components/Providers'

export const revalidate = 60

export default async function CollaboratePage() {
  return (
    <Providers>
      <Collaborate />
    </Providers>
  )
}
