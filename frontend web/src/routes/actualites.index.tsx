import { createFileRoute } from "@tanstack/react-router";
import { Newspaper, Radio } from "lucide-react";
import { useMemo } from "react";

import { NewsCard } from "@/components/lbc/cards";
import { PageSection, SectionHeading } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { newsCategories, newsFeed } from "@/lib/lbc-data";

type SearchParams = { categorie?: string | undefined };

export const Route = createFileRoute("/actualites/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    categorie: typeof s["categorie"] === "string" && s["categorie"] ? (s["categorie"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Actualités économiques et locales du Bénin — LBC" },
      { name: "description", content: "Le fil d'actualités publié directement par les entreprises, institutions, organisations et acteurs économiques du Bénin." },
      { property: "og:title", content: "Actualités économiques et locales du Bénin — LBC" },
      { property: "og:description", content: "Suivez l'actualité économique, professionnelle et locale depuis un seul fil." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const active = search.categorie ?? "Toutes";

  const items = useMemo(() => (active === "Toutes" ? newsFeed : newsFeed.filter((n) => n.category === active)), [active]);
  const [lead, ...rest] = items;

  const sourcesList = Array.from(new Set(newsFeed.map((n) => `${n.source}|${n.sourceType}`))).map((s) => s.split("|") as [string, string]);

  return (
    <>
      <PageSection className="pb-4">
        <SectionHeading
          eyebrow="Actualités"
          title="Le fil des acteurs du Bénin"
          description="LBC n'est pas un média de plus : les entreprises, institutions, organisations et organisateurs d'événements publient eux-mêmes leurs informations, reliées à leur source."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {newsCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => navigate({ search: c === "Toutes" ? {} : { categorie: c }, replace: true })}
              className={
                "rounded-full border px-4 py-1.5 text-sm font-bold transition-colors " +
                (active === c
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-secondary hover:text-secondary")
              }
            >
              {c}
            </button>
          ))}
        </div>
      </PageSection>

      <PageSection className="pt-4">
        {items.length ? (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="grid gap-5">
              {lead && <NewsCard item={lead} featured />}
              <div className="grid gap-5 sm:grid-cols-2">
                {rest.map((n) => (
                  <NewsCard key={n.slug} item={n} />
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
                <div className="flex items-center gap-2">
                  <Radio className="size-5 text-secondary" />
                  <h2 className="font-display text-lg font-extrabold text-primary">Sources qui publient</h2>
                </div>
                <div className="mt-4 grid gap-3">
                  {sourcesList.map(([name, type]) => (
                    <div key={name} className="rounded-xl bg-muted/50 p-3">
                      <p className="font-bold text-primary">{name}</p>
                      <p className="text-xs font-semibold text-muted-foreground">{type}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lbc-hero-panel rounded-2xl p-6 text-primary-foreground">
                <Newspaper className="size-6" />
                <h2 className="mt-3 font-display text-xl font-extrabold">Votre structure a une annonce ?</h2>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Entreprises, institutions, organisations et événements disposent d'un espace pour publier directement leurs informations.
                </p>
                <Button asChild variant="accent" className="mt-4">
                  <a href="/espace-entreprise">Demander un espace</a>
                </Button>
              </div>
            </aside>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-display text-xl font-bold text-primary">Aucune actualité dans cette catégorie.</p>
          </div>
        )}
      </PageSection>
    </>
  );
}
