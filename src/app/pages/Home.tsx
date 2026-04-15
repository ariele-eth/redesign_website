import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageSectionHeader } from "@/components/PageSectionHeader";
import Link from "next/link";
import Image from "next/image";
import { Layers3, Search, BriefcaseBusiness, Users } from "lucide-react";

const partners = [
  {
    name: "ETH Zurich",
    logo: "/assets/partners/eth.png",
    href: "https://ethz.ch",
  },
  {
    name: "ETH Zurich FinsureTech Hub",
    logo: "/assets/partners/ETHZ_FinsureTech_Hub.png",
    href: "https://finsuretech.ethz.ch",
  },
  {
    name: "ETH Student Project House",
    logo: "/assets/partners/ETH_Student_Project_House.png",
    href: "https://sph.ethz.ch",
  },
  {
    name: "Blockchain Student Association EPFL",
    logo: "/assets/partners/Blockchain_Student_Association.svg",
    href: "https://www.bsaepfl.ch",
  },
  {
    name: "VSETH",
    logo: "/assets/partners/VSETH.svg",
    href: "https://vseth.ethz.ch",
  },
];

const pillars = [
  {
    title: "Education",
    description:
      "Structured learning tracks from blockchain basics to advanced protocol development.",
    icon: Layers3,
  },
  {
    title: "Research",
    description:
      "Collaborating with ETH researchers on distributed systems, cryptography and ZK proofs.",
    icon: Search,
  },
  {
    title: "Industry",
    description:
      "Bridging academia and the Web3 industry through partnerships and live projects.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Community",
    description:
      "A vibrant ecosystem of builders, thinkers, and innovators united by Web3.",
    icon: Users,
  },
];

const comingUp = [
  {
    dateDay: "12",
    dateMonth: "APR",
    title: "ZK Systems Deep Dive",
    description: "A technical session on practical zero-knowledge systems and how they are deployed at scale.",
    type: "Workshop",
  },
  {
    dateDay: "19",
    dateMonth: "APR",
    title: "Builder Night: ETH x Industry",
    description: "An evening with partners and founders focused on shipping products from campus to market.",
    type: "Networking",
  },
  {
    dateDay: "03",
    dateMonth: "MAY",
    title: "Research Forum",
    description: "Open presentations on cryptography, distributed systems and protocol design from student teams.",
    type: "Research",
  },
];

export default function Home() {
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
              Join the Club →
            </Link>
            <Link href="/events" className="hero-cta-secondary">
              Explore Events
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>500+</strong>
              <span>Members</span>
            </div>
            <div>
              <strong>40+</strong>
              <span>Events / Year</span>
            </div>
            <div>
              <strong>20+</strong>
              <span>Partners</span>
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
              src="/ethbcc_logo.png.png"
              alt="ETH Blockchain Club Logo"
              width={310}
              height={310}
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
              <strong>500+</strong>
              <span>Active Builders</span>
            </article>
            <article className="vision-stat-card">
              <strong>40+</strong>
              <span>Events Per Year</span>
            </article>
            <article className="vision-stat-card">
              <strong>20+</strong>
              <span>Industry Partners</span>
            </article>
            <article className="vision-stat-card">
              <strong>7</strong>
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
              description="We connect education, research, industry, and community to establish ETH Zurich as Europe&apos;s leading blockchain hub."
            />
            <Link href="/about" className="pillars-about-link">
              About the Club →
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

      <section className="partners-section">
        <ScrollReveal>
          <PageSectionHeader
            label="Trusted By"
            title="Our Partners"
            description="Partners are core to our impact. Scroll to discover the ecosystem backing our community."
            className="partners-header"
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="partner-marquee-wrap">
          <div className="partner-marquee-track">
            {[...partners, ...partners, ...partners].map((partner, idx) => (
              <a
                key={`${partner.name}-${idx}`}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-marquee-chip"
              >
                <Image src={partner.logo} alt={partner.name} width={95} height={28} className="partner-chip-logo" />
              </a>
            ))}
          </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="coming-up-section">
        <ScrollReveal>
          <PageSectionHeader label="Coming Up" title="Upcoming Events" className="coming-up-head" />
        </ScrollReveal>

        <div className="coming-up-grid">
          {comingUp.map((event, idx) => (
            <ScrollReveal key={`${event.dateDay}-${event.title}`} delay={80 + idx * 90}>
              <article className="coming-card">
                <div className="coming-date">
                  <strong>{event.dateDay}</strong>
                  <span>{event.dateMonth}</span>
                </div>

                <div className="coming-body">
                  <p className="coming-type">{event.type}</p>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
