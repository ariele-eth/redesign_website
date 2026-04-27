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
    subtitle: "Technical projects, platforms, and infrastructure",
    content: [
      {
        label: "Purpose",
        text: "Drive the club's technical expertise, build Web3 projects, and maintain reliable infrastructure.",
      },
      {
        label: "Core responsibilities",
        text: "Manage internal tools and the website, run hackathons and coding sessions, and develop or audit smart contracts and dApps.",
      },
      {
        label: "Goals",
        text: "Enable the club's technical backbone while growing practical engineering skills across members.",
      },
    ],
  },
  {
    id: "acc-2",
    title: "External Relations",
    icon: Globe2,
    subtitle: "Strategic partnerships and outreach",
    content: [
      {
        label: "Purpose",
        text: "Build and maintain strategic relationships with partners, industry, and academia.",
      },
      {
        label: "Core responsibilities",
        text: "Acquire sponsors, grow the alumni and university network, and invite guest speakers and industry leaders.",
      },
      {
        label: "Goals",
        text: "Secure long-term partnerships, expand the club's global network, and grow the operating budget.",
      },
    ],
  },
  {
    id: "acc-3",
    title: "Events",
    icon: CalendarDays,
    subtitle: "Physical and virtual experiences",
    content: [
      {
        label: "Purpose",
        text: "Plan and execute all physical and virtual club events to bring the community together.",
      },
      {
        label: "Core responsibilities",
        text: "Handle logistics, coordinate on-the-day operations, and collaborate with Marketing and Education on event formats.",
      },
      {
        label: "Goals",
        text: "Deliver memorable, professional events that run smoothly from start to finish.",
      },
    ],
  },
  {
    id: "acc-4",
    title: "Internal Affairs",
    icon: Users,
    subtitle: "Culture, processes, and talent",
    content: [
      {
        label: "Purpose",
        text: "Cultivate club culture, optimize internal processes, and manage talent.",
      },
      {
        label: "Core responsibilities",
        text: "Recruit and onboard members, organize internal socials, resolve conflicts, and curate tools with the president.",
      },
      {
        label: "Goals",
        text: "Build a cohesive, motivated community and minimize turnover of active members.",
      },
    ],
  },
  {
    id: "acc-5",
    title: "Marketing",
    icon: MessagesSquare,
    subtitle: "Brand, content, and growth",
    content: [
      {
        label: "Purpose",
        text: "Increase visibility and strengthen the ETH Blockchain Club brand internally and externally.",
      },
      {
        label: "Core responsibilities",
        text: "Run social channels, create content for events and education, and manage newsletter and PR.",
      },
      {
        label: "Goals",
        text: "Grow followers, maintain high engagement, and keep a consistent, professional brand identity.",
      },
    ],
  },
  {
    id: "acc-6",
    title: "Finances & Legal",
    icon: ShieldCheck,
    subtitle: "Treasury, contracts, and compliance",
    content: [
      {
        label: "Purpose",
        text: "Ensure the financial health and legal security of the club.",
      },
      {
        label: "Core responsibilities",
        text: "Own budgeting, treasury management, contract review, and compliance with ETH Zurich and Swiss law.",
      },
      {
        label: "Goals",
        text: "Maintain transparent finances, sustainable treasury growth, and zero compliance incidents.",
      },
    ],
  },
  {
    id: "acc-7",
    title: "Education",
    icon: Landmark,
    subtitle: "Learning tracks and education programs",
    content: [
      {
        label: "Purpose",
        text: "Promote knowledge building in blockchain and Web3 for members and external learners.",
      },
      {
        label: "Core responsibilities",
        text: "Run bootcamps and workshops, maintain learning materials, mentor beginners, and host teach-ins.",
      },
      {
        label: "Goals",
        text: "Position the club as a leading academic hub and lower the barrier to entry for new members.",
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
  { name: "Jennis Bešić", role: "President", committee: "Board", initials: "JB", filters: ["board"] },
  { name: "Rafael", role: "Head", committee: "Marketing", initials: "RA", filters: ["board", "marketing"] },
  { name: "Ariele Marcellino", role: "Head", committee: "Innovation & Technology", initials: "AM", filters: ["board", "innovation-technology"] },
  { name: "Julian Marx", role: "Head", committee: "Finance & Legal", initials: "JM", filters: ["board", "finances-legal"] },
  { name: "Cyrill", role: "Member", committee: "Innovation & Technology", initials: "CY", filters: ["innovation-technology"] },
  { name: "Faizan", role: "Member", committee: "Education", initials: "FA", filters: ["education"] },
  { name: "Alex Smolders", role: "Member", committee: "Education", initials: "AS", filters: ["education"] },
  { name: "Gökhan", role: "Member", committee: "Events", initials: "GO", filters: ["events"] },
  { name: "Firas Dridi", role: "Member", committee: "Events", initials: "FD", filters: ["events"] },
  { name: "Giovanni Di Nunzio", role: "Member", committee: "Marketing", initials: "GN", filters: ["marketing"] },
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
    return teamMembers.filter((member) =>
      (member.filters as readonly string[]).includes(activeFilter)
    );
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