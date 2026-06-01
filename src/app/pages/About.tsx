"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { CmsEmptyState } from "@/components/CmsEmptyState";
import { Nl2Br } from "@/components/Nl2Br";
import { PageSectionHeader } from "@/components/PageSectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LogoMarqueeSection } from "@/components/LogoMarqueeSection";
import { PartnersSection } from "@/components/PartnersSection";
import { CommitteeIcon } from "@/lib/committeeIcons";
import { urlFor } from "@/sanity/lib/image";
import { Github, Globe, Instagram, Linkedin, Network, Send, Twitter, Users } from "lucide-react";

type Committee = {
  _id: string;
  name: string;
  slug?: string | null;
  groupType?: "committee" | "board" | null;
  description?: string | null;
  yourRole?: string | null;
  whatYouBring?: string | string[] | null;
  whatToExpect?: string | string[] | null;
  order?: number | null;
  icon?: string | null;
};

type Person = {
  _id: string;
  name: string;
  role: string;
  bio?: string | null;
  image?: unknown | null;
  isBoardMember?: boolean | null;
  socials?: Array<{
    platform?: string | null;
    url?: string | null;
  }> | null;
  groups?: Committee[] | null;
  committee?: Committee | null;
};

type AboutProps = {
  committees: Committee[];
  people: Person[];
  advisors: Array<{ _id: string; name: string; title?: string | null; description?: string | null; logo?: unknown }>;
  siteStats?: {
    members?: number;
    events?: number;
    partners?: number;
    committees?: number;
    builders?: number;
  } | null;
};

type CommitteeSection = {
  id: string;
  title: string;
  icon?: string | null;
  content: Array<{ label: string; text: string }>;
};

type CommitteeNodeData = {
  id: string;
  icon?: string | null;
  lines: string[];
};

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

function getPersonImageUrl(image: unknown) {
  if (!image) return null;

  return urlFor(image as never)
    .width(240)
    .height(240)
    .fit("crop")
    .auto("format")
    .quality(92)
    .url();
}

function normalizeExternalUrl(url?: string | null) {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  return `https://${trimmed}`;
}

function getSocialLabel(platform?: string | null) {
  const key = (platform ?? "").trim().toLowerCase();

  switch (key) {
    case "linkedin":
      return "LinkedIn";
    case "x":
      return "X";
    case "github":
      return "GitHub";
    case "telegram":
      return "Telegram";
    case "instagram":
      return "Instagram";
    case "website":
      return "Website";
    default:
      return "Social";
  }
}

