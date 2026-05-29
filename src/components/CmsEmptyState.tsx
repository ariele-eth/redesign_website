import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'

import { cn } from '@/lib/utils'

type CmsEmptyStateProps = {
  title: string
  description?: string
  icon?: LucideIcon
  className?: string
}

export function CmsEmptyState({
  title,
  description,
  icon: Icon = Inbox,
  className,
}: CmsEmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('rounded-2xl border px-6 py-8 text-center', className)}
      style={{
        borderColor: 'var(--border)',
        background: 'rgba(10, 14, 30, 0.42)',
      }}
    >
      <div
        className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full"
        style={{ background: 'rgba(91, 126, 255, 0.12)', color: 'var(--muted)' }}
      >
        <Icon size={17} strokeWidth={1.8} />
      </div>
      <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
        {title}
      </p>
      {description ? (
        <p className="mx-auto mt-1 max-w-2xl text-xs" style={{ color: 'var(--dim)' }}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
