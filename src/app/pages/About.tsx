"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PageSectionHeader } from "@/components/PageSectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CalendarDays, Globe2, Landmark, MessagesSquare, Network, ShieldCheck, Users } from "lucide-react";

const heroStats = [
  { value: "500+", label: "Members", note: "active contributors this semester", meter: 92, color: "var(--accent)" },
  { value: "7", label: "Committees", note: "delivery teams running in parallel", meter: 74, color: "var(--accent2)" },
  { value: "40+", label: "Events/year", note: "lectures, labs, and builder nights", meter: 81, color: "var(--highlight)" },
  { value: "20+", label: "Partners", note: "industry and academic collaborators", meter: 68, color: "var(--text)" },
];

const committeeSections = [
  {
    id: "acc-1",
    title: "Innovation & Technology",
    icon: Network,
    subtitle: "Research, development & technical projects",
    content: [
      { label: "What we do", text: "Technical workshops, protocol exploration and PoC builds on Ethereum and L2s." },
      {
        label: "Why it matters",
        text: "Technical depth is the foundation of everything — this committee keeps the club at the frontier.",
      },
      {
        label: "What you gain",
        text: "Hands-on Solidity, ZK proofs, DeFi protocols. Build a portfolio of real blockchain projects.",
      },
    ],
  },
  {
    id: "acc-2",
    title: "External Relations",
    icon: Globe2,
    subtitle: "Partnerships, industry & ecosystem",
    content: [
      {
        label: "What we do",
        text: "Manage relationships with industry partners, academic institutions and other Web3 clubs.",
      },
      { label: "Why it matters", text: "External connections bring speakers, funding, job opportunities and credibility." },
      {
        label: "What you gain",
        text: "Professional network in Web3, partnership management experience, direct access to industry leaders.",
      },
    ],
  },
  {
    id: "acc-3",
    title: "Events",
    icon: CalendarDays,
    subtitle: "Workshops, panels, hackathons & socials",
    content: [
      { label: "What we do", text: "Plan and execute all club events from intimate workshops to large-scale hackathons." },
      { label: "Why it matters", text: "Events are the heartbeat — where learning, networking and community happen in real life." },
      { label: "What you gain", text: "Event management, project leadership and the satisfaction of bringing people together." },
    ],
  },
  {
    id: "acc-4",
    title: "Internal Affairs",
    icon: Users,
    subtitle: "Talent, onboarding & internal operations",
    content: [
      {
        label: "What we do",
        text: "Attract top ETH Zurich talent, run the application process and ensure every member finds their place.",
      },
      {
        label: "Why it matters",
        text: "The quality of our people is our greatest asset. Recruiting right ensures the club continuously evolves.",
      },
      { label: "What you gain", text: "HR and organisational experience, interview skills, deep understanding of team dynamics." },
    ],
  },
  {
    id: "acc-5",
    title: "Marketing",
    icon: MessagesSquare,
    subtitle: "Brand, content & social media",
    content: [
      { label: "What we do", text: "Manage club brand, social media presence, content strategy and visual communications." },
      { label: "Why it matters", text: "A strong brand attracts better members, more prestigious partners, and amplifies everything we do." },
      { label: "What you gain", text: "Real-world marketing in Web3, graphic design skills, content strategy expertise." },
    ],
  },
  {
    id: "acc-6",
    title: "Finances & Legal",
    icon: ShieldCheck,
    subtitle: "Budget, compliance & governance",
    content: [
      {
        label: "What we do",
        text: "Manage finances, sponsorship contracts and ensure legal compliance with ETH Zurich guidelines.",
      },
      { label: "Why it matters", text: "Financial health and legal clarity allow every other committee to operate confidently." },
      { label: "What you gain", text: "Financial management, contract negotiation, understanding of non-profit governance." },
    ],
  },
  {
    id: "acc-7",
    title: "Education",
    icon: Landmark,
    subtitle: "Curriculum, resources & learning programs",
    content: [
      {
        label: "What we do",
        text: "Design and maintain the learning curriculum, from beginner introductions to advanced deep-dives.",
      },
      { label: "Why it matters", text: "Education is the club's core purpose — this committee keeps our programs world-class." },
      {
        label: "What you gain",
        text: "Teaching and curriculum design, deep technical knowledge, ability to explain complex concepts.",
      },
    ],
  },
] as const;

