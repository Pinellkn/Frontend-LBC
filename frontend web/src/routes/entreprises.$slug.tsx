import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Clock3,
  Globe,
  Mail,
  MapPin,
  Phone,
  Share2,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import verified3d from "@/assets/lbc-verified-3d.png";
import { OpportunityCard } from "@/components/lbc/cards";
import { PageSection, StatusBadge } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { companies, newsFeed, opportunities } from "@/lib/lbc-data";

export const Route = createFileRoute("/entreprises/$slug")({
  loader: ({ params }) => {
    const company = companies.find((c) => c.slug === params.slug);
    if (!company) throw notFound();
    return { company };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.company;
    const title = c ? `${c.name} — ${c.commune} | LBC LBonCoin` : "Entreprise — LBC";
    const description = c?.description ?? "Fiche entreprise sur LBC LBonCoin.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CompanyPage,
});

function CompanyPage() {
  const { company } = Route.useLoaderData();
  const companyJobs = opportunities.filter((o) => o.companySlug === company.slug);
  const companyNews = newsFeed.filter((n) => n.source === company.name);
  const similar = companies.filter((c) => c.sector === company.sector && c.slug !== company.slug).slice(0, 3);

  return (
    <>
      <PageSection className="pb-4">
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Link to="/" className="hover:text-secondary">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/entreprises" className="hover:text-secondary">
            Entreprises
          </Link>
          <span>/</span>
          <span className="text-foreground">{company.name}</span>
        </nav>

        <div className="mt-6 overflow-hidden rounded-3xl lbc-hero-panel p-8 text-primary-foreground md:p-10">
          <div className="flex flex-wrap items-start gap-6">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/10 font-display text-3xl font-extrabold">
              {company.name.slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl font-extrabold md:text-4xl">{company.name}</h1>
                {company.status === "Vérifiée" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground">
                    <BadgeCheck className="size-3.5" /> Entreprise vérifiée
                  </span>
                )}
              </div>
              <p className="mt-2 text-primary-foreground/80">
                {company.sector} · {company.commune}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild variant="accent">
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`}>
                    <Phone className="size-4" /> Appeler
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                  <a href={`mailto:${company.email}`}>
                    <Mail className="size-4" /> Écrire
                  </a>
                </Button>
                {company.website && (
                  <Button asChild variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                    <a href={`https://${company.website}`} target="_blank" rel="noreferrer">
                      <Globe className="size-4" /> Site web
                    </a>
                  </Button>
                )}
              </div>
            </div>
            <img src={verified3d} alt="" className="hidden size-24 object-contain md:block" />
          </div>
        </div>
      </PageSection>

      <PageSection className="pt-4">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
              <h2 className="font-display text-xl font-extrabold text-primary">Présentation</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{company.description}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ["Création", company.founded, CalendarDays],
                  ["Effectif", company.size, Users],
                  ["Horaires", company.hours, Clock3],
                ].map(([label, value, Icon]) => {
                  const I = Icon as typeof Clock3;
                  return (
                    <div key={label as string} className="rounded-xl bg-muted/60 p-4">
                      <I className="size-4 text-secondary" />
                      <p className="mt-2 text-xs font-bold uppercase text-muted-foreground">{label as string}</p>
                      <p className="mt-1 text-sm font-bold text-primary">{value as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
              <h2 className="font-display text-xl font-extrabold text-primary">Services</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {company.services.map((s) => (
                  <span key={s} className="rounded-full border border-border bg-muted/60 px-4 py-2 text-sm font-semibold text-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {companyJobs.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-extrabold text-primary">Opportunités publiées</h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {companyJobs.map((o) => (
                    <OpportunityCard key={o.id} opportunity={o} />
                  ))}
                </div>
              </div>
            )}

            {companyNews.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
                <h2 className="font-display text-xl font-extrabold text-primary">Actualités de la structure</h2>
                <div className="mt-4 grid gap-3">
                  {companyNews.map((n) => (
                    <Link
                      key={n.slug}
                      to="/actualites/$slug"
                      params={{ slug: n.slug }}
                      className="flex items-center justify-between gap-4 rounded-xl bg-muted/50 p-4 hover:bg-muted"
                    >
                      <span className="font-bold text-primary">{n.title}</span>
                      <span className="shrink-0 text-xs font-semibold text-muted-foreground">{n.date}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
              <h2 className="font-display text-lg font-extrabold text-primary">Coordonnées</h2>
              <div className="mt-4 grid gap-3 text-sm">
                <InfoLine icon={MapPin} label="Adresse" value={`${company.address}, ${company.commune}`} />
                <InfoLine icon={Phone} label="Téléphone" value={company.phone} />
                <InfoLine icon={Mail} label="E-mail" value={company.email} />
                {company.website && <InfoLine icon={Globe} label="Site" value={company.website} />}
                <InfoLine icon={Clock3} label="Horaires" value={company.hours} />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
              <div className="flex items-center gap-2">
                <Star className="size-5 fill-accent text-accent" />
                <p className="font-display text-2xl font-extrabold text-primary">{company.rating}</p>
                <span className="text-sm text-muted-foreground">({company.reviews} avis)</span>
              </div>
              <div className="mt-4">
                <StatusBadge tone={company.status === "Vérifiée" ? "success" : "neutral"}>
                  <ShieldCheck className="mr-1 size-3.5" /> {company.status}
                </StatusBadge>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Les fiches vérifiées sont contrôlées par l'équipe LBC (RCCM, IFU, coordonnées et activité réelle).
              </p>
              <div className="mt-5 grid gap-2">
                <Button asChild variant="outline">
                  <Link to="/espace-entreprise">
                    <Building2 className="size-4" /> C'est mon entreprise
                  </Link>
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="size-4" /> Signaler une information
                </Button>
              </div>
            </div>

            {similar.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
                <h2 className="font-display text-lg font-extrabold text-primary">Dans le même secteur</h2>
                <div className="mt-4 grid gap-3">
                  {similar.map((c) => (
                    <Link
                      key={c.slug}
                      to="/entreprises/$slug"
                      params={{ slug: c.slug }}
                      className="rounded-xl bg-muted/50 p-3 hover:bg-muted"
                    >
                      <p className="font-bold text-primary">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.commune}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </PageSection>
    </>
  );
}

function InfoLine({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-secondary" />
      <div>
        <p className="text-xs font-bold uppercase text-muted-foreground">{label}</p>
        <p className="font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
