"use client";

import { useEffect, useMemo, useState } from "react";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Nl2Br } from "@/components/Nl2Br";
import { PageSectionHeader } from "@/components/PageSectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LogoMarqueeSection } from "@/components/LogoMarqueeSection";
import { CommitteeIcon } from "@/lib/committeeIcons";

type Committee = {
  _id: string;
  name: string;
  slug?: string | null;
  purpose?: string | null;
  coreResponsibilities?: string | string[] | null;
  goals?: string | string[] | null;
  order?: number | null;
  icon?: string | null;
};

type Person = {
  _id: string;
  name: string;
  role: string;
  bio?: string | null;
  committee?: Committee | null;
};

type AboutProps = {
  committees: Committee[];
  people: Person[];
  partners: Array<{ _id: string; name: string; website?: string | null; logo?: unknown }>;
  advisors: Array<{ _id: string; name: string; title?: string | null; description?: string | null; logo?: unknown }>;
};

type CommitteeSection = {
  id: string;
  title: string;
  icon?: string | null;
  subtitle: string;
  content: Array<{ label: string; text: string }>;
};

type CommitteeNodeData = {
  id: string;
  icon?: string | null;
  lines: string[];
};

const heroStats = [
  { value: "500+", label: "Members", note: "active contributors this semester", meter: 92, color: "var(--accent)" },
  { value: "7", label: "Committees", note: "delivery teams running in parallel", meter: 74, color: "var(--accent2)" },
  { value: "40+", label: "Events/year", note: "lectures, labs, and builder nights", meter: 81, color: "var(--highlight)" },
  { value: "20+", label: "Partners", note: "industry and academic collaborators", meter: 68, color: "var(--text)" },
];

function splitCommitteeName(name: string) {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length <= 1) return [name];
  const last = parts.pop() as string;
  return [parts.join(" "), last];
}

function formatCommitteeText(value?: string | string[] | null) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join("\n") || "--";
  }

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return "--";
}

function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return parts.map((part) => part[0]).join("").slice(0, 3).toUpperCase();
}

