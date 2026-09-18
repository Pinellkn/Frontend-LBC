import { Link, createFileRoute } from "@tanstack/react-router";
import { Building2, Landmark, Lock, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import lbcLogo from "@/assets/lbc-logo.png";
import beninHub from "@/assets/lbc-benin-digital-hub.jpg";
import { PageSection } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion — LBC LBonCoin" },
      { name: "description", content: "Connectez-vous à votre compte LBC : utilisateur, entreprise ou institution." },
      { property: "og:title", content: "Connexion — LBC LBonCoin" },
      { property: "og:description", content: "Accédez à votre espace LBC." },
    ],
  }),
  component: LoginPage,
});

const profiles = [
  { value: "utilisateur", label: "Utilisateur", icon: UserRound, hint: "Recherchez, suivez et postulez." },
  { value: "entreprise", label: "Entreprise", icon: Building2, hint: "Gérez votre page et vos offres." },
  { value: "institution", label: "Institution", icon: Landmark, hint: "Publiez vos informations officielles." },
];

function LoginPage() {
  const [mode, setMode] = useState<"connexion" | "inscription">("connexion");

  return (
    <PageSection className="pb-20">
      <div className="grid overflow-hidden rounded-3xl border border-border bg-card lbc-card-shadow lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <img src={beninHub} alt="Le Bénin connecté par LBC" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 text-primary-foreground">
            <img src={lbcLogo} alt="Logo LBC" className="size-16 rounded-2xl object-cover" />
            <h2 className="mt-6 font-display text-3xl font-extrabold">Tout le Bénin en un clic.</h2>
            <p className="mt-3 max-w-sm text-primary-foreground/85">
              Un seul compte pour suivre les entreprises, les opportunités, les actualités et vos démarches.
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h1 className="font-display text-3xl font-extrabold text-primary">
            {mode === "connexion" ? "Connexion à LBC" : "Créer un compte LBC"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "connexion" ? "Accédez à votre espace personnel ou professionnel." : "Choisissez le type de compte qui vous correspond."}
          </p>

          <Tabs defaultValue="utilisateur" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              {profiles.map((p) => (
                <TabsTrigger key={p.value} value={p.value}>
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {profiles.map((p) => (
              <TabsContent key={p.value} value={p.value} className="mt-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-secondary">
                  <p.icon className="size-4" /> {p.hint}
                </p>

                <form
                  className="mt-6 grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success(
                      mode === "connexion"
                        ? "Démonstration : la connexion sera activée avec les comptes LBC."
                        : "Demande enregistrée : l'équipe LBC vous contactera pour activer le compte.",
                    );
                  }}
                >
                  {mode === "inscription" && (
                    <div className="grid gap-2">
                      <Label htmlFor="nom">{p.value === "utilisateur" ? "Nom complet" : "Nom de la structure"}</Label>
                      <Input id="nom" required placeholder={p.value === "utilisateur" ? "Kossi Adjovi" : "Bénin BTP Services"} />
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                      <Mail className="size-4 text-secondary" />
                      <Input id="email" type="email" required placeholder="vous@exemple.bj" className="border-0 shadow-none focus-visible:ring-0" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mdp">Mot de passe</Label>
                    <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                      <Lock className="size-4 text-secondary" />
                      <Input id="mdp" type="password" required placeholder="••••••••" className="border-0 shadow-none focus-visible:ring-0" />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="mt-2 rounded-xl">
                    {mode === "connexion" ? "Se connecter" : "Créer mon compte"}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 text-sm">
            <button
              type="button"
              className="font-bold text-secondary hover:underline"
              onClick={() => setMode(mode === "connexion" ? "inscription" : "connexion")}
            >
              {mode === "connexion" ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </button>
            <Link to="/espace-entreprise" className="font-semibold text-muted-foreground hover:text-secondary">
              Référencer ma structure
            </Link>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
