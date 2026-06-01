import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PartnersSection } from "@/components/PartnersSection";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  GraduationCap,
  Handshake,
  Mic,
  Trophy,
  Users,
} from "lucide-react";

const partnerBenefits = [
  {
    eyebrow: "01",
    title: "ETH Talent Access",
    icon: GraduationCap,
    description:
      "Direct access to ETH Zurich students in computer science, mathematics, and engineering with a strong interest in Web3.",
  },
  {
    eyebrow: "02",
    title: "Ecosystem Visibility",
    icon: Eye,
    description:
      "Reach our student community as well as a broader network of alumni, researchers, and Web3 professionals.",
  },
  {
    eyebrow: "03",
    title: "Hiring Pipeline",
    icon: Users,
    description:
      "Connect with motivated candidates looking for internships, working student roles, and full-time positions in Web3.",
  },
];

const collaborationMethods = [
  {
    title: "Co-create Events",
    icon: CalendarDays,
    description:
      "Run workshops, panels, or technical sessions with us and engage directly with the ETH Web3 community.",
  },
  {
    title: "Annual Sponsorship",
    icon: BadgeDollarSign,
    description:
      "Support our initiatives and gain recurring visibility across our events, content, and community channels.",
  },
  {
    title: "Speaker Programs",
    icon: Mic,
    description:
      "Share expertise through talks or workshops and build credibility with students interested in Web3.",
  },
  {
    title: "Talent Introductions",
    icon: Users,
    description:
      "Get introduced to selected ETH Zurich students whose interests match your hiring needs.",
  },
];

const collaborationTypes = [
  {
    title: "Event Partnership",
    icon: CalendarDays,
    description: "Co-host a single workshop, panel, or community event with shared branding and promotion.",
  },
  {
    title: "Sponsorship Package",
    icon: Handshake,
    description: "Support selected initiatives or the annual program through a defined visibility package.",
  },
  {
    title: "Hackathon Partner",
    icon: Trophy,
    description:
      "Define a Web3 challenge and co-host a focused hackathon with builders from our community.",
  },
  {
    title: "Job Board Access",
    icon: BriefcaseBusiness,
    description:
      "Post internships, working student roles, or full-time positions to our curated ETH Web3 talent network.",
  },
];

export default function Collaborate() {
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

        <PartnersSection
          placement="collaborate"
          eyebrow="Current Partners"
          heading="Current Partners"
          align="center"
          sectionClassName="partners-section partners-section-partners"
          headerClassName="partners-header"
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
