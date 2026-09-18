import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Building2, CalendarDays, Clock3, GraduationCap, MapPin, Send, Wallet } from "lucide-react";

import { OpportunityCard } from "@/components/lbc/cards";
import { PageSection, StatusBadge } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { companies, opportunities } from "@/lib/lbc-data";

export const Route = createFileRoute("/emplois/$id")({
  loader: ({ params }) => {
    const opportunity = opportunities.find((o) => o.id === params.id);
    if (!opportunity) throw notFound();
    return { opportunity };
  },
  head: ({ loaderData }) => {
    const o = loaderData?.opportunity;
    const title = o ? `${o.title} — ${o.company} | LBC` : "Opportunité — LBC";
    const description = o?.summary ?? "Opportunité professionnelle au Bénin sur LBC.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: JobPage,
});

function JobPage() {
  const { opportunity: o } = Route.useLoaderData();
  const company = companies.find((c) => c.slug === o.companySlug);
  const related = opportunities.filter((x) => x.id !== o.id && (x.domain === o.domain || x.location === o.location)).slice(0, 3);

  return (
    <>
      <PageSection className="pb-4">
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Link to="/" className="hover:text-secondary">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/emplois" className="hover:text-secondary">
            Emplois & stages
          </Link>
          <span>/</span>
          <span className="text-foreground">{o.title}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="rounded-3xl border border-border bg-card p-8 lbc-card-shadow">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge>{o.type}</StatusBadge>
                <span className="text-xs font-semibold text-muted-foreground">Publié {o.posted.toLowerCase()}</span>
              </div>
              <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-primary md:text-4xl">{o.title}</h1>
              <Link
                to="/entreprises/$slug"
                params={{ slug: o.companySlug }}
                className="mt-3 inline-flex items-center gap-2 text-base font-bold text-secondary hover:underline"
              >
                <Building2 className="size-4" /> {o.company}
              </Link>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Fact icon={MapPin} label="Localisation" value={o.location} />
                <Fact icon={GraduationCap} label="Niveau" value={o.level} />
                <Fact icon={Clock3} label="Contrat" value={o.contract} />
                <Fact icon={CalendarDays} label="Date limite" value={o.deadline} />
              </div>

              <p className="mt-6 leading-7 text-muted-foreground">{o.summary}</p>

              <h2 className="mt-8 font-display text-xl font-extrabold text-primary">Missions</h2>
              <ul className="mt-3 grid gap-2">
                {o.missions.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                    {m}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 font-display text-xl font-extrabold text-primary">Profil recherché</h2>
              <ul className="mt-3 grid gap-2">
                {o.profile.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl bg-muted/60 p-6">
                <h2 className="font-display text-lg font-extrabold text-primary">Comment postuler</h2>
                <p className="mt-2 leading-7 text-muted-foreground">{o.howToApply}</p>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
              {o.salary && (
                <div className="flex items-start gap-3">
                  <Wallet className="mt-0.5 size-5 text-secondary" />
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground">Rémunération</p>
                    <p className="font-bold text-primary">{o.salary}</p>
                  </div>
                </div>
              )}
              <div className="mt-5 grid gap-2">
                <Button asChild size="lg">
                  <a href={`mailto:${company?.email ?? "contact@lbc.bj"}?subject=${encodeURIComponent(`Candidature — ${o.title}`)}`}>
                    <Send className="size-4" /> Postuler
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/entreprises/$slug" params={{ slug: o.companySlug }}>
                    Voir la structure
                  </Link>
                </Button>
              </div>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                LBC ne demande jamais de frais de dossier. Signalez toute demande de paiement liée à une offre.
              </p>
            </div>

            {company && (
              <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
                <p className="text-xs font-bold uppercase text-muted-foreground">À propos de l'employeur</p>
                <p className="mt-2 font-display text-lg font-extrabold text-primary">{company.name}</p>
                <p className="mt-1 text-sm font-semibold text-secondary">{company.sector}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{company.description}</p>
              </div>
            )}
          </aside>
        </div>
      </PageSection>

      {related.length > 0 && (
        <PageSection className="pb-20 pt-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-extrabold text-primary">Opportunités similaires</h2>
            <Button asChild variant="outline">
              <Link to="/emplois">
                Toutes les offres <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <OpportunityCard key={r.id} opportunity={r} />
            ))}
          </div>
        </PageSection>
      )}
    </>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 p-4">
      <Icon className="size-4 text-secondary" />
      <p className="mt-2 text-xs font-bold uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-bold text-primary">{value}</p>
    </div>
  );
}
