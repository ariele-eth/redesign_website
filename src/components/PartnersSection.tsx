"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { PageSectionHeader } from "@/components/PageSectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type PartnerPlacement = "home" | "about" | "collaborate";

type PartnerItem = {
  _id: string;
  name: string;
  website?: string | null;
  logo?: unknown;
  invertLogo?: boolean | null;
  logoClassName?: string | null;
};

type PartnersSectionProps = {
  id?: string;
  placement: PartnerPlacement;
  eyebrow?: string;
  heading?: string;
  description?: string;
  align?: "left" | "center";
  sectionClassName?: string;
  headerClassName?: string;
};

const LOGO_BOX_WIDTH = 280;
const LOGO_BOX_HEIGHT = 64;
const LOGO_CDN_HEIGHT = LOGO_BOX_HEIGHT * 2;

const partnerQueryByPlacement: Record<PartnerPlacement, string> = {
  home: `*[_type == "partner" && isVisible != false && showOnHome != false]
    | order(coalesce(sortOrder, 9999) asc, name asc)
    { _id, name, website, logo, invertLogo, logoClassName }`,
  about: `*[_type == "partner" && isVisible != false && showOnAbout != false]
    | order(coalesce(sortOrder, 9999) asc, name asc)
    { _id, name, website, logo, invertLogo, logoClassName }`,
  collaborate: `*[_type == "partner" && isVisible != false && showOnCollaborate != false]
    | order(coalesce(sortOrder, 9999) asc, name asc)
    { _id, name, website, logo, invertLogo, logoClassName }`,
};

function getLogoUrl(logo: unknown) {
  if (!logo) return null;
  return urlFor(logo as never)
    .width(LOGO_BOX_WIDTH * 2)
    .height(LOGO_CDN_HEIGHT)
    .fit("max")
    .auto("format")
    .quality(92)
    .url();
}

export function PartnersSection({
  id,
  placement,
  eyebrow = "Trusted By",
  heading = "Our Partners",
  description,
  align = "center",
  sectionClassName,
  headerClassName,
}: PartnersSectionProps) {
  const [partners, setPartners] = useState<PartnerItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    void client
      .fetch<PartnerItem[]>(partnerQueryByPlacement[placement])
      .then((result) => {
        if (cancelled) return;
        setPartners(Array.isArray(result) ? result : []);
      })
      .catch(() => {
        if (cancelled) return;
        setPartners([]);
      });

    return () => {
      cancelled = true;
    };
  }, [placement]);

  if (partners === null || partners.length === 0) {
    return null;
  }

  const normalizedLabel = eyebrow.trim().toLowerCase();
  const normalizedTitle = heading.trim().toLowerCase();
  const resolvedLabel =
    normalizedTitle === normalizedLabel ? "Trusted By" : eyebrow;
  const largeGridClass = partners.length % 4 === 1 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <section id={id} className={`${sectionClassName ?? ""} bg-transparent`}>
      <ScrollReveal>
        <PageSectionHeader
          label={resolvedLabel}
          title={heading}
          description={description}
          align={align}
          className={headerClassName}
        />
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <div
          className={`mx-auto mt-4 grid w-full max-w-[var(--page-width)] grid-cols-2 gap-[var(--r)] px-[var(--page-pad-x)] md:grid-cols-3 ${largeGridClass}`}
        >
          {partners.map((partner) => {
            const logoUrl = getLogoUrl(partner.logo);
            const isSvgLogo = logoUrl ? /\.svg(\?|$)/i.test(logoUrl) : false;
            const cardClasses =
              "group flex items-center justify-center rounded-[var(--rl)] border border-[var(--border)] bg-[var(--surface)] px-[calc(var(--r)*2)] py-[calc(var(--r)*0.8)] transition-[var(--transition-smooth)] hover:scale-[1.01] hover:border-[var(--accent)]";
            const partnerLogoClass = partner.logoClassName?.trim() ?? "";
            const contrastClass = partner.invertLogo ? "brightness-0 invert opacity-80" : "opacity-95";

            const cardContent = logoUrl ? (
              <div className="flex w-full items-center justify-center">
                <div className="relative h-16 w-full max-w-[80%]">
                <Image
                  src={logoUrl}
                  alt={partner.name}
                  fill
                  unoptimized={isSvgLogo}
                  sizes="(max-width: 768px) 42vw, (max-width: 1200px) 30vw, 280px"
                  className={`object-contain transition-[var(--transition-smooth)] group-hover:opacity-100 ${contrastClass}${partnerLogoClass ? ` ${partnerLogoClass}` : ""}`}
                />
                </div>
              </div>
            ) : (
              <span className="text-center text-sm text-[var(--text-secondary)]">{partner.name}</span>
            );

            if (partner.website) {
              return (
                <a
                  key={partner._id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClasses}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={partner._id} className={cardClasses}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
