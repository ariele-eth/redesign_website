import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const headlineStories = [
  {
    category: "Announcement",
    title: "ETH Blockchain Club Launches Spring 2026 Builder Track",
    summary:
      "Our new track combines protocol lectures, guided project squads, and mentorship from industry engineers.",
    meta: "APR 2026 · 4 MIN READ",
  },
  {
    category: "Partnership",
    title: "New Collaboration with ETH Student Project House",
    summary:
      "The partnership expands access to prototyping spaces and interdisciplinary coaching for Web3 initiatives.",
    meta: "APR 2026 · 3 MIN READ",
  },
  {
    category: "Community",
    title: "500+ Active Members Across 7 Committees",
    summary:
      "From research to events to technical education, our committees continue to grow with strong student leadership.",
    meta: "MAR 2026 · 2 MIN READ",
  },
];

const sidebarItems = [
  {
    category: "Research",
    title: "ZK Reading Group Recap",
    meta: "APR 2026",
  },
  {
    category: "Events",
    title: "Hackathon 2026 Registrations Open",
    meta: "APR 2026",
  },
  {
    category: "Club",
    title: "Committee Applications: New Round",
    meta: "MAR 2026",
  },
  {
    category: "Industry",
    title: "Builder Night with Protocol Teams",
    meta: "MAR 2026",
  },
];

export default function News() {
  return (
    <div className="news-page min-h-screen">
      <div className="page-grid-bg" />
      <div className="news-page-glow" />
      <Navigation />

      <main>
        <section className="news-hero">
          <div className="label">Updates</div>
          <h1 className="h1">News</h1>
          <p className="lead news-hero-lead">
            The latest from the club, the DeFi ecosystem, and our advisor network.
          </p>
        </section>

        <section className="news-layout">
          <div>
            {headlineStories.map((story, index) => (
              <article key={story.title} className="news-card">
                <div className="label">{story.category}</div>
                <h2 className={`news-card-title ${index === 0 ? 'news-card-title-featured' : ''}`}>
                  {story.title}
                </h2>
                <p>{story.summary}</p>
                <div className="news-meta">{story.meta}</div>
              </article>
            ))}
          </div>

          <aside>
            <div className="news-quick-updates">
              <div className="label news-quick-updates-label">Quick Updates</div>

              {sidebarItems.map((item) => (
                <article key={item.title} className="sidebar-card">
                  <span className="badge sidebar-badge">{item.category}</span>
                  <h3 className="sidebar-title">{item.title}</h3>
                  <div className="sidebar-meta">{item.meta}</div>
                </article>
              ))}
            </div>

            <div className="news-widget">
              <h3 className="h3">Newsletter</h3>
              <p>Weekly Web3 updates and club news to your inbox.</p>
              <input
                type="email"
                className="email-input"
                placeholder="you@ethz.ch"
                aria-label="Email address"
              />
              <button type="button" className="btn btn-primary news-subscribe-btn">
                Subscribe -&gt;
              </button>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
