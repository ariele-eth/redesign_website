import { permanentRedirect } from 'next/navigation'

export const runtime = 'edge'

export default function StudioPage() {
  // Keep the main Cloudflare worker small by hosting Studio separately.
  permanentRedirect('https://eth-bc-portal-studio.sanity.studio/')
}
