import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, Search, Sparkles } from "lucide-react";
import { useMemo } from "react";

import icon3dEmplois from "@/assets/icon-3d-emplois.png";
import { OpportunityCard } from "@/components/lbc/cards";
import { PageSection, SectionHeading } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { communes, opportunities, opportunityTypes, studyLevels } from "@/lib/lbc-data";

type SearchParams = { q?: string | undefined; type?: string | undefined; commune?: string | undefined; niveau?: string | undefined };

export const Route = createFileRoute("/emplois/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s["q"] === "string" && s["q"] ? s["q"] : undefined,
    type: typeof s["type"] === "string" && s["type"] ? s["type"] : undefined,
    commune: typeof s["commune"] === "string" && s["commune"] ? s["commune"] : undefined,
    niveau: typeof s["niveau"] === "string" && s["niveau"] ? s["niveau"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Emplois, stages et alternances au Bénin — LBC" },
      { name: "description", content: "Offres d'emploi, stages, alternances, recrutements et appels à candidatures au Bénin, filtrables par domaine, niveau et commune." },
      { property: "og:title", content: "Emplois, stages et alternances au Bénin — LBC" },
      { property: "og:description", content: "Trouvez l'opportunité qui correspond à votre profil partout au Bénin." },
    ],
  }),
  component: JobsPage,
});

const ALL = "__all";

function JobsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const set = (patch: Partial<SearchParams>) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const results = useMemo(() => {
    const q = (search.q ?? "").toLowerCase().trim();
    return opportunities.filter((o) => {
      const hay = `${o.title} ${o.company} ${o.domain} ${o.location} ${o.summary} ${o.missions.join(" ")}`.toLowerCase();
      return (
        (!q || q.split(/\s+/).every((w) => hay.includes(w))) &&
        (!search.type || o.type === search.type) &&
        (!search.commune || o.location === search.commune) &&
        (!search.niveau || o.level.includes(search.niveau))
      );
    });
  }, [search]);

  return (
    <>
      <PageSection className="pb-4">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_auto]">
          <SectionHeading
            eyebrow="Emplois & stages"
            title="Les opportunités professionnelles du Bénin"
            description="Offres d'emploi, stages, alternances, recrutements et appels à candidatures publiés par les structures elles-mêmes. Filtrez par domaine, niveau d'études ou localisation."
          />
          <img src={icon3dEmplois} alt="" className="mx-auto hidden w-40 object-contain drop-shadow-xl lg:block" />
        </div>

        <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-card p-3 lbc-card-shadow md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3">
            <Search className="size-4 text-secondary" />
            <Input
              value={search.q ?? ""}
              onChange={(e) => set({ q: e.target.value || undefined })}
              placeholder="Métier, domaine, entreprise…"
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <Select value={search.type ?? ALL} onValueChange={(v) => set({ type: v === ALL ? undefined : v })}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Tous les types</SelectItem>
              {opportunityTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={search.commune ?? ALL} onValueChange={(v) => set({ commune: v === ALL ? undefined : v })}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue placeholder="Localisation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Tout le Bénin</SelectItem>
              {communes.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={search.niveau ?? ALL} onValueChange={(v) => set({ niveau: v === ALL ? undefined : v })}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue placeholder="Niveau d'études" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Tous les niveaux</SelectItem>
              {studyLevels.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {opportunityTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set({ type: search.type === t ? undefined : t })}
              className={
                "rounded-full border px-4 py-1.5 text-sm font-bold transition-colors " +
                (search.type === t
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-secondary hover:text-secondary")
              }
            >
              {t}
            </button>
          ))}
        </div>
      </PageSection>

      <PageSection className="pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-muted-foreground">
            <span className="font-display text-2xl font-extrabold text-primary">{results.length}</span> opportunité{results.length > 1 ? "s" : ""}
          </p>
          {(search.q || search.type || search.commune || search.niveau) && (
            <Button variant="ghost" size="sm" onClick={() => navigate({ search: {} })}>
              Réinitialiser
            </Button>
          )}
        </div>

        {results.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <BriefcaseBusiness className="mx-auto size-8 text-secondary" />
            <p className="mt-3 font-display text-xl font-bold text-primary">Aucune opportunité pour ces critères.</p>
            <p className="mt-2 text-sm text-muted-foreground">Élargissez la recherche ou demandez à l'assistant IA de vous orienter.</p>
            <Button asChild className="mt-5">
              <Link to="/assistant">
                Demander à l'assistant <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </PageSection>

      <PageSection className="pb-20 pt-4">
        <div className="lbc-hero-panel grid items-center gap-8 rounded-3xl p-8 text-primary-foreground md:grid-cols-[1.4fr_1fr] md:p-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase text-accent-foreground">
              <Sparkles className="size-3.5" /> Bientôt
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold">L'IA trouve les offres faites pour vous</h2>
            <p className="mt-3 max-w-xl text-primary-foreground/80">
              Décrivez votre profil, votre domaine et votre commune : l'assistant LBC vous proposera les opportunités les plus proches de votre parcours.
            </p>
            <Button asChild variant="accent" className="mt-6">
              <Link to="/assistant" search={{ q: "Je cherche un stage en génie mécanique à Cotonou." }}>
                Essayer maintenant <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-2xl bg-primary-foreground/10 p-6">
            <p className="text-sm font-bold uppercase text-primary-foreground/70">Vous recrutez ?</p>
            <p className="mt-2 text-primary-foreground/85">Publiez vos offres, stages et appels à candidatures depuis votre espace structure.</p>
            <Button asChild variant="outline" className="mt-4 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/15">
              <Link to="/espace-entreprise">Publier une offre</Link>
            </Button>
          </div>
        </div>
      </PageSection>
    </>
  );
}