const committeeNodes = [
  { id: "acc-1", icon: Network, lines: ["Innovation &", "Technology"] },
  { id: "acc-2", icon: Globe2, lines: ["External", "Relations"] },
  { id: "acc-3", icon: CalendarDays, lines: ["Events"] },
  { id: "acc-4", icon: Users, lines: ["Recruiting &", "Member Organisation"] },
  { id: "acc-5", icon: MessagesSquare, lines: ["Marketing"] },
  { id: "acc-6", icon: ShieldCheck, lines: ["Finances &", "Legal"] },
  { id: "acc-7", icon: Landmark, lines: ["Education"] },
] as const;

const teamMembers = [
  { name: "Anna Schneider", role: "President", committee: "Board", initials: "AS", filter: "board" },
  { name: "Luca Müller", role: "Head of Technology", committee: "Innovation & Technology", initials: "LM", filter: "innovation-technology" },
  { name: "Sara Keller", role: "Head of Events", committee: "Events", initials: "SK", filter: "events" },
  { name: "Nico Brunner", role: "Head of Marketing", committee: "Marketing", initials: "NB", filter: "marketing" },
  { name: "Maya Fischer", role: "Head of External Relations", committee: "External Relations", initials: "MF", filter: "external-relations" },
  { name: "David Weber", role: "Head of Education", committee: "Education", initials: "DW", filter: "education" },
  { name: "Jana Huber", role: "Head of Internal Affairs", committee: "Internal Affairs", initials: "JH", filter: "recruiting-members" },
  { name: "Tim Zimmermann", role: "Head of Finance", committee: "Finances & Legal", initials: "TZ", filter: "finances-legal" },
] as const;

function CommitteeAccordion({
  section,
  isOpen,
  onToggle,
}: {
  section: (typeof committeeSections)[number];
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  const Icon = section.icon;

  return (
    <div id={section.id} className={`acc-item ${isOpen ? "open" : ""}`}>
      <button type="button" className="acc-header" onClick={() => onToggle(section.id)}>
        <div className="acc-header-l">
          <div className="acc-ico">
            <Icon size={16} className="about-acc-icon" />
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
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommitteeNode({
  id,
  icon: Icon,
  lines,
  onClick,
}: {
  id: string;
  icon: ComponentType<{ size?: number }>;
  lines: readonly string[];
  onClick: (id: string) => void;
}) {
  return (
    <button type="button" className="org-committee-node" onClick={() => onClick(id)} title="Click to explore">
      <div className="org-committee-icon">
        <Icon size={13} />
      </div>
      <span>
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    </button>
  );
}

export default function About() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openAccordionId, setOpenAccordionId] = useState("acc-1");
  const [activeStat, setActiveStat] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStat((prev) => (prev + 1) % heroStats.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  const visibleTeamMembers = useMemo(() => {
    if (activeFilter === "all") return teamMembers;
    return teamMembers.filter((member) => member.filter === activeFilter);
  }, [activeFilter]);

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
        <section className="about-hero-shell page-hero-shell">
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
                    <div className="org-node-ext" title="Academic and industry advisors">
                      <div className="org-node-ext-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" /><path d="M12 12v9" /></svg>
                      </div>
                      Advisors
                    </div>
                    <div className="org-node-ext" title="Industry and research partners">
                      <div className="org-node-ext-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                      </div>
                      Partners
                    </div>
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
              {[
                { label: "All", value: "all" },
                { label: "Board", value: "board" },
                { label: "Innovation & Technology", value: "innovation-technology" },
                { label: "Events", value: "events" },
                { label: "Marketing", value: "marketing" },
                { label: "External Relations", value: "external-relations" },
                { label: "Education", value: "education" },
                { label: "Internal Affairs", value: "recruiting-members" },
                { label: "Finances & Legal", value: "finances-legal" },
              ].map((filter) => (
                <button key={filter.value} type="button" className={`fb ${activeFilter === filter.value ? "active" : ""}`} onClick={() => setActiveFilter(filter.value)}>
                  {filter.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="team-strip">
              {visibleTeamMembers.map((member, index) => (
                <ScrollReveal key={member.name} delay={70 + index * 60}>
                  <div className="team-card">
                    <div className="team-av">{member.initials}</div>
                    <div className="team-name">{member.name}</div>
                    <div className="team-role">{member.role}</div>
                    <div className="team-comm">{member.committee}</div>
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