function getSocialIcon(platform?: string | null) {
  const key = (platform ?? "").trim().toLowerCase();

  switch (key) {
    case "linkedin":
      return <Linkedin size={13} strokeWidth={2} />;
    case "x":
      return <Twitter size={13} strokeWidth={2} />;
    case "github":
      return <Github size={13} strokeWidth={2} />;
    case "telegram":
      return <Send size={13} strokeWidth={2} />;
    case "instagram":
      return <Instagram size={13} strokeWidth={2} />;
    case "website":
      return <Globe size={13} strokeWidth={2} />;
    default:
      return <Globe size={13} strokeWidth={2} />;
  }
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
          <div className="acc-title">{section.title}</div>
        </div>
        <div className="acc-arrow">⌄</div>
      </button>
      {isOpen && (
        <div className="acc-body">
          {section.content.map((item) => (
            <div key={item.label} className="acc-sub-card">
              <div className="label">{item.label}</div>
              <p><Nl2Br text={item.text} /></p>
            </div>
          ))}
        </div>
      )}
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
    <button type="button" className="org-committee-node org-node-interactive" onClick={() => onClick(id)} title="Click to explore">
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

export default function About({ committees, people, advisors, siteStats }: AboutProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openAccordionId, setOpenAccordionId] = useState("");
  const [activeStat, setActiveStat] = useState(0);

  const formatPlus = (value?: number) =>
    typeof value === "number" ? `${value}+` : "--";
  const formatPlain = (value?: number) =>
    typeof value === "number" ? String(value) : "--";

  const heroStats = [
    {
      value: formatPlus(siteStats?.members),
      label: "Members",
      note: "active contributors this semester",
      meter: 92,
      color: "var(--accent)",
    },
    {
      value: formatPlain(committees.length),
      label: "Committees",
      note: "delivery teams running in parallel",
      meter: 74,
      color: "var(--accent2)",
    },
    {
      value: formatPlus(siteStats?.events),
      label: "Events/year",
      note: "lectures, labs, and builder nights",
      meter: 81,
      color: "var(--highlight)",
    },
    {
      value: formatPlus(siteStats?.partners),
      label: "Partners",
      note: "industry and academic collaborators",
      meter: 68,
      color: "var(--text)",
    },
  ];

  const orderedCommittees = useMemo(
    () =>
      [...committees].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999)),
    [committees]
  );

  const committeeSections: CommitteeSection[] = useMemo(
    () =>
      orderedCommittees.map((committee) => {
        const descriptionText = formatCommitteeText(committee.description)
        const yourRoleText = formatCommitteeText(committee.yourRole)
        const whatYouBringText = formatCommitteeText(committee.whatYouBring)
        const whatToExpectText = formatCommitteeText(committee.whatToExpect)

        return {
          id: `committee-${committee._id}`,
          title: committee.name,
          icon: committee.icon,
          content: [
            ...(descriptionText === "--"
              ? []
              : [{ label: "Description", text: descriptionText }]),
            { label: "Your role", text: yourRoleText },
            { label: "What you bring", text: whatYouBringText },
            { label: "What to expect", text: whatToExpectText },
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

  const boardCommittee = useMemo(
    () => orderedCommittees.find((committee) => committee.groupType === "board") ?? null,
    [orderedCommittees]
  );

  const teamSectionId = "committee-members-section";
  const committeeFilters = orderedCommittees.filter((committee) => committee.groupType !== "board");

  const getMemberGroups = (member: Person) => {
    const memberships = [...(member.groups ?? [])];

    if (member.committee) {
      memberships.push(member.committee);
    }

    const deduped: Committee[] = [];
    const seenKeys = new Set<string>();

    for (const group of memberships) {
      const key = getGroupKey(group);
      if (seenKeys.has(key)) continue;

      seenKeys.add(key);
      deduped.push(group);
    }

    return deduped;
  };

  const getGroupKey = (group: Committee) => (group.groupType === "board" ? "board" : group.slug ?? group._id);

  const getGroupLabel = (group: Committee) => (group.groupType === "board" ? "Board" : group.name);

  const focusMemberGroup = (group: Committee) => {
    setActiveFilter(getGroupKey(group));
    scrollToSection(teamSectionId);
  };

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

  const visibleTeamMembers = useMemo(() => {
    if (activeFilter === "all") return people;
    if (activeFilter === "board") {
      return people.filter((member) => member.isBoardMember === true);
    }

    return people.filter((member) => getMemberGroups(member).some((group) => getGroupKey(group) === activeFilter));
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
                  <button type="button" className="org-node-ext org-node-ext-link org-node-interactive" title="Jump to advisors section" onClick={() => scrollToSection("advisors")}>
                    <div className="org-node-ext-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" /><path d="M12 12v9" /></svg>
                    </div>
                    Advisors
                  </button>
                  <button type="button" className="org-node-ext org-node-ext-link org-node-interactive" title="Jump to partners section" onClick={() => scrollToSection("partners")}>
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
                          <button
                            type="button"
                            className="org-node-president org-node-president-link org-node-interactive"
                            onClick={() => {
                              setActiveFilter("all")
                              scrollToSection(teamSectionId)
                            }}
                            title="Jump to all members"
                          >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        President
                          </button>
                      <button
                        type="button"
                        className="org-node-board org-node-board-link org-node-interactive"
                        onClick={() => {
                          if (boardCommittee) {
                            focusMemberGroup(boardCommittee)
                            return
                          }

                          scrollToSection(teamSectionId)
                        }}
                        title="Jump to Board members"
                      >
                        <div className="org-node-board-label">{boardCommittee ? getGroupLabel(boardCommittee) : "Board"}</div>
                        <div className="org-node-board-sub">
                          {boardCommittee?.description ?? "coordinates all committees"}
                        </div>
                      </button>
                    </div>

                    <div className="org-core-dependency">Board to Committees (execution teams)</div>
                    <div className="org-micro-vline" />
                  </div>

                  <div className="org-hspread">
                    <div className="org-hspread-line" />
                  </div>

                  <div className="org-tier org-tier-committees">
                    {committeeNodes.length > 0 ? (
                      committeeNodes.map((node) => (
                        <CommitteeNode key={node.id} {...node} onClick={scrollToCommittee} />
                      ))
                    ) : (
                      <CmsEmptyState
                        title="No committees listed yet."
                        description="Committee nodes will appear once committee entries are published."
                        icon={Network}
                        className="mx-auto w-full max-w-2xl"
                      />
                    )}
                  </div>

                  <div className="org-hspread">
                    <div className="org-hspread-line" style={{ opacity: 0.5 }} />
                  </div>
                </div>

                <div className="org-tier org-tier-members org-tier-members-global">
                  <div className="org-node-members">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    {formatPlus(siteStats?.members)} Members
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
          emptyStateTitle="No advisors to display yet."
          emptyStateDescription="Advisor profiles will appear here once they are published."
          emptyStateIcon={Users}
        />

        <div className="join-hero-divider" aria-hidden="true" />

        <PartnersSection
          placement="about"
          id="partners"
          eyebrow="External Network"
          heading="Partners"
          description="Industry and research collaborators backing the club."
          align="left"
          sectionClassName="partners-section partners-section-partners"
          headerClassName="about-section-header-block"
        />

        <div className="container section-sm">
          <ScrollReveal>
            <PageSectionHeader label="Committees" title="Our Teams" className="about-section-header-block" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            {committeeSections.length > 0 ? (
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
            ) : (
              <CmsEmptyState
                title="No committees listed yet."
                description="Committee details will appear here once entries are published."
                icon={Network}
                className="mx-auto mt-8 max-w-4xl"
              />
            )}
          </ScrollReveal>
        </div>

        <div id={teamSectionId} className="container section-sm">
          <ScrollReveal>
            <PageSectionHeader label="Committee Members" title="Meet the People" className="about-section-header-block" />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="filter-row team-filter-row">
              {[
                { label: "All", value: "all" },
                { label: boardCommittee ? getGroupLabel(boardCommittee) : "Board", value: "board" },
                ...committeeFilters.map((committee) => ({
                  label: getGroupLabel(committee),
                  value: getGroupKey(committee),
                })),
              ].map((filter) => (
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
            {visibleTeamMembers.length > 0 ? (
            <div className="team-strip">
              {visibleTeamMembers.map((member, index) => {
                const personImageUrl = getPersonImageUrl(member.image);
                const socials = (member.socials ?? [])
                  .map((social) => ({
                    platform: social?.platform ?? null,
                    url: normalizeExternalUrl(social?.url ?? null),
                  }))
                  .filter((social): social is { platform: string | null; url: string } => Boolean(social.url));

                return (
                  <ScrollReveal key={member._id} delay={70 + index * 60}>
                    <div className="team-card">
                      <div className="team-av">
                        {personImageUrl ? (
                          <Image
                            src={personImageUrl}
                            alt={member.name}
                            fill
                            sizes="60px"
                            className="team-av-image"
                          />
                        ) : (
                          <span>{getInitials(member.name)}</span>
                        )}
                      </div>
                      <div className="team-name">{member.name}</div>
                      <div className="team-role">{member.role}</div>
                      <div className="team-comm">
                        {[
                          ...(member.isBoardMember ? ["Board"] : []),
                          ...getMemberGroups(member).map((group) => getGroupLabel(group)),
                        ]
                          .filter(Boolean)
                          .join(" � ") || "Committee"}
                      </div>
                      {socials.length > 0 ? (
                        <div className="team-socials" aria-label={`${member.name} social links`}>
                          {socials.map((social, socialIndex) => (
                            <a
                              key={`${member._id}-${social.platform ?? "social"}-${socialIndex}`}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="team-social-link"
                              aria-label={`${member.name} on ${getSocialLabel(social.platform)}`}
                              title={getSocialLabel(social.platform)}
                            >
                              {getSocialIcon(social.platform)}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
            ) : (
              <CmsEmptyState
                title="No members listed yet."
                description="Team member profiles will appear here once they are published."
                icon={Users}
                className="mx-auto mt-8 max-w-4xl"
              />
            )}
          </ScrollReveal>
        </div>

        <Footer />
      </main>
    </div>
  );
}
