import News from "@/app/pages/News";
import { Providers } from "@/components/Providers";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

const newsQuery = `*[_type == "news" && isVisible != false]
  | order(date desc, _createdAt desc)
  { _id, title, date, previewText, externalLink, "category": category->title }`;

const quickUpdatesQuery = `*[_type == "quickUpdate" && isVisible != false]
  | order(date desc, _createdAt desc)
  { _id, title, date, shortText, link, "category": category->title }`;

export default async function NewsPage() {
  const [news, quickUpdates] = await Promise.all([
    client.fetch(newsQuery),
    client.fetch(quickUpdatesQuery),
  ]);

  return (
    <Providers>
      <News news={news} quickUpdates={quickUpdates} />
    </Providers>
  );
}