function CommitteeAccordion({
  section,
  isOpen,
  onToggle,
}: {
  section: CommitteeSection;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div id={section.id} className={`acc-item ${isOpen ? "open" : ""}`}>
      <button type="button" className="acc-header" onClick={() => onToggle(section.id)}>
        <div className="acc-header-l">
          <div className="acc-ico">
            <CommitteeIcon name={section.icon} size={16} className="about-acc-icon" />
          </div>
          <div>
            <div className="acc-title">{section.title}</div>
            <div className="acc-sub">{section.subtitle}</div>
          </div>
        </div>
        <div className="acc-arrow">⌄</div>
      </button>
      <div className="acc-body">
        {section.content.map((item) => (
          <div key={item.label} className="acc-sub-card">
            <div className="label">{item.label}</div>
            <p><Nl2Br text={item.text} /></p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommitteeNode({
  id,
  icon,
  lines,
  onClick,
}: {
  id: string;
  icon?: string | null;
  lines: string[];
  onClick: (id: string) => void;
}) {
  return (
    <button type="button" className="org-committee-node" onClick={() => onClick(id)} title="Click to explore">
      <div className="org-committee-icon">
        <CommitteeIcon name={icon} size={13} />
      </div>
      <span>
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    </button>
  );
}

export default function About({ committees, people, partners, advisors }: AboutProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openAccordionId, setOpenAccordionId] = useState("");
  const [activeStat, setActiveStat] = useState(0);

  const orderedCommittees = useMemo(
    () =>
      [...committees].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999)),
    [committees]
  );

  const committeeSections: CommitteeSection[] = useMemo(
    () =>
      orderedCommittees.map((committee) => {
        const purposeText = formatCommitteeText(committee.purpose)

        return {
          id: `committee-${committee._id}`,
          title: committee.name,
          icon: committee.icon,
          subtitle: purposeText === "--" ? "" : purposeText,
          content: [
            { label: "Purpose", text: purposeText },
            { label: "Core responsibilities", text: formatCommitteeText(committee.coreResponsibilities) },
            { label: "Goals", text: formatCommitteeText(committee.goals) },
          ],
        }
      }),
    [orderedCommittees]
  );

  const committeeNodes: CommitteeNodeData[] = useMemo(
    () =>
      orderedCommittees.map((committee) => ({
        id: `committee-${committee._id}`,
        icon: committee.icon,
        lines: splitCommitteeName(committee.name),
      })),
    [orderedCommittees]
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = window.scrollY + element.getBoundingClientRect().top - 84;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStat((prev) => (prev + 1) % heroStats.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!openAccordionId && committeeSections.length > 0) {
      setOpenAccordionId(committeeSections[0].id);
    }
  }, [committeeSections, openAccordionId]);

  const visibleTeamMembers = useMemo(() => {
    if (activeFilter === "all") return people;
    return people.filter((member) => member.committee?.slug === activeFilter);
  }, [activeFilter, people]);

  const scrollToCommittee = (id: string) => {
    setOpenAccordionId(id);
    const element = document.getElementById(id);
    if (!element) return;

    const top = window.scrollY + element.getBoundingClientRect().top - 84;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="about-page min-h-screen">
      <div className="page-grid-bg" />
      <Navigation />

      <main>
        <section className="about-hero-shell page-hero-shell page-hero-compact">
          <div className="about-hero-grid">
            <div className="hero-left about-hero-copy">
              <div className="hero-top-brand">
                <span className="hero-top-line" />
                <span className="hero-top-text">THE CLUB</span>
              </div>

              <h1 className="hero-title-main">
                <span>About</span>
                <span className="outline">US</span>
              </h1>

              <p className="hero-subtext">
                A student-led organisation at ETH Zurich dedicated to education, research, and community in the Web3 space.
              </p>

              <p className="about-hero-subtext">
                Founded by ETH students, the club operates like a working studio where engineers, economists, and designers
                ship real outcomes together.
              </p>

              <div className="about-hero-points" aria-label="About key focus points">
                <span>Builder-first culture</span>
                <span>Public demos each semester</span>
                <span>Open to all ETH faculties</span>
              </div>
            </div>

            <div className="about-stats-rail" aria-label="Club signals">
              <div className="about-stats-title">CLUB SIGNALS</div>
              <div className="about-signals-board">
                <div className="about-signals-live">
                  <span className="about-signals-dot" />
                  Auto-updating snapshot
                </div>

                {heroStats.map((stat, idx) => (
                  <button
                    key={stat.label}
                    type="button"
                    className={`about-signal-row ${idx === activeStat ? "active" : ""}`}
                    onMouseEnter={() => setActiveStat(idx)}
                    aria-pressed={idx === activeStat}
                  >
                    <div className="about-signal-top">
                      <strong style={{ color: stat.color }}>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                    <small>{stat.note}</small>
                    <div className="about-signal-meter" role="presentation">
                      <div style={{ width: `${stat.meter}%` }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="org-section">
          <div className="org-wrap">
            <div className="about-org-chart">
              <PageSectionHeader label="Structure" title="Club Organigram" className="about-section-header-block" />

              <div className="org-chart-3tier">
                <div className="org-group-label">External network</div>

                <div className="org-tier org-tier-top">
                  <button type="button" className="org-node-ext org-node-ext-link" title="Jump to advisors section" onClick={() => scrollToSection("advisors")}>
                    <div className="org-node-ext-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" /><path d="M12 12v9" /></svg>
                    </div>
                    Advisors
                  </button>
                  <button type="button" className="org-node-ext org-node-ext-link" title="Jump to partners section" onClick={() => scrollToSection("partners")}>
                    <div className="org-node-ext-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </div>
                    Partners
                  </button>
                </div>

                <div className="org-divider" aria-hidden="true" />

                <div className="org-core-shell">
                  <div className="org-group-label">Club core</div>

                  <div className="org-tier org-tier-board">
                    <div className="org-core-head">
                      <div className="org-node-president">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        President
                      </div>
                      <div className="org-node-board">
                        <div className="org-node-board-label">Board</div>
                        <div className="org-node-board-sub">coordinates all committees</div>
                      </div>
                    </div>

                    <div className="org-core-dependency">Board to Committees (execution teams)</div>
                    <div className="org-micro-vline" />
                  </div>

                  <div className="org-hspread">
                    <div className="org-hspread-line" />
                  </div>

                  <div className="org-tier org-tier-committees">
                    {committeeNodes.map((node) => (
                      <CommitteeNode key={node.id} {...node} onClick={scrollToCommittee} />
                    ))}
                  </div>

                  <div className="org-hspread">
                    <div className="org-hspread-line" style={{ opacity: 0.5 }} />
                  </div>
                </div>

                <div className="org-tier org-tier-members org-tier-members-global">
                  <div className="org-node-members">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    500+ Members
                  </div>
                </div>
              </div>

              <p style={{ textAlign: "center", fontSize: 12, color: "var(--dim)", marginTop: 24, letterSpacing: 0.5 }}>
                Click any committee node to jump to its description ↓
              </p>
            </div>
          </div>
        </div>

        <LogoMarqueeSection
          id="advisors"
          label="External Network"
          title="Advisors"
          description="Academic and industry advisors contributing experience and direction."
          items={advisors}
          linkItems={false}
          layout="cards"
          align="left"
          sectionClassName="partners-section partners-section-advisors"
          wrapperClassName="advisors-wrap"
          trackClassName="advisors-grid"
          chipClassName="advisor-card-visual"
          itemClassName="advisor-card"
          descriptionClassName="advisor-card-copy"
          imageClassName="advisor-card-image"
          headerClassName="about-section-header-block"
        />

        <div className="join-hero-divider" aria-hidden="true" />

        <LogoMarqueeSection
          id="partners"
          label="External Network"
          title="Partners"
          description="Industry and research collaborators backing the club."
          items={partners}
          linkItems
          align="left"
          sectionClassName="partners-section partners-section-partners"
          wrapperClassName="partner-marquee-wrap"
          trackClassName="partner-marquee-track"
          chipClassName="partner-marquee-chip"
          headerClassName="about-section-header-block"
        />

        <div className="container section-sm">
          <ScrollReveal>
            <PageSectionHeader label="Committees" title="Our Teams" className="about-section-header-block" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div>
              {committeeSections.map((section, index) => (
                <ScrollReveal key={section.id} delay={80 + index * 70}>
                  <CommitteeAccordion
                    section={section}
                    isOpen={openAccordionId === section.id}
                    onToggle={(id) => setOpenAccordionId(openAccordionId === id ? "" : id)}
                  />
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="container section-sm">
          <ScrollReveal>
            <PageSectionHeader label="Committee Members" title="Meet the People" className="about-section-header-block" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="filter-row team-filter-row">
              {[{ label: "All", value: "all" }, ...orderedCommittees.map((committee) => ({
                label: committee.name,
                value: committee.slug ?? committee._id,
              }))].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className={`fb ${activeFilter === filter.value ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="team-strip">
              {visibleTeamMembers.map((member, index) => (
                <ScrollReveal key={member._id} delay={70 + index * 60}>
                  <div className="team-card">
                    <div className="team-av">{getInitials(member.name)}</div>
                    <div className="team-name">{member.name}</div>
                    <div className="team-role">{member.role}</div>
                    <div className="team-comm">{member.committee?.name ?? "Committee"}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <Footer />
      </main>
    </div>
  );
}