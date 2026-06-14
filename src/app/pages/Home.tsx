import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EventCard } from "@/components/EventCard";
import { CmsEmptyState } from "@/components/CmsEmptyState";
import { PageSectionHeader } from "@/components/PageSectionHeader";
import { LogoMarqueeSection } from "@/components/LogoMarqueeSection";
import { PartnersSection } from "@/components/PartnersSection";
import Link from "next/link";
import Image from "next/image";
import { Layers3, BriefcaseBusiness, Users, CalendarDays } from "lucide-react";

type NetworkEntity = {
  _id: string;
  name: string;
  title?: string | null;
  website?: string | null;
  logo?: unknown;
  description?: string | null;
};

type UpcomingEvent = {
  _id: string;
  title: string;
  startsAt: string;
  endsAt?: string | null;
  location?: string | null;
  registrationLink?: string | null;
  description?: unknown;
  eventType?: { _id: string; title: string; slug?: string | null } | string | null;
};

type HomeProps = {
  advisors: NetworkEntity[];
  events: UpcomingEvent[];
  siteStats?: {
    members?: number;
    events?: number;
    collaborators?: number;
    committees?: number;
    teamMembers?: number;
  } | null;
};

const pillars = [
  {
    title: "Education",
    description:
      "Structured learning tracks, curated resources, and a growing knowledge hub - all available on our dedicated Education page.",
    icon: Layers3,
  },
  {
    title: "Industry",
    description:
      "Long-term partnerships with leading Web3 companies, translated into workshops, office visits, and live collaborations for our members.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Events",
    description:
      "From workshops and hackathons to panel discussions and builders meetups  - a programme that keeps the community active every few weeks.",
    icon: CalendarDays,
  },
  {
    title: "Community",
    description:
      "A tight-knit group of ETH students building together across faculties - connected by a shared interest in the decentralised economy.",
    icon: Users,
  },
];

export default function Home({ advisors, events, siteStats }: HomeProps) {
  const formatPlus = (value?: number) =>
    typeof value === "number" ? `${value}+` : "--";
  const formatPlain = (value?: number) =>
    typeof value === "number" ? String(value) : "--";

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="page-grid-bg" style={{ zIndex: 0 }} />
      <Navigation />

      <section className="hero-section page-hero-shell">
        <div className="hero-left">
          <div className="hero-top-brand">
            <span className="hero-top-line" />
            <span className="hero-top-text">ETH ZURICH · BLOCKCHAIN CLUB</span>
          </div>

          <h1 className="hero-title-main">
            <span>Building</span>
            <span className="outline">the Future</span>
            <span>of Web3</span>
          </h1>

          <p className="hero-subtext">
            Switzerland&apos;s most ambitious blockchain community where the best minds at ETH Zurich meet the decentralised economy.
          </p>

          <div className="hero-actions">
            <Link href="/join" className="hero-cta-primary">
              Join the Club
            </Link>
            <Link href="/events" className="hero-cta-secondary">
              Explore Events
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{formatPlus(siteStats?.members)}</strong>
              <span>Members</span>
            </div>
            <div>
              <strong>{formatPlus(siteStats?.events)}</strong>
              <span>Events / Year</span>
            </div>
            <div>
              <strong>{formatPlus(siteStats?.collaborators)}</strong>
              <span>Collaborators</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-hex" />
          <div className="hero-orb" />
          <div className="hero-ring ring-a">
            <span className="orbit-dot" />
          </div>
          <div className="hero-ring ring-b">
            <span className="orbit-dot2" />
          </div>
          <div className="hero-logo-shell">
            <Image
              src="/ethbcc.png"
              alt="ETH Blockchain Club Logo"
              width={480}
              height={359}
              className="hero-logo-image"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </section>

      <section className="vision-section-home">
        <div className="vision-bg-word">VISION</div>
        <div className="vision-inner-home">
          <ScrollReveal>
            <PageSectionHeader
              label="Our Vision"
              title={
                <span className="vision-quote-home">
                  Establishing ETH Zurich as <span className="vision-accent">Europe&apos;s</span> <span className="vision-accent">leading</span> blockchain innovation hub
                </span>
              }
              description={
                <span className="vision-copy-home">
                  Where academic excellence meets the decentralised economy — we build the bridge between world-class research and real-world Web3 applications.
                </span>
              }
            />
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="vision-stats-home">
              <article className="vision-stat-card">
                <strong>{formatPlus(siteStats?.teamMembers)}</strong>
                <span>Team Members</span>
              </article>
              <article className="vision-stat-card">
                <strong>{formatPlus(siteStats?.events)}</strong>
                <span>Events Per Year</span>
              </article>
              <article className="vision-stat-card">
                <strong>{formatPlus(siteStats?.collaborators)}</strong>
                <span>Industry Collaborators</span>
              </article>
              <article className="vision-stat-card">
                <strong>{formatPlain(siteStats?.committees)}</strong>
                <span>Active Committees</span>
              </article>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pillars-section">
        <ScrollReveal>
          <div className="pillars-left">
            <PageSectionHeader
              label="What We Do"
              title="Four pillars, one mission"
              description="We connect education, events, industry, and community to establish ETH Zurich as Europe&apos;s leading blockchain hub."
            />
            <Link href="/about" className="pillars-about-link">
              About the Club
            </Link>
          </div>
        </ScrollReveal>

        <div className="pillars-grid">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={90 + idx * 80}>
                <article className="pillar-card">
                  <Icon size={20} strokeWidth={1.8} className="pillar-icon" />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <LogoMarqueeSection
        label="Trusted By"
        title="Advisors"
        description="Academic and industry advisors supporting the club’s direction and work."
        items={advisors}
        linkItems={false}
        layout="cards"
        align="center"
        sectionClassName="partners-section partners-section-advisors"
        wrapperClassName="advisors-wrap"
        trackClassName="advisors-grid"
        chipClassName="advisor-card-visual"
        itemClassName="advisor-card"
        descriptionClassName="advisor-card-copy"
        imageClassName="advisor-card-image"
        headerClassName="partners-header"
        emptyStateTitle="No advisors to display yet."
        emptyStateDescription="Advisor profiles will appear here once they are published."
        emptyStateIcon={Users}
      />

      <div className="join-hero-divider" aria-hidden="true" />

      <PartnersSection
        placement="home"
        eyebrow="Trusted By"
        heading="Our Partners"
        description="Partners are core to our impact. Scroll to discover the ecosystem backing our community."
        align="center"
        sectionClassName="partners-section partners-section-partners"
        headerClassName="partners-header"
      />

      <section className="coming-up-section">
        <ScrollReveal>
          <PageSectionHeader label="Coming Up" title="Upcoming Events" className="coming-up-head" />
        </ScrollReveal>

        {events.length > 0 ? (
          <div className="coming-up-grid">
            {events.map((event, idx) => (
              <ScrollReveal key={event._id} delay={80 + idx * 90}>
                <EventCard event={event} variant="compact" className="h-full" />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <CmsEmptyState
            title="No upcoming events right now — stay tuned."
            description="New events will appear here as soon as they are published."
            icon={CalendarDays}
            className="mx-auto mt-6 max-w-4xl"
          />
        )}
      </section>

      <Footer />
    </div>
  );
}
