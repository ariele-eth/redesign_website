import Image from 'next/image'
import type { ReactNode } from 'react'

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
}: LogoMarqueeSectionProps) {
  const hasItems = items.length > 0
  const marqueeItems = layout === 'marquee' ? [...items, ...items] : items

  return (
    <section id={id} className={sectionClassName}>
      <ScrollReveal>
        <PageSectionHeader
          label={label}
          title={title}
          description={description}
          align={align}
          className={headerClassName}
        />
      </ScrollReveal>

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
                            sizes="(max-width: 980px) 105px, 105px"
                            className={imageClassName}
                          />
                        ) : (
                          <span className={imageClassName}>{item.name}</span>
                        )}
                      </div>
                      <div className={descriptionClassName}>
                        <h3>{item.name}</h3>
                        {item.title ? <p className="advisor-card-title">{item.title}</p> : null}
                        <p>{item.description ?? 'Academic and industry advisor supporting the club.'}</p>
                      </div>
                    </article>
                  )
                })
              ) : (
                <div className={itemClassName}>
                  <div className={chipClassName}>
                    <span className={imageClassName}>No published entries yet</span>
                  </div>
                </div>
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
                        width={240}
                        height={88}
                        sizes="240px"
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
                <div className={chipClassName}>
                  <span className="partner-chip-logo" style={{ fontSize: 12 }}>
                    No published entries yet
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  )
}