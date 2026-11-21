import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, Building2, Info, Newspaper } from "lucide-react";

import { BeninPoster } from "@/components/lbc/benin-poster";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/bienvenue")({
  head: () => ({
    meta: [
      { title: "Bienvenue sur LBonCoin — Tout le Bénin en un clic" },
      {
        name: "description",
        content:
          "Entreprises vérifiées, emplois, actualités économiques et informations pratiques : créez votre compte LBonCoin ou connectez-vous.",
      },
      { property: "og:title", content: "Bienvenue sur LBonCoin — Tout le Bénin en un clic" },
      {
        property: "og:description",
        content: "De belles choses arrivent. Créez votre compte ou connectez-vous pour y accéder.",
      },
    ],
  }),
  component: WelcomePage,
});

const teasers = [
  { label: "Annuaire des entreprises", icon: Building2 },
  { label: "Emplois & carrières", icon: BriefcaseBusiness },
  { label: "Actualités économiques", icon: Newspaper },
  { label: "Informations pratiques", icon: Info },
];

function WelcomePage() {
  return (
    <main className="lbc-shell relative min-h-screen overflow-hidden text-foreground">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,27rem)_1fr] lg:gap-16">
        <div className="mx-auto w-full max-w-md [animation:lbc-splash-rise_0.8s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]">
          <BeninPoster className="rounded-3xl shadow-2xl ring-1 ring-black/5" />
        </div>

        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left [animation:lbc-splash-rise_0.8s_cubic-bezier(0.22,1,0.36,1)_0.35s_both]">
          <p className="text-sm font-extrabold uppercase tracking-wider text-secondary">
            LBonCoin · Tout le Bénin en un clic
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-primary md:text-5xl">
            Tout le Bénin vous attend.
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            De belles choses arrivent sur LBonCoin : des entreprises vérifiées, des opportunités
            d'emploi, l'actualité économique et les informations utiles du quotidien. Créez votre
            compte ou connectez-vous pour y accéder dès maintenant.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {teasers.map((t) => (
              <li
                key={t.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card/80 px-4 py-3 text-left text-sm font-bold text-primary lbc-card-shadow"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <t.icon className="size-5" />
                </span>
                {t.label}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-semibold text-muted-foreground">
            Et bien d'autres nouveautés à venir…
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg" className="rounded-xl">
              <Link to="/connexion" search={{ mode: "inscription" }}>
                Créer mon compte
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link to="/connexion">J'ai déjà un compte · Me connecter</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
