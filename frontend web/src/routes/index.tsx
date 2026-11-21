import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Clock3, LogOut, Search, X } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import icon3dActualites from "@/assets/icon-3d-actualites.png";
import icon3dEmplois from "@/assets/icon-3d-emplois.png";
import icon3dEntreprises from "@/assets/icon-3d-entreprises.png";
import icon3dInfos from "@/assets/icon-3d-infos.png";
import { CompanyCard, NewsCard, OpportunityCard, PracticalCard } from "@/components/lbc/cards";
import { PageSection } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  featuredCompanies,
  lbcModules,
  newsFeed,
  opportunities,
  practicalInfos,
} from "@/lib/lbc-data";
import { signOut, useRecentSearches, useSession } from "@/lib/lbc-session";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Accueil — LBonCoin, Tout le Bénin en un clic" },
      {
        name: "description",
        content:
          "Vos recommandations, vos recherches récentes, les emplois, les actualités et les informations pratiques du Bénin sur LBonCoin.",
      },
      { property: "og:title", content: "Accueil — LBonCoin" },
      {
        property: "og:description",
        content: "Tout le Bénin en un clic : entreprises, emplois, actualités et infos pratiques.",
      },
    ],
  }),
  component: HomePage,
});

const moduleIcons = [icon3dEntreprises, icon3dEmplois, icon3dActualites, icon3dInfos];
const popularSearches = [
  "BTP Cotonou",
  "Banque Porto-Novo",
  "Santé Abomey-Calavi",
  "Transport Parakou",
  "Stage informatique",
];

function HomePage() {
  const navigate = useNavigate();
  const { ready, session } = useSession();

  // Pas de session : on envoie le visiteur vers la page de bienvenue (onboarding).
  useEffect(() => {
    if (ready && !session) navigate({ to: "/bienvenue", replace: true });
  }, [ready, session, navigate]);

  if (!ready || !session) return <div className="min-h-[70vh]" aria-hidden="true" />;

  return (
    <HomeFeed
      name={session.name}
      onSignOut={() => {
        signOut();
        navigate({ to: "/bienvenue", replace: true });
      }}
    />
  );
}

function FeedSection({
  title,
  description,
  href,
  hrefLabel = "Tout voir",
  action,
  children,
}: {
  title: string;
  description?: string;
  href?: "/entreprises" | "/emplois" | "/actualites" | "/infos-pratiques";
  hrefLabel?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <PageSection className="pb-10 pt-2">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-primary md:text-3xl">{title}</h2>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {action}
        {href && (
          <Link
            to={href}
            className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:underline"
          >
            {hrefLabel} <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
      {children}
    </PageSection>
  );
}

function HomeFeed({ name, onSignOut }: { name: string; onSignOut: () => void }) {
  const navigate = useNavigate();
  const { recents, add, remove, clear } = useRecentSearches();
  const [query, setQuery] = useState("");
  const firstName = name.split(" ")[0];

  const runSearch = (value: string) => {
    const q = value.trim();
    if (!q) return;
    add(q);
    navigate({ to: "/entreprises", search: { q } });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    runSearch(query);
  };

  return (
    <>
      <PageSection className="pb-8 pt-8">
        <div className="lbc-hero-panel rounded-3xl p-6 text-primary-foreground md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-primary-foreground/80">Bonjour, {firstName}</p>
              <h1 className="mt-1 font-display text-3xl font-extrabold md:text-4xl">
                Que cherchez-vous aujourd'hui ?
              </h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-white/10"
              onClick={onSignOut}
            >
              <LogOut className="size-4" /> Se déconnecter
            </Button>
          </div>
          <form
            onSubmit={onSubmit}
            className="mt-6 flex max-w-2xl items-center gap-2 rounded-2xl bg-white p-2 shadow-lg"
          >
            <Search className="ml-3 size-5 shrink-0 text-secondary" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher entreprises, emplois…"
              className="border-0 text-foreground shadow-none focus-visible:ring-0"
              aria-label="Rechercher"
            />
            <Button type="submit" variant="accent" className="rounded-xl">
              Rechercher
            </Button>
          </form>
        </div>
      </PageSection>

      <FeedSection title="Accès rapide" description="Tout LBonCoin à portée de clic.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lbcModules.map((m, i) => (
            <Link
              key={m.href}
              to={m.href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 lbc-card-shadow transition-all hover:-translate-y-1 hover:border-secondary/40"
            >
              <img
                src={moduleIcons[i]}
                alt=""
                className="h-16 w-16 shrink-0 object-contain drop-shadow-md transition-transform group-hover:scale-110"
              />
              <div className="min-w-0">
                <h3 className="font-display text-lg font-extrabold text-primary">{m.title}</h3>
                <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
                  {m.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </FeedSection>

      <FeedSection
        title="Recommandations pour vous"
        description="Une sélection d'entreprises vérifiées, choisies pour vous."
        href="/entreprises"
      >
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredCompanies.map((company) => (
            <CompanyCard key={company.slug} company={company} compact />
          ))}
        </div>
      </FeedSection>

      <FeedSection
        title="Vos recherches récentes"
        description={
          recents.length
            ? "Reprenez là où vous vous êtes arrêté."
            : "Vos prochaines recherches apparaîtront ici."
        }
        action={
          recents.length > 0 ? (
            <button
              type="button"
              onClick={clear}
              className="text-sm font-semibold text-muted-foreground hover:text-secondary"
            >
              Tout effacer
            </button>
          ) : undefined
        }
      >
        {recents.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {recents.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card py-1 pl-4 pr-1 text-sm font-semibold text-primary lbc-card-shadow"
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-2 hover:text-secondary"
                  onClick={() => runSearch(item)}
                >
                  <Clock3 className="size-4 text-secondary" /> {item}
                </button>
                <button
                  type="button"
                  aria-label={`Retirer « ${item} »`}
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => remove(item)}
                >
                  <X className="size-3.5" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div>
            <p className="mb-3 text-sm font-bold text-muted-foreground">Recherches populaires</p>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => runSearch(item)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary lbc-card-shadow hover:border-secondary/40 hover:text-secondary"
                >
                  <Search className="size-4 text-secondary" /> {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </FeedSection>

      <FeedSection
        title="Emplois et stages pour vous"
        description="Des opportunités à saisir près de chez vous."
        href="/emplois"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {opportunities.slice(0, 3).map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </FeedSection>

      <FeedSection
        title="À la une de l'actualité"
        description="L'économie et la vie des affaires au Bénin."
        href="/actualites"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {newsFeed.slice(0, 3).map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </FeedSection>

      <FeedSection
        title="Infos pratiques utiles"
        description="Démarches, services publics et conseils du quotidien."
        href="/infos-pratiques"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {practicalInfos.slice(0, 3).map((info) => (
            <PracticalCard key={info.slug} info={info} />
          ))}
        </div>
      </FeedSection>
    </>
  );
}
