import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Search, SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";

import businessVerified from "@/assets/lbc-business-verified.jpg";
import { CompanyCard } from "@/components/lbc/cards";
import { PageSection, SectionHeading } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { communes, companies, sectors } from "@/lib/lbc-data";

type SearchParams = { q?: string | undefined; secteur?: string | undefined; commune?: string | undefined; statut?: string | undefined };

export const Route = createFileRoute("/entreprises/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s["q"] === "string" && s["q"] ? s["q"] : undefined,
    secteur: typeof s["secteur"] === "string" && s["secteur"] ? s["secteur"] : undefined,
    commune: typeof s["commune"] === "string" && s["commune"] ? s["commune"] : undefined,
    statut: typeof s["statut"] === "string" && s["statut"] ? s["statut"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Annuaire des entreprises du Bénin — LBC" },
      { name: "description", content: "Recherchez une entreprise béninoise par nom, secteur ou commune. Fiches complètes et vérifiées." },
      { property: "og:title", content: "Annuaire des entreprises du Bénin — LBC" },
      { property: "og:description", content: "Recherche par nom, secteur ou commune. Fiches complètes et vérifiées." },
    ],
  }),
  component: CompaniesPage,
});

const ALL = "__all";

function CompaniesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const set = (patch: Partial<SearchParams>) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const results = useMemo(() => {
    const q = (search.q ?? "").toLowerCase().trim();
    return companies.filter((c) => {
      const hay = `${c.name} ${c.sector} ${c.commune} ${c.description} ${c.services.join(" ")}`.toLowerCase();
      const matchQ = !q || q.split(/\s+/).every((w) => hay.includes(w));
      return (
        matchQ &&
        (!search.secteur || c.sector === search.secteur) &&
        (!search.commune || c.commune === search.commune) &&
        (!search.statut || c.status === search.statut)
      );
    });
  }, [search]);

  return (
    <>
      <PageSection className="pb-4">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <SectionHeading
            eyebrow="Entreprises"
            title="L'annuaire des entreprises du Bénin"
            description="Recherchez par nom, secteur ou commune. Chaque entreprise dispose de sa page avec ses coordonnées, ses services et son statut de vérification."
          />
          <div className="relative hidden overflow-hidden rounded-3xl lg:block">
            <img src={businessVerified} alt="Entreprise béninoise vérifiée sur LBC" className="h-56 w-full object-cover" />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-xl bg-card/95 p-3 lbc-card-shadow">
              <BadgeCheck className="size-6 text-lbc-sage" />
              <p className="text-sm font-bold text-primary">Système de vérification pour renforcer la confiance</p>
              <Button asChild size="sm" variant="accent" className="ml-auto">
                <Link to="/espace-entreprise">Référencer</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-card p-3 lbc-card-shadow md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3">
            <Search className="size-4 text-secondary" />
            <Input
              value={search.q ?? ""}
              onChange={(e) => set({ q: e.target.value || undefined })}
              placeholder="Nom, service, mot-clé…"
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <Select value={search.secteur ?? ALL} onValueChange={(v) => set({ secteur: v === ALL ? undefined : v })}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue placeholder="Secteur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Tous les secteurs</SelectItem>
              {sectors.map((s) => (
                <SelectItem key={s["name"]} value={s["name"]}>
                  {s["name"]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={search.commune ?? ALL} onValueChange={(v) => set({ commune: v === ALL ? undefined : v })}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue placeholder="Commune" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Toutes les communes</SelectItem>
              {communes.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={search.statut ?? ALL} onValueChange={(v) => set({ statut: v === ALL ? undefined : v })}>
            <SelectTrigger className="h-11 rounded-xl">
              <SlidersHorizontal className="mr-2 size-4 text-secondary" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Tous les statuts</SelectItem>
              <SelectItem value="Vérifiée">Vérifiée</SelectItem>
              <SelectItem value="À vérifier">À vérifier</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PageSection>

      <PageSection className="pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-muted-foreground">
            <span className="font-display text-2xl font-extrabold text-primary">{results.length}</span> entreprise{results.length > 1 ? "s" : ""} trouvée
            {results.length > 1 ? "s" : ""}
          </p>
          {(search.q || search.secteur || search.commune || search.statut) && (
            <Button variant="ghost" size="sm" onClick={() => navigate({ search: {} })}>
              Réinitialiser les filtres
            </Button>
          )}
        </div>

        {results.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((c) => (
              <CompanyCard key={c.slug} company={c} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-display text-xl font-bold text-primary">Aucune entreprise ne correspond encore.</p>
            <p className="mt-2 text-sm text-muted-foreground">LBC est en phase MVP : nous référençons progressivement les communes. Vous connaissez cette structure ?</p>
            <Button asChild className="mt-5">
              <Link to="/espace-entreprise">
                Proposer une entreprise <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </PageSection>

      <PageSection className="pb-20 pt-4">
        <h2 className="font-display text-2xl font-extrabold text-primary">Explorer par secteur</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => (
            <button
              key={s["name"]}
              type="button"
              onClick={() => set({ secteur: s["name"] })}
              className="rounded-xl border border-border bg-card p-4 text-left lbc-card-shadow hover:border-secondary/40"
            >
              <p className="font-bold text-primary">{s["name"]}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s["communes"]}</p>
              <p className="mt-3 font-display text-xl font-extrabold text-secondary">{s["count"]}</p>
            </button>
          ))}
        </div>
      </PageSection>
    </>
  );
}
