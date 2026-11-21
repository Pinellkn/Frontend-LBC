import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Building2, Landmark, Lock, Mail, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import lbcLogoMark from "@/assets/lbc-logo-mark.png";
import beninHub from "@/assets/lbc-benin-digital-hub.jpg";
import { PageSection } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "@/lib/lbc-session";

export const Route = createFileRoute("/connexion")({
  validateSearch: (search: Record<string, unknown>): { mode?: "inscription" } =>
    search["mode"] === "inscription" ? { mode: "inscription" } : {},
  head: () => ({
    meta: [
      { title: "Connexion — LBC LBonCoin" },
      {
        name: "description",
        content: "Connectez-vous à votre compte LBC : utilisateur, entreprise ou institution.",
      },
      { property: "og:title", content: "Connexion — LBC LBonCoin" },
      { property: "og:description", content: "Accédez à votre espace LBC." },
    ],
  }),
  component: LoginPage,
});

const profiles = [
  {
    value: "utilisateur",
    label: "Utilisateur",
    icon: UserRound,
    hint: "Recherchez, suivez et postulez.",
  },
  {
    value: "entreprise",
    label: "Entreprise",
    icon: Building2,
    hint: "Gérez votre page et vos offres.",
  },
  {
    value: "institution",
    label: "Institution",
    icon: Landmark,
    hint: "Publiez vos informations officielles.",
  },
];

function AuthTopBar() {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <Link to="/bienvenue" className="flex items-center gap-3" aria-label="LBonCoin">
        <img src={lbcLogoMark} alt="Logo LBC" className="h-10 w-auto" />
        <span className="hidden font-display text-lg font-extrabold text-primary sm:inline">
          LBonCoin
        </span>
      </Link>
      <Link
        to="/bienvenue"
        className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-secondary"
      >
        <ArrowLeft className="size-4" /> Retour
      </Link>
    </div>
  );
}

function LoginPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"connexion" | "inscription">(search.mode ?? "connexion");

  const handleSubmit = (event: FormEvent<HTMLFormElement>, profile: string) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const typedName = String(data.get("nom") ?? "").trim();
    const fromEmail =
      email
        .split("@")[0]
        ?.replace(/[._-]+/g, " ")
        .trim() ?? "";
    const rawName = typedName || fromEmail || "Visiteur";
    const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    signIn({ name, email, profile });
    toast.success(
      mode === "connexion"
        ? `Bon retour, ${name.split(" ")[0]} !`
        : `Bienvenue sur LBonCoin, ${name.split(" ")[0]} !`,
    );
    navigate({ to: "/" });
  };

  return (
    <div className="lbc-shell min-h-screen">
      <PageSection className="pb-20 pt-6">
        <AuthTopBar />
        <div className="grid overflow-hidden rounded-3xl border border-border bg-card lbc-card-shadow lg:grid-cols-2">
          <div className="relative hidden lg:block">
            <img
              src={beninHub}
              alt="Le Bénin connecté par LBC"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/70" />
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-primary-foreground">
              <span className="flex w-fit rounded-2xl bg-white px-4 py-3 shadow-lg">
                <img src={lbcLogoMark} alt="Logo LBC" className="h-12 w-auto" />
              </span>
              <h2 className="mt-6 font-display text-3xl font-extrabold">
                Tout le Bénin en un clic.
              </h2>
              <p className="mt-3 max-w-sm text-primary-foreground/85">
                Un seul compte pour suivre les entreprises, les opportunités, les actualités et vos
                démarches.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="font-display text-3xl font-extrabold text-primary">
              {mode === "connexion" ? "Connexion à LBC" : "Créer un compte LBC"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "connexion"
                ? "Accédez à votre espace personnel ou professionnel."
                : "Choisissez le type de compte qui vous correspond."}
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

                  <form className="mt-6 grid gap-4" onSubmit={(e) => handleSubmit(e, p.value)}>
                    {mode === "inscription" && (
                      <div className="grid gap-2">
                        <Label htmlFor="nom">
                          {p.value === "utilisateur" ? "Nom complet" : "Nom de la structure"}
                        </Label>
                        <Input
                          id="nom"
                          name="nom"
                          required
                          placeholder={
                            p.value === "utilisateur" ? "Kossi Adjovi" : "Bénin BTP Services"
                          }
                        />
                      </div>
                    )}
                    <div className="grid gap-2">
                      <Label htmlFor="email">Adresse e-mail</Label>
                      <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                        <Mail className="size-4 text-secondary" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="vous@exemple.bj"
                          className="border-0 shadow-none focus-visible:ring-0"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="mdp">Mot de passe</Label>
                      <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                        <Lock className="size-4 text-secondary" />
                        <Input
                          id="mdp"
                          type="password"
                          required
                          placeholder="••••••••"
                          className="border-0 shadow-none focus-visible:ring-0"
                        />
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
                {mode === "connexion"
                  ? "Pas encore de compte ? S'inscrire"
                  : "Déjà un compte ? Se connecter"}
              </button>
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
