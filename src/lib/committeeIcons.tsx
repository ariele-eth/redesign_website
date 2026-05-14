import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  ChartNoAxesCombined,
  FolderKanban,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  HelpCircle,
  Landmark,
  Leaf,
  Map,
  Megaphone,
  MessagesSquare,
  Network,
  Palette,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  Target,
  UserRoundCog,
  Users,
} from 'lucide-react'

export const committeeIconMap = {
  Network,
  Globe2,
  CalendarDays,
  Users,
  MessagesSquare,
  ShieldCheck,
  Landmark,
  Handshake,
  HeartHandshake,
  Target,
  Search,
  Rocket,
  Settings,
  UserRoundCog,
  Megaphone,
  GraduationCap,
  ChartNoAxesCombined,
  Leaf,
  Map,
  FolderKanban,
  Palette,
} satisfies Record<string, LucideIcon>

export type CommitteeIconName = keyof typeof committeeIconMap

const committeeIconSizeDefaults = {
  small: 13,
  medium: 16,
}

export type CommitteeIconProps = {
  name?: string | null
  className?: string
  size?: number
}

export function CommitteeIcon({
  name,
  className,
  size = committeeIconSizeDefaults.medium,
}: CommitteeIconProps) {
  const Icon = name && name in committeeIconMap ? committeeIconMap[name as CommitteeIconName] : HelpCircle

  return <Icon className={className} size={size} />
}
