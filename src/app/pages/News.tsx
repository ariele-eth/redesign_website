import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CmsEmptyState } from "@/components/CmsEmptyState";
import { Bell, Newspaper } from "lucide-react";

type NewsItem = {
  _id: string;
  title: string;
  date: string;
  previewText: string;
  category?: string | null;
  externalLink?: string | null;
};

type QuickUpdate = {
  _id: string;
  title: string;
  date: string;
  shortText: string;
  category?: string | null;
  link?: string | null;
};

type NewsProps = {
  news: NewsItem[];
  quickUpdates: QuickUpdate[];
};

function formatNewsDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date).toUpperCase();
}

export default function News({ news, quickUpdates }: NewsProps) {
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
            {news.length > 0 ? (
              news.map((story, index) => {
                const meta = formatNewsDate(story.date);
                const content = (
                  <>
                    <div className="label">{story.category ?? "News"}</div>
                    <h2 className={`news-card-title ${index === 0 ? "news-card-title-featured" : ""}`}>
                      {story.title}
                    </h2>
                    <p>{story.previewText}</p>
                    <div className="news-meta">{meta}</div>
                  </>
                );

                return (
                  <article key={story._id} className="news-card">
                    {story.externalLink ? (
                      <a href={story.externalLink} target="_blank" rel="noopener noreferrer">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </article>
                );
              })
            ) : (
              <CmsEmptyState
                title="No news posts yet."
                description="Published updates from the club will appear here."
                icon={Newspaper}
                className="mx-auto max-w-4xl"
              />
            )}
          </div>

          <aside>
            <div className="news-quick-updates">
              <div className="label news-quick-updates-label">Quick Updates</div>

              {quickUpdates.length > 0 ? (
                quickUpdates.map((item) => {
                  const meta = formatNewsDate(item.date);
                  const body = (
                    <>
                      <span className="badge sidebar-badge">{item.category ?? "Update"}</span>
                      <h3 className="sidebar-title">{item.title}</h3>
                      <p>{item.shortText}</p>
                      <div className="sidebar-meta">{meta}</div>
                    </>
                  );

                  return (
                    <article key={item._id} className="sidebar-card">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          {body}
                        </a>
                      ) : (
                        body
                      )}
                    </article>
                  );
                })
              ) : (
                <CmsEmptyState
                  title="No quick updates yet."
                  description="Short updates will appear here once they are published."
                  icon={Bell}
                />
              )}
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
