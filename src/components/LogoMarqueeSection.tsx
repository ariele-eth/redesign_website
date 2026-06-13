import Image from 'next/image'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Grid3X3 } from 'lucide-react'

import { CmsEmptyState } from '@/components/CmsEmptyState'
import { PageSectionHeader } from '@/components/PageSectionHeader'
import { ScrollReveal } from '@/components/ScrollReveal'
import { urlFor } from '@/sanity/lib/image'

type LogoEntity = {
  _id: string
  name: string
  title?: string | null
  website?: string | null
  logo?: unknown
  description?: string | null
}

type LogoMarqueeSectionProps = {
  id?: string
  label: string
  title: ReactNode
  description?: ReactNode
  items: LogoEntity[]
  linkItems?: boolean
  layout?: 'marquee' | 'cards'
  sectionClassName: string
  wrapperClassName: string
  trackClassName: string
  chipClassName: string
  itemClassName?: string
  descriptionClassName?: string
  imageClassName?: string
  headerClassName?: string
  align?: 'left' | 'center'
  emptyStateTitle?: string
  emptyStateDescription?: string
  emptyStateIcon?: LucideIcon
}

function getLogoUrl(logo: unknown) {
  if (!logo) return null
  return urlFor(logo as never).width(320).height(120).fit('max').auto('format').quality(92).url()
}

function getAdvisorAvatarUrl(logo: unknown) {
  if (!logo) return null
  return urlFor(logo as never).width(320).height(320).fit('crop').auto('format').quality(88).url()
}

export function LogoMarqueeSection({
  id,
  label,
  title,
  description,
  items,
  linkItems = true,
  layout = 'marquee',
  sectionClassName,
  wrapperClassName,
  trackClassName,
  chipClassName,
  itemClassName,
  descriptionClassName,
  imageClassName,
  headerClassName,
  align = 'left',
  emptyStateTitle = 'No items to display yet.',
  emptyStateDescription,
  emptyStateIcon = Grid3X3,
}: LogoMarqueeSectionProps) {
  const hasItems = items.length > 0
  const marqueeItems = layout === 'marquee' ? [...items, ...items] : items
  const resolvedHeaderClassName = (headerClassName ?? '')
    .split(/\s+/)
    .filter((token) => token && token !== 'partners-header' && token !== 'about-section-header-block')
    .join(' ')

  return (
    <section id={id} className={sectionClassName}>
      <div className="container">
        <ScrollReveal>
          <PageSectionHeader
            label={label}
            title={title}
            description={description}
            align={align}
            className={resolvedHeaderClassName}
          />
        </ScrollReveal>
      </div>

      <ScrollReveal delay={120}>
        <div className={wrapperClassName}>
          {layout === 'cards' ? (
            <div className={trackClassName}>
              {hasItems ? (
                items.map((item, idx) => {
                  const logoUrl = getAdvisorAvatarUrl(item.logo)

                  return (
                    <article key={`${item._id}-${idx}`} className={itemClassName}>
                      <div className={chipClassName}>
                        {logoUrl ? (
                          <Image
                            src={logoUrl}
                            alt={item.name}
                            fill
                            sizes="(max-width: 980px) 140px, 140px"
                            className={imageClassName}
                          />
                        ) : (
                          <span className={imageClassName}>{item.name}</span>
                        )}
                      </div>
                      <div className={descriptionClassName}>
                        <h3>{item.name}</h3>
                        {item.title ? <p className="advisor-card-title">{item.title}</p> : null}
                        {item.description?.trim() ? <p>{item.description}</p> : null}
                      </div>
                    </article>
                  )
                })
              ) : (
                <CmsEmptyState
                  title={emptyStateTitle}
                  description={emptyStateDescription}
                  icon={emptyStateIcon}
                  className="mx-auto w-full max-w-4xl"
                />
              )}
            </div>
          ) : (
            <div className={trackClassName}>
              {hasItems ? (
                marqueeItems.map((item, idx) => {
                  const logoUrl = getLogoUrl(item.logo)
                  const content = logoUrl ? (
                    <span className="partner-chip-logo-shell">
                      <Image
                        src={logoUrl}
                        alt={item.name}
                        width={320}
                        height={104}
                        sizes="320px"
                        className="partner-chip-logo"
                      />
                    </span>
                  ) : (
                    <span className="partner-chip-logo" style={{ fontSize: 12 }}>
                      {item.name}
                    </span>
                  )

                  if (linkItems && item.website) {
                    return (
                      <a
                        key={`${item._id}-${idx}`}
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={chipClassName}
                      >
                        {content}
                      </a>
                    )
                  }

                  return (
                    <div key={`${item._id}-${idx}`} className={chipClassName}>
                      {content}
                    </div>
                  )
                })
              ) : (
                <CmsEmptyState
                  title={emptyStateTitle}
                  description={emptyStateDescription}
                  icon={emptyStateIcon}
                  className="mx-auto w-full max-w-4xl"
                />
              )}
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  )
}
