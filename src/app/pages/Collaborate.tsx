import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LogoMarqueeSection } from "@/components/LogoMarqueeSection";
import {
  BadgeDollarSign,
  CalendarDays,
  Eye,
  FlaskConical,
  GraduationCap,
  Handshake,
  Mic,
  Search,
  Users,
} from "lucide-react";

type Partner = {
  _id: string;
  name: string;
  website?: string | null;
  logo?: unknown;
};

type CollaborateProps = {
  partners: Partner[];
};

const partnerBenefits = [
  {
    eyebrow: "01",
    title: "ETH Talent Access",
    icon: GraduationCap,
    description:
      "Direct access to Europe's best CS, mathematics and engineering students with a passion for Web3.",
  },
  {
    eyebrow: "02",
    title: "Ecosystem Visibility",
    icon: Eye,
    description:
      "Be seen by 500+ engaged students and our broader network of alumni, researchers and professionals.",
  },
  {
    eyebrow: "03",
    title: "Research Collaboration",
    icon: Search,
    description:
      "Engage with ETH Zurich research groups on blockchain scalability, security and cryptography.",
  },
];

const collaborationMethods = [
  {
    title: "Co-host Events",
    icon: CalendarDays,
    description:
      "Workshops, panels, or hackathons with your brand front and centre alongside ours.",
  },
  {
    title: "Sponsorships",
    icon: BadgeDollarSign,
    description:
      "Fund our initiatives and gain year-round visibility across our channels and events.",
  },
  {
    title: "Speaker Programs",
    icon: Mic,
    description:
      "Send your experts to share knowledge and build credibility with our community.",
  },
  {
    title: "Research Projects",
    icon: FlaskConical,
    description:
      "Collaborate on applied research with our technical committee and ETH Zurich faculty.",
  },
];

const collaborationTypes = [
  {
    title: "Event Partnerships",
    icon: CalendarDays,
    description: "Co-hosted workshops, panels or hackathons.",
  },
  {
    title: "Sponsorships",
    icon: Handshake,
    description: "Year-round brand visibility and funding.",
  },
  {
    title: "Research Collabs",
    icon: Search,
    description: "Applied research with faculty and students.",
  },
  {
    title: "Talent Support",
    icon: Users,
    description: "Student development and recruiting pipeline.",
  },
];

export default function Collaborate({ partners }: CollaborateProps) {
  return (
    <div className="collab-page min-h-screen">
      <div className="page-grid-bg" />
      <div className="collab-page-glow" />
      <Navigation />

      <main>
        <section className="page-hero-shell page-hero-compact collab-hero-shell">
          <div className="hero-top-brand">
            <span className="hero-top-line" />
            <span className="hero-top-text">For Organisations</span>
          </div>

          <h1 className="hero-title-main">
            <span>Collaborate</span>
          </h1>

          <p className="hero-subtext collab-hero-subtext">
            Partner with Switzerland&apos;s most engaged student blockchain
            community — access talent, build visibility, shape the next
            generation of Web3 builders.
          </p>

          <div className="collab-hero-actions">
            <a className="btn btn-primary" href="mailto:partners@ethblockchain.ch">
                Become a Partner
        
            </a>
            <a className="btn btn-outline" href="#collab-contact">
              Contact Us
            </a>
          </div>

          <div className="collab-hero-tags" aria-label="Collaboration focus areas">
            <span>Event Partnerships</span>
            <span>Sponsorships</span>
            <span>Research Collaborations</span>
          </div>
        </section>

        <section className="collab-section">
          <div className="collab-section-head">
            <div className="label">Why Partner With Us</div>
          </div>

          <div className="collab-why-grid">
            {partnerBenefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article key={benefit.title} className="collab-card collab-why-card">
                  <div className="collab-card-index">{benefit.eyebrow}</div>
                  <div className="collab-card-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="collab-section">
          <div className="collab-section-head">
            <div className="label">How to Work Together</div>
          </div>

          <div className="collab-how-grid">
            {collaborationMethods.map((method) => {
              const Icon = method.icon;

              return (
                <article key={method.title} className="collab-card collab-how-card">
                  <div className="collab-how-icon">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3>{method.title}</h3>
                    <p>{method.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="collab-section">
          <div className="collab-section-head">
            <div className="label">Collaboration Types</div>
          </div>

          <div className="collab-types-grid">
            {collaborationTypes.map((type) => {
              const Icon = type.icon;

              return (
                <article key={type.title} className="collab-card collab-type-card">
                  <div className="collab-type-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div className="h3">{type.title}</div>
                  <p>{type.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <LogoMarqueeSection
          label="Current Partners"
          title="Current Partners"
          items={partners}
          linkItems
          align="center"
          sectionClassName="partners-section partners-section-partners"
          wrapperClassName="partner-marquee-wrap"
        trackClassName="partner-marquee-track"
        chipClassName="partner-marquee-chip"
        headerClassName="partners-header"
        emptyStateTitle="No partners to display yet."
        emptyStateDescription="Current partner logos will appear here once published."
        emptyStateIcon={Handshake}
      />

        <section id="collab-contact" className="collab-cta-section">
          <div className="collab-cta-card">
            <div className="label">Get Involved</div>
            <h2 className="h2">Ready to partner with us?</h2>
            <p className="lead">
              Whether you&apos;re a startup, protocol, or established company —
              let&apos;s build something meaningful together.
            </p>
            <div className="collab-cta-actions">
              <a className="btn btn-primary" href="mailto:partners@ethblockchain.ch">
                  Become a Partner
              </a>
              <a className="btn btn-outline" href="mailto:contact@ethblockchain.ch">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
