import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Radio } from "lucide-react";

import { NewsCard } from "@/components/lbc/cards";
import { PageSection } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { companies, newsFeed } from "@/lib/lbc-data";

export const Route = createFileRoute("/actualites/$slug")({
  loader: ({ params }) => {
    const item = newsFeed.find((n) => n.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    const n = loaderData?.item;
    const title = n ? `${n.title} — LBC` : "Actualité — LBC";
    const description = n?.summary ?? "Actualité publiée sur LBC LBonCoin.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: NewsArticle,
});

function NewsArticle() {
  const { item } = Route.useLoaderData();
  const related = newsFeed.filter((n) => n.slug !== item.slug && n.category === item.category).slice(0, 2);
  const sourceCompany = companies.find((c) => c.name === item.source);

  return (
    <>
      <PageSection className="pb-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/actualites">
            <ArrowLeft className="size-4" /> Retour au fil
          </Link>
        </Button>

        <article className="mt-4 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 lbc-card-shadow md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-secondary/10 px-2.5 py-1 text-xs font-extrabold text-secondary">{item.category}</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <CalendarDays className="size-3.5" /> {item.date} · {item.time}
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-primary md:text-4xl">{item.title}</h1>
            <p className="mt-4 text-lg leading-8 text-foreground">{item.summary}</p>
            <div className="mt-6 grid gap-4 border-t border-border pt-6">
              {item.body.map((p) => (
                <p key={p.slice(0, 40)} className="leading-8 text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
              <div className="flex items-center gap-2">
                <Radio className="size-5 text-secondary" />
                <p className="text-xs font-bold uppercase text-muted-foreground">Publié par</p>
              </div>
              <p className="mt-3 font-display text-lg font-extrabold text-primary">{item.source}</p>
              <p className="text-sm font-semibold text-secondary">{item.sourceType}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Cette information est publiée directement par la structure concernée et reste reliée à sa source.
              </p>
              {sourceCompany && (
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link to="/entreprises/$slug" params={{ slug: sourceCompany.slug }}>
                    Voir la fiche
                  </Link>
                </Button>
              )}
            </div>

            {related.length > 0 && (
              <div>
                <h2 className="font-display text-lg font-extrabold text-primary">À lire aussi</h2>
                <div className="mt-4 grid gap-5">
                  {related.map((n) => (
                    <NewsCard key={n.slug} item={n} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </article>
      </PageSection>
    </>
  );
}
