import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Building2, Search, Sparkles } from "lucide-react";
import { useState } from "react";

import icon3dActualites from "@/assets/icon-3d-actualites.png";
import icon3dEmplois from "@/assets/icon-3d-emplois.png";
import icon3dEntreprises from "@/assets/icon-3d-entreprises.png";
import icon3dInfos from "@/assets/icon-3d-infos.png";
import aiOrb from "@/assets/lbc-ai-orb.png";
import heroBenin from "@/assets/lbc-hero-benin.jpg";
import verified3d from "@/assets/lbc-verified-3d.png";
import { CompanyCard, NewsCard, OpportunityCard } from "@/components/lbc/cards";
import { PageSection } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  assistantExamples,
  featuredCompanies,
  impactCards,
  lbcModules,
  newsFeed,
  opportunities,
  roadmapSteps,
  sectors,
} from "@/lib/lbc-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LBC LBonCoin — Tout le Bénin en un clic" },
      { name: "description", content: "Entreprises, emplois & stages, actualités et informations pratiques du Bénin réunis sur une seule plateforme, avec un assistant IA." },
      { property: "og:title", content: "LBC LBonCoin — Tout le Bénin en un clic" },
      { property: "og:description", content: "Le carrefour numérique du Bénin : entreprises, emplois, actualités et infos pratiques." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const moduleIcons = [icon3dEntreprises, icon3dEmplois, icon3dActualites, icon3dInfos];

function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-card px-3 py-1 text-xs font-extrabold uppercase text-secondary">
              <BadgeCheck className="size-3.5" /> Plateforme numérique du Bénin
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-primary sm:text-5xl lg:text-6xl">
              Tout le Bénin
              <br />
              <span className="text-secondary">en un clic.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              Entreprises, emplois & stages, actualités et informations pratiques : LBC rassemble au même endroit des informations fiables et à jour,
              pour tout le Bénin.
            </p>

            <form
              className="mt-8 flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 lbc-card-shadow sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/entreprises", search: { q: query } });
              }}
            >
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="size-5 text-secondary" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Une entreprise, un métier, une commune…"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
              <Button type="submit" size="lg" className="rounded-xl">
                Rechercher
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
              <span>Populaire :</span>
              {["BTP Abomey-Calavi", "Stage Cotonou", "Pharmacie de garde", "Créer une entreprise"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => navigate({ to: "/entreprises", search: { q: tag } })}
                  className="rounded-full bg-muted px-3 py-1 hover:bg-secondary/10 hover:text-secondary"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                ["1 240", "entreprises référencées"],
                ["86", "opportunités actives"],
                ["12", "communes couvertes"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl font-extrabold text-primary md:text-3xl">{v}</p>
                  <p className="text-xs font-semibold text-muted-foreground md:text-sm">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="lbc-hero-panel overflow-hidden rounded-3xl p-2">
              <img src={heroBenin} alt="Carte 3D du Bénin reliant entreprises, emplois, actualités et institutions" className="w-full rounded-2xl object-cover" />
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-card p-3 pr-5 lbc-card-shadow sm:left-8">
              <img src={verified3d} alt="" className="size-12 object-contain" />
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">Confiance</p>
                <p className="font-display text-sm font-extrabold text-primary">Entreprises vérifiées</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageSection className="pt-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {lbcModules.map((m, i) => (
            <Link
              key={m.href}
              to={m.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 lbc-card-shadow transition-all hover:-translate-y-1 hover:border-secondary/40"
            >
              <img src={moduleIcons[i]} alt="" className="h-24 w-24 object-contain drop-shadow-lg transition-transform group-hover:scale-110" />
              <h2 className="mt-4 font-display text-xl font-extrabold text-primary">{m.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{m.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="rounded-md bg-secondary/10 px-2 py-1 text-xs font-extrabold text-secondary">{m.signal}</span>
                <ArrowRight className="size-5 text-secondary transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <div className="lbc-hero-panel grid items-center gap-8 overflow-hidden rounded-3xl p-8 text-primary-foreground md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase text-accent-foreground">
              <Sparkles className="size-3.5" /> Assistant IA LBC
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">Demandez, LBC vous oriente.</h2>
            <p className="mt-3 max-w-xl text-primary-foreground/80">
              L'assistant comprend votre demande et vous dirige vers les entreprises, opportunités et informations disponibles.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {assistantExamples.map((ex) => (
                <Link
                  key={ex}
                  to="/assistant"
                  search={{ q: ex }}
                  className="rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-sm font-semibold hover:bg-primary-foreground/20"
                >
                  « {ex} »
                </Link>
              ))}
            </div>
            <Button asChild variant="accent" size="lg" className="mt-8 rounded-xl">
              <Link to="/assistant">
                Ouvrir l'assistant <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <img src={aiOrb} alt="Orbe 3D de l'assistant IA LBC" className="mx-auto w-52 object-contain drop-shadow-2xl md:w-72" />
        </div>
      </PageSection>

      <PageSection>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-extrabold uppercase text-secondary">Annuaire</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-primary">Entreprises vérifiées à la une</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/entreprises">
              Voir toutes les entreprises <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCompanies.map((c) => (
            <CompanyCard key={c.slug} company={c} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {sectors.map((s) => (
            <Link
              key={s.name}
              to="/entreprises"
              search={{ secteur: s.name }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-secondary hover:text-secondary"
            >
              <Building2 className="size-4 text-secondary" /> {s.name}
              <span className="text-xs text-muted-foreground">{s.count}</span>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold uppercase text-secondary">Emplois & stages</p>
                <h2 className="mt-2 font-display text-3xl font-extrabold text-primary">Dernières opportunités</h2>
              </div>
              <Button asChild variant="outline">
                <Link to="/emplois">
                  Toutes les offres <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {opportunities.slice(0, 4).map((o) => (
                <OpportunityCard key={o.id} opportunity={o} />
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold uppercase text-secondary">Actualités</p>
                <h2 className="mt-2 font-display text-3xl font-extrabold text-primary">Le fil du jour</h2>
              </div>
              <Button asChild variant="outline">
                <Link to="/actualites">
                  Le fil <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-5">
              {newsFeed[0] && <NewsCard item={newsFeed[0]} featured />}
              {newsFeed.slice(1, 3).map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className="text-center">
          <p className="text-sm font-extrabold uppercase text-secondary">Impact</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-primary md:text-4xl">Digitaliser l'économie béninoise</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {impactCards.map((c, i) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
              <span className="font-display text-4xl font-extrabold text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-primary">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="pb-20">
        <div className="rounded-3xl border border-border bg-card p-8 lbc-card-shadow md:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase text-secondary">Stratégie</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-primary">Un MVP, puis tout le Bénin, progressivement.</h2>
            <p className="mt-3 text-muted-foreground">On teste le concept, on référence les premières entreprises et on lance les fonctionnalités étape par étape.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {roadmapSteps.map((step, i) => (
              <div key={step.phase} className="relative rounded-2xl bg-muted/60 p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary font-display font-extrabold text-primary-foreground">{i + 1}</span>
                  <span className="text-xs font-bold text-muted-foreground">{step.period}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-primary">{step.phase}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {step.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <BadgeCheck className="mt-0.5 size-4 shrink-0 text-lbc-sage" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
    </>
  );
}
