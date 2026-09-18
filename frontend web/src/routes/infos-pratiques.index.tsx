import { createFileRoute } from "@tanstack/react-router";
import { Landmark, Phone, Search } from "lucide-react";
import { useMemo } from "react";

import icon3dInfos from "@/assets/icon-3d-infos.png";
import { PracticalCard } from "@/components/lbc/cards";
import { PageSection, SectionHeading } from "@/components/lbc/page-tools";
import { Input } from "@/components/ui/input";
import { administrations, practicalCategories, practicalInfos } from "@/lib/lbc-data";

type SearchParams = { q?: string | undefined; categorie?: string | undefined };

export const Route = createFileRoute("/infos-pratiques/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s["q"] === "string" && s["q"] ? (s["q"] as string) : undefined,
    categorie: typeof s["categorie"] === "string" && s["categorie"] ? (s["categorie"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Informations pratiques au Bénin — LBC" },
      { name: "description", content: "Démarches, administrations, documents, fiscalité et numéros utiles au Bénin, avec redirection vers les sites officiels." },
      { property: "og:title", content: "Informations pratiques au Bénin — LBC" },
      { property: "og:description", content: "Les démarches et services utiles au quotidien, réunis et à jour." },
    ],
  }),
  component: PracticalPage,
});

function PracticalPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const active = search.categorie ?? "Toutes";

  const items = useMemo(() => {
    const q = (search.q ?? "").toLowerCase().trim();
    return practicalInfos.filter((i) => {
      const hay = `${i.title} ${i.category} ${i.owner} ${i.description} ${i.steps.join(" ")}`.toLowerCase();
      return (!q || q.split(/\s+/).every((w) => hay.includes(w))) && (active === "Toutes" || i.category === active);
    });
  }, [search.q, active]);

  return (
    <>
      <PageSection className="pb-4">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_auto]">
          <SectionHeading
            eyebrow="Infos pratiques"
            title="Les démarches utiles au quotidien"
            description="Formalités, documents d'identité, fiscalité, transport, services publics et numéros d'urgence. Lorsque LBC ne délivre pas le document, l'application vous oriente vers le site officiel concerné."
          />
          <img src={icon3dInfos} alt="" className="mx-auto hidden w-40 object-contain drop-shadow-xl lg:block" />
        </div>

        <div className="mt-8 flex items-center gap-2 rounded-2xl border border-border bg-card p-3 lbc-card-shadow">
          <Search className="ml-2 size-4 text-secondary" />
          <Input
            value={search.q ?? ""}
            onChange={(e) => navigate({ search: (prev) => ({ ...prev, q: e.target.value || undefined }), replace: true })}
            placeholder="Une démarche, un document, un service…"
            className="border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {practicalCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => navigate({ search: (prev) => ({ ...prev, categorie: c === "Toutes" ? undefined : c }), replace: true })}
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((i) => (
              <PracticalCard key={i.slug} info={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-display text-xl font-bold text-primary">Aucune information ne correspond à cette recherche.</p>
          </div>
        )}
      </PageSection>

      <PageSection className="pb-20 pt-4">
        <div className="flex items-center gap-2">
          <Landmark className="size-5 text-secondary" />
          <h2 className="font-display text-2xl font-extrabold text-primary">Administrations par commune</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {administrations.map((a) => (
            <div key={a.name} className="rounded-xl border border-border bg-card p-5 lbc-card-shadow">
              <p className="font-display text-lg font-bold text-primary">{a.name}</p>
              <p className="mt-1 text-sm font-semibold text-secondary">{a.commune}</p>
              <p className="mt-3 text-sm text-muted-foreground">{a.domain}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-muted-foreground">
                <a href={`tel:${a.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 text-secondary">
                  <Phone className="size-3.5" /> {a.phone}
                </a>
                <span>{a.hours}</span>
              </div>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  );
}
