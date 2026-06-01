"use client";

import { useEffect, useState } from "react";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { PageSectionHeader } from "@/components/PageSectionHeader";
import { client } from "@/sanity/lib/client";
import { dataset, projectId } from "@/sanity/env";

type PartnerPlacement = "home" | "about" | "collaborate";

type PartnerLogo = {
  asset?: {
    _id?: string;
    url?: string | null;
  } | null;
} | null;

type PartnerItem = {
  _id: string;
  name: string;
  logo?: PartnerLogo;
  url?: string | null;
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

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

const partnerQuery = `*[_type == "partner"] {
  _id,
  name,
  logo { asset->{ url } },
  "url": coalesce(url, website)
}`;

function getLogoUrl(logo: PartnerLogo | undefined) {
  if (!logo) return null;

  try {
    return imageBuilder
      .image(logo as SanityImageSource)
      .width(280)
      .height(96)
      .fit("max")
      .auto("format")
      .quality(92)
      .url();
  } catch {
    return logo.asset?.url ?? null;
  }
}

type PartnerCardModel = {
  _id: string;
  name: string;
  logoUrl: string;
  url?: string | null;
};

function normalizeExternalUrl(url?: string | null) {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  return `https://${trimmed}`;
}

function PartnerCard({ partner }: { partner: PartnerCardModel }) {
  const cardClasses =
    "group flex h-[100px] flex-col items-center justify-center rounded-[10px] border border-[1px] border-[rgba(104,126,246,0.18)] bg-[var(--surface)] px-8 py-6 transition-colors duration-200 hover:bg-[#1a2435] hover:border-[rgba(78,142,247,0.35)]";
  const normalizedUrl = normalizeExternalUrl(partner.url);

  const cardContent = (
    <img
      src={partner.logoUrl}
      alt={partner.name}
      loading="lazy"
      decoding="async"
      className="block h-auto w-auto max-h-[56px] max-w-full object-contain opacity-75 [filter:brightness(0)_invert(1)] transition duration-200 group-hover:opacity-100"
    />
  );

  if (normalizedUrl) {
    return (
      <a
        href={normalizedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        {cardContent}
      </a>
    );
  }

  return <div className={cardClasses}>{cardContent}</div>;
}

export function PartnersSection({
  id,
  placement: _placement,
  eyebrow = "EXTERNAL NETWORK",
  heading = "Partners",
  description = "Industry and research collaborators backing the club.",
  align = "left",
  sectionClassName,
  headerClassName,
}: PartnersSectionProps) {
  const [partners, setPartners] = useState<PartnerItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    void client
      .fetch<PartnerItem[]>(partnerQuery)
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
  }, [_placement]);

  const resolvedHeaderClassName = (headerClassName ?? "")
    .split(/\s+/)
    .filter((token) => token && token !== "partners-header" && token !== "about-section-header-block")
    .join(" ");

  if (partners === null) {
    return (
      <section id={id} className={`${sectionClassName ?? ""} py-16 md:py-20`}>
        <div className="container">
          <PageSectionHeader
            label={eyebrow}
            title={heading}
            description={description}
            align={align}
            className={resolvedHeaderClassName}
          />

          <div className="mt-8 grid items-stretch grid-cols-1 gap-3 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`partner-skeleton-${index}`}
                className="h-[100px] animate-pulse rounded-[10px] border border-[0.5px] border-[rgba(255,255,255,0.09)] bg-[#131a26]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const partnerCards = partners.reduce<PartnerCardModel[]>((acc, partner) => {
    const logoUrl = getLogoUrl(partner.logo);
    if (!logoUrl) return acc;

    acc.push({
      _id: partner._id,
      name: partner.name,
      logoUrl,
      url: partner.url,
    });

    return acc;
  }, []);

  if (partnerCards.length === 0) {
    return null;
  }

  const remainder = partnerCards.length % 3;
  const fullRowCount = remainder === 0 ? partnerCards.length : partnerCards.length - remainder;
  const fullRows = partnerCards.slice(0, fullRowCount);
  const lastRow = partnerCards.slice(fullRowCount);

  return (
    <section id={id} className={`${sectionClassName ?? ""} py-16 md:py-20`}>
      <div className="container">
        <PageSectionHeader
          label={eyebrow}
          title={heading}
          description={description}
          align={align}
          className={resolvedHeaderClassName}
        />

        {fullRows.length > 0 && (
          <div className="mt-8 grid items-stretch grid-cols-1 gap-3 md:grid-cols-3">
            {fullRows.map((partner) => (
              <PartnerCard key={partner._id} partner={partner} />
            ))}
          </div>
        )}

        {lastRow.length > 0 && (
          <div className={`${fullRows.length > 0 ? "mt-3" : "mt-8"} flex flex-wrap items-stretch justify-center gap-3`}>
            {lastRow.map((partner) => (
              <div key={partner._id} className="w-full md:w-[calc((100%-24px)/3)]">
                <PartnerCard partner={partner} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
