import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PageSectionHeader } from "@/components/PageSectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";

const joinTracks = [
  {
    id: "01",
    badge: "Active Role",
    title: "Join Committee",
    description:
      "Take ownership inside a high-trust team and help drive strategy, events, and partnerships.",
    perks: [
      "Lead initiatives with direct impact on the club's direction",
      "Access exclusive industry and partner networking opportunities",
      "Build leadership and execution skills in a real organisation",
      "Receive all regular member benefits by default",
    ],
    href: "/join/committee",
    cta: "Apply for Committee",
    featured: true,
  },
  {
    id: "02",
    badge: "General Access",
    title: "Become a Member",
    description:
      "Join a builder-first student network to learn, collaborate, and grow in blockchain with peers at ETH.",
    perks: [
      "Priority access to workshops, talks, and community events",
      "Members-only educational resources and event recordings",
      "Voting rights on key club initiatives and decisions",
      "Connect with an ambitious Web3 community on campus",
    ],
    href: "/join/member",
    cta: "Apply as Member",
    featured: false,
  },
];

const openPositions = [
  {
    title: "Partnerships Associate",
    category: "External Relations",
    description:
      "Source and manage relationships with protocol teams, funds, and ecosystem partners.",
  },
  {
    title: "Workshop Lead",
    category: "Education",
    description:
      "Design and run technical sessions across Ethereum, DeFi, smart contracts, and ZK.",
  },
  {
    title: "Builder Nights Coordinator",
    category: "Events",
    description:
      "Own the cadence and production of our flagship builder-focused community events.",
  },
  {
    title: "Content & Brand Designer",
    category: "Marketing",
    description:
      "Create visual assets and storytelling formats that elevate our campus and industry presence.",
  },
  {
    title: "Operations Associate",
    category: "Internal Affairs",
    description:
      "Support onboarding, planning cycles, and coordination across all active committees.",
  },
  {
    title: "Finance & Legal Analyst",
    category: "Finances & Legal",
    description:
      "Help manage sponsorship flows, budgeting, and governance documentation.",
  },
];

const processSteps = [
  {
    id: "1",
    title: "Submit Application",
    description:
      "Pick your track and send your application with your motivation and background.",
  },
  {
    id: "2",
    title: "Interview Round",
    description:
      "Selected candidates are invited for a short conversation with the relevant team.",
  },
  {
    id: "3",
    title: "Decision & Onboarding",
    description:
      "Receive your decision and get onboarded into projects, channels, and upcoming milestones.",
  },
];

export default function JoinLanding() {
  return (
    <div className="join-page min-h-screen">
      <div className="page-grid-bg" />
      <Navigation />

      <main>
        <section className="join-hero page-hero-shell page-hero-compact">
          <div className="join-hero-inner">
            <ScrollReveal>
              <div className="hero-top-brand">
                <span className="hero-top-line" />
                <span className="hero-top-text">APPLICATIONS OPEN</span>
              </div>

              <h1 className="hero-title-main">
                <span>Join</span>
                <span className="outline">the Club</span>
              </h1>

              <p className="hero-subtext join-hero-subtext">
                Choose how you want to contribute to the ETH Blockchain Club,
                either as a community member or as part of a core committee
                team.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <div className="join-hero-divider" />

        <section className="join-options-section section-sm">
          <div className="container">
            <ScrollReveal>
              <PageSectionHeader
                label="Join Us"
                title="Choose Your Path"
                description="Both tracks connect you to our ecosystem. Committee roles focus on leadership, while membership gives broad access to learning and events."
              />
            </ScrollReveal>

            <ScrollReveal delay={90}>
              <div className="join-split">
                {joinTracks.map((track, idx) => (
                  <article
                    key={track.id}
                    className={`join-option ${track.featured ? "join-option-featured" : ""} ${
                      idx === 0 ? "join-option-left" : ""
                    }`}
                  >
                    <div className="join-option-number">{track.id}</div>
                    <span className="badge join-option-badge">{track.badge}</span>
                    <h3>{track.title}</h3>
                    <p>{track.description}</p>

                    <ul className="join-perks" aria-label={`${track.title} benefits`}>
                      {track.perks.map((perk) => (
                        <li key={perk}>{perk}</li>
                      ))}
                    </ul>

                    <Link
                      href={track.href}
                      className={track.featured ? "hero-cta-primary" : "hero-cta-secondary"}
                    >
                      {track.cta}
                    </Link>
                  </article>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="join-positions-section section-sm">
          <div className="container">
            <ScrollReveal>
              <PageSectionHeader
                label="Open Positions"
                title="Help Build What Comes Next"
                description="Current committee openings where we are actively looking for contributors this semester."
              />
            </ScrollReveal>

            <div className="join-positions-grid">
              {openPositions.map((position, idx) => (
                <ScrollReveal key={position.title} delay={90 + idx * 60}>
                  <article className="card join-position-card">
                    <h3>{position.title}</h3>
                    <span className="badge">{position.category}</span>
                    <p>{position.description}</p>
                    <Link href="/join/committee" className="hero-cta-secondary join-position-link">
                      Learn More
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="join-process-section section-sm">
          <div className="container">
            <ScrollReveal>
              <PageSectionHeader
                label="Application Flow"
                title="Simple, Fast, Transparent"
                description="Our process is intentionally lightweight so strong candidates can start contributing quickly."
              />
            </ScrollReveal>

            <div className="join-process-shell">
              <div className="join-process-line" aria-hidden="true" />
              <div className="join-process-grid">
                {processSteps.map((step, idx) => (
                  <ScrollReveal key={step.id} delay={90 + idx * 80}>
                    <article className="card join-process-step">
                      <span className="join-process-number">{step.id}</span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
