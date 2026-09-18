import { Link, createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, BarChart3, Building2, FileText, Megaphone, Newspaper, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

import businessVerified from "@/assets/lbc-business-verified.jpg";
import verified3d from "@/assets/lbc-verified-3d.png";
import { PageSection, SectionHeading } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { communes, sectors } from "@/lib/lbc-data";

export const Route = createFileRoute("/espace-entreprise")({
  head: () => ({
    meta: [
      { title: "Référencer ma structure — Espace entreprise LBC" },
      { name: "description", content: "Créez la page de votre entreprise ou institution sur LBC, publiez vos offres et actualités, et obtenez le badge de vérification." },
      { property: "og:title", content: "Espace entreprise — LBC LBonCoin" },
      { property: "og:description", content: "Gagnez en visibilité auprès de tout le Bénin." },
    ],
  }),
  component: BusinessSpacePage,
});

const benefits = [
  { icon: Building2, title: "Votre page officielle", text: "Coordonnées, services, horaires et localisation, mis à jour par vous-même." },
  { icon: BadgeCheck, title: "Badge de vérification", text: "RCCM, IFU et coordonnées contrôlés : vos clients savent qu'ils peuvent vous faire confiance." },
  { icon: Newspaper, title: "Publier vos actualités", text: "Annonces, événements, nouveautés : diffusées dans le fil LBC." },
  { icon: FileText, title: "Publier vos offres", text: "Emplois, stages, alternances et appels à candidatures." },
  { icon: BarChart3, title: "Statistiques", text: "Vues de votre page, clics sur vos contacts et candidatures reçues." },
  { icon: Megaphone, title: "Visibilité renforcée", text: "Mises en avant sponsorisées dans l'annuaire et sur l'accueil." },
];

const steps = [
  ["Créez votre demande", "Renseignez la structure, le secteur et la commune."],
  ["Envoyez vos justificatifs", "RCCM, IFU ou attestation, plus une preuve d'activité."],
  ["Vérification LBC", "Notre équipe contrôle les informations sous 72 h."],
  ["Gérez votre page", "Publiez vos offres, actualités et mises à jour."],
];

function BusinessSpacePage() {
  return (
    <>
      <PageSection className="pb-4">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading
            eyebrow="Espace structure"
            title="Référencez votre structure sur LBC"
            description="Entreprises, institutions et organisations : créez votre page, gérez vos informations et touchez les utilisateurs qui cherchent vos services partout au Bénin."
          />
          <div className="relative">
            <img src={businessVerified} alt="Entrepreneur béninois gérant sa page LBC" className="w-full rounded-3xl object-cover" />
            <img src={verified3d} alt="" className="absolute -bottom-6 -left-4 size-24 object-contain drop-shadow-xl" />
          </div>
        </div>
      </PageSection>

      <PageSection className="pt-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <b.icon className="size-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold text-primary">{b.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="pt-4">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="lbc-hero-panel rounded-3xl p-8 text-primary-foreground md:p-10">
            <ShieldCheck className="size-8" />
            <h2 className="mt-4 font-display text-2xl font-extrabold">Comment ça marche</h2>
            <ol className="mt-6 grid gap-5">
              {steps.map(([title, text], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-display font-extrabold text-accent-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold">{title}</p>
                    <p className="text-sm text-primary-foreground/80">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-semibold">
              <Sparkles className="size-4" /> Gratuit pendant la phase MVP
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 lbc-card-shadow md:p-10">
            <h2 className="font-display text-2xl font-extrabold text-primary">Demande de référencement</h2>
            <p className="mt-2 text-sm text-muted-foreground">Remplissez ce formulaire : l'équipe LBC vous recontacte pour finaliser la vérification.</p>
            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLFormElement).reset();
                toast.success("Demande envoyée. L'équipe LBC revient vers vous sous 72 h.");
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="structure">Nom de la structure</Label>
                <Input id="structure" required placeholder="Bénin BTP Services" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Secteur</Label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Choisir un secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((s) => (
                        <SelectItem key={s.name} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Commune</Label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Choisir une commune" />
                    </SelectTrigger>
                    <SelectContent>
                      {communes.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail de contact</Label>
                  <Input id="email" type="email" required placeholder="contact@structure.bj" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tel">Téléphone</Label>
                  <Input id="tel" required placeholder="+229 01 00 00 00 00" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="desc">Présentation et services</Label>
                <Textarea id="desc" rows={4} required placeholder="Décrivez votre activité, vos services et votre zone d'intervention." />
              </div>
              <Button type="submit" size="lg" className="mt-2 rounded-xl">
                Envoyer ma demande
              </Button>
              <p className="text-xs text-muted-foreground">
                Vous avez déjà un compte ? <Link to="/connexion" className="font-bold text-secondary hover:underline">Se connecter</Link>
              </p>
            </form>
          </div>
        </div>
      </PageSection>
    </>
  );
}
