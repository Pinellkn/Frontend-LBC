import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  Heart,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  MousePointerClick,
  Newspaper,
  Pencil,
  Phone,
  Settings,
  Building2,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";

import { CompanyCard, OpportunityCard } from "@/components/lbc/cards";
import { PageSection } from "@/components/lbc/page-tools";
import {
  VerificationBadge,
  VerificationLegend,
  verificationLevelOf,
} from "@/components/lbc/verification-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { featuredCompanies, opportunities } from "@/lib/lbc-data";
import { can, isStructure, referencerLabel, roleOf, type LbcRole } from "@/lib/lbc-roles";
import { signOut, updateSession, useSession, type LbcSession } from "@/lib/lbc-session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/espace-utilisateur")({
  head: () => ({
    meta: [
      { title: "Mon espace — LBonCoin" },
      {
        name: "description",
        content:
          "Votre profil, vos candidatures, vos éléments sauvegardés et vos paramètres sur LBonCoin.",
      },
      { property: "og:title", content: "Mon espace — LBonCoin" },
      { property: "og:description", content: "Votre activité personnelle sur LBonCoin." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: UserSpacePage,
});

type Section = "dashboard" | "profil" | "candidatures" | "sauvegardes" | "structure" | "parametres";

const accountLabels: Record<string, string> = {
  utilisateur: "Compte utilisateur",
  entreprise: "Compte entreprise",
  institution: "Compte institution",
};

const applications = [
  {
    title: "Responsable Marketing",
    company: "ECOBANK Bénin",
    status: "En cours",
    date: "Il y a 2 jours",
    tone: "warning",
  },
  {
    title: "Analyste financier",
    company: "Ministère de l'Économie",
    status: "Entretien",
    date: "Il y a 1 semaine",
    tone: "success",
  },
  {
    title: "Assistant conducteur de travaux",
    company: "Bénin BTP Services",
    status: "Dossier transmis",
    date: "Il y a 2 semaines",
    tone: "neutral",
  },
] as const;

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

function UserSpacePage() {
  const navigate = useNavigate();
  const { ready, session } = useSession();

  useEffect(() => {
    if (ready && !session) navigate({ to: "/connexion", replace: true });
  }, [ready, session, navigate]);

  if (!ready || !session) return <div className="min-h-[70vh]" aria-hidden="true" />;
  return <UserSpace session={session} />;
}

function StatusPill({
  tone,
  children,
}: {
  tone: "warning" | "success" | "neutral";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold",
        tone === "warning" && "bg-accent/20 text-accent-foreground",
        tone === "success" && "bg-emerald-100 text-emerald-800",
        tone === "neutral" && "bg-muted text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

function UserSpace({ session }: { session: LbcSession }) {
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("dashboard");
  const [editing, setEditing] = useState(false);
  const role = roleOf(session);
  const structure = isStructure(role);
  const firstName = session.name.split(" ")[0] ?? session.name;
  const memberSince = session.joinedAt
    ? new Date(session.joinedAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
    : null;

  const handleSignOut = () => {
    signOut();
    navigate({ to: "/bienvenue", replace: true });
  };

  const goTo = (next: Section, edit = false) => {
    setSection(next);
    setEditing(edit);
  };

  // Chaque acteur voit son propre menu : un utilisateur n'a pas les outils d'une structure, et inversement.
  const menu: { id: Section; label: string; icon: LucideIcon; badge?: string }[] = [
    { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "profil", label: "Mon profil", icon: UserRound },
  ];
  if (can(role, "candidatures")) {
    menu.push(
      {
        id: "candidatures",
        label: "Candidatures",
        icon: BriefcaseBusiness,
        badge: String(applications.length),
      },
      { id: "sauvegardes", label: "Éléments sauvegardés", icon: Heart },
    );
  }
  if (structure) {
    menu.push({ id: "structure", label: "Ma structure", icon: Building2 });
  }
  menu.push({ id: "parametres", label: "Paramètres", icon: Settings });

  return (
    <PageSection className="pb-20 pt-8">
      <div className="grid gap-8 lg:grid-cols-[20rem_1fr]">
        <aside className="grid content-start gap-6">
          <div className="rounded-3xl border border-border bg-card p-6 text-center lbc-card-shadow">
            <span className="mx-auto flex size-24 items-center justify-center rounded-full bg-primary text-3xl font-extrabold text-primary-foreground ring-4 ring-secondary/20">
              {initialsOf(session.name)}
            </span>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-primary">
              {session.name}
            </h1>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">
              {session.jobTitle || accountLabels[session.profile] || "Compte utilisateur"}
            </p>
            {session.city && (
              <p className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-4 text-secondary" /> {session.city}, Bénin
              </p>
            )}
            <Button
              className="mt-5 w-full rounded-xl"
              size="lg"
              onClick={() => goTo("profil", true)}
            >
              <Pencil className="size-4" /> Éditer le profil
            </Button>
          </div>

          <nav
            className="rounded-3xl border border-border bg-card p-3 lbc-card-shadow"
            aria-label="Mon espace"
          >
            {menu.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                aria-current={section === item.id ? "page" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  section === item.id && "bg-secondary/10 text-primary hover:bg-secondary/10",
                )}
              >
                <item.icon className="size-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-extrabold text-primary">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            <div className="my-2 border-t border-border" />
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="size-5" /> Déconnexion
            </button>
          </nav>
        </aside>

        <div className="min-w-0">
          {section === "dashboard" &&
            (structure ? (
              <StructureOverview
                role={role}
                firstName={firstName}
                onSeeStructure={() => goTo("structure")}
                onSeeProfile={() => goTo("profil")}
              />
            ) : (
              <Dashboard
                firstName={firstName}
                onSeeApplications={() => goTo("candidatures")}
                onSeeProfile={() => goTo("profil")}
              />
            ))}
          {section === "structure" && structure && (
            <StructureVerification session={session} role={role} />
          )}
          {section === "profil" && (
            <ProfileDetails
              session={session}
              memberSince={memberSince}
              editing={editing}
              onEdit={() => setEditing(true)}
              onDone={() => setEditing(false)}
            />
          )}
          {section === "candidatures" && can(role, "candidatures") && <Applications />}
          {section === "sauvegardes" && can(role, "candidatures") && <Saved />}
          {section === "parametres" && <Preferences session={session} onSignOut={handleSignOut} />}
        </div>
      </div>
    </PageSection>
  );
}

type StructureTool = {
  to: "/espace-entreprise" | "/tableau-structure" | "/publier-offre" | "/publier-actualite";
  label: string;
  hint: string;
};

function structureTools(role: LbcRole | null): StructureTool[] {
  const tools: StructureTool[] = [];
  if (can(role, "referencerStructure"))
    tools.push({
      to: "/espace-entreprise",
      label: referencerLabel(role),
      hint: "Créez ou mettez à jour la page publique de votre structure.",
    });
  if (can(role, "tableauStructure"))
    tools.push({
      to: "/tableau-structure",
      label: "Tableau de ma structure",
      hint: "Statistiques de visite et aperçu de votre fiche.",
    });
  if (can(role, "publierOffre"))
    tools.push({
      to: "/publier-offre",
      label: role === "institution" ? "Publier un appel à candidatures" : "Publier une offre",
      hint:
        role === "institution"
          ? "Recrutements, concours et appels à projets."
          : "Emplois, stages et alternances.",
    });
  if (can(role, "publierActualite"))
    tools.push({
      to: "/publier-actualite",
      label:
        role === "institution" ? "Publier une information officielle" : "Publier une actualité",
      hint: "Annonces et nouveautés diffusées dans le fil LBC.",
    });
  return tools;
}

function StructureOverview({
  role,
  firstName,
  onSeeStructure,
  onSeeProfile,
}: {
  role: LbcRole | null;
  firstName: string;
  onSeeStructure: () => void;
  onSeeProfile: () => void;
}) {
  const stats = [
    { icon: Eye, value: "4 280", label: "Vues de votre page" },
    { icon: MousePointerClick, value: "618", label: "Clics sur vos contacts" },
    {
      icon: FileText,
      value: "4",
      label: role === "institution" ? "Appels à candidatures actifs" : "Offres actives",
    },
    { icon: Newspaper, value: "7", label: "Publications" },
  ];
  const tools = structureTools(role);

  return (
    <div className="grid gap-8">
      <div>
        <p className="text-sm font-extrabold uppercase text-secondary">
          {role === "institution" ? "Espace institution" : "Espace entreprise"}
        </p>
        <h2 className="mt-1 font-display text-3xl font-extrabold text-primary">
          Bonjour, {firstName}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pilotez la visibilité et les publications de votre structure.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border bg-card p-5 lbc-card-shadow"
          >
            <item.icon className="size-5 text-secondary" />
            <p className="mt-4 font-display text-3xl font-extrabold text-primary">{item.value}</p>
            <p className="text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-display text-xl font-extrabold text-primary">Mes outils</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 lbc-card-shadow transition-all hover:-translate-y-0.5 hover:border-secondary/40"
            >
              <div>
                <p className="font-bold text-primary group-hover:text-secondary">{tool.label}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{tool.hint}</p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-secondary" />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-primary p-6 text-primary-foreground">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-extrabold">
            <CheckCircle2 className="size-5 text-accent" /> Badge de vérification
          </p>
          <p className="mt-1 text-sm text-primary-foreground/80">
            Trois niveaux, trois couleurs : découvrez celui de votre structure.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="accent" onClick={onSeeStructure}>
            Voir mon niveau <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="bg-transparent text-primary-foreground"
            onClick={onSeeProfile}
          >
            Mon profil
          </Button>
        </div>
      </div>
    </div>
  );
}

function StructureVerification({ session, role }: { session: LbcSession; role: LbcRole | null }) {
  const level = verificationLevelOf(session.email);
  return (
    <div className="rounded-3xl border border-border bg-card p-6 lbc-card-shadow md:p-8">
      <p className="text-sm font-extrabold uppercase text-secondary">
        {role === "institution" ? "Mon institution" : "Mon entreprise"}
      </p>
      <h2 className="mt-1 font-display text-3xl font-extrabold text-primary">
        Badge de vérification
      </h2>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-muted-foreground">
          Niveau actuel de {session.name} :
        </span>
        <VerificationBadge level={level} showLevel />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Le niveau est attribué par l'équipe LBC après le contrôle de vos justificatifs. Il s'affiche
        sur votre page et sur vos publications.
      </p>
      <div className="mt-6">
        <VerificationLegend current={level} />
      </div>
      <Button asChild variant="accent" className="mt-6">
        <Link to="/espace-entreprise">
          {referencerLabel(role)} <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}

function Dashboard({
  firstName,
  onSeeApplications,
  onSeeProfile,
}: {
  firstName: string;
  onSeeApplications: () => void;
  onSeeProfile: () => void;
}) {
  const stats = [
    {
      icon: BriefcaseBusiness,
      value: "12",
      label: "Offres sauvegardées",
      hint: "Gérez vos offres d'emploi",
    },
    { icon: Building2, value: "5", label: "Entreprises suivies", hint: "Mises à jour du réseau" },
    { icon: Newspaper, value: "8", label: "Articles sauvegardés", hint: "Veille professionnelle" },
  ];

  return (
    <div className="grid gap-8">
      <div>
        <p className="text-sm font-extrabold uppercase text-secondary">Mon espace</p>
        <h2 className="mt-1 font-display text-3xl font-extrabold text-primary">
          Bonjour, {firstName}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Voici un aperçu de votre activité sur LBonCoin.
        </p>
      </div>

      <div>
        <h3 className="font-display text-xl font-extrabold text-primary">Vue d'ensemble</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-card p-5 lbc-card-shadow"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <item.icon className="size-5" />
                </span>
                <span className="font-display text-3xl font-extrabold text-primary">
                  {item.value}
                </span>
              </div>
              <p className="mt-4 font-bold text-primary">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card lbc-card-shadow">
        <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
          <h3 className="font-display text-xl font-extrabold text-primary">
            Candidatures récentes
          </h3>
          <button
            type="button"
            onClick={onSeeApplications}
            className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:underline"
          >
            Voir tout <ChevronRight className="size-4" />
          </button>
        </div>
        <ul className="divide-y divide-border">
          {applications.slice(0, 2).map((a) => (
            <li
              key={a.title}
              className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
            >
              <div className="min-w-0">
                <p className="font-bold text-primary">{a.title}</p>
                <p className="text-xs text-muted-foreground">
                  {a.company} · Envoyé {a.date.toLowerCase()}
                </p>
              </div>
              <StatusPill tone={a.tone}>{a.status}</StatusPill>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-primary p-6 text-primary-foreground">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-extrabold">
            <CheckCircle2 className="size-5 text-accent" /> Complétez votre profil
          </p>
          <p className="mt-1 text-sm text-primary-foreground/80">
            Ajoutez votre téléphone, votre ville et votre fonction pour de meilleures
            recommandations.
          </p>
        </div>
        <Button variant="accent" onClick={onSeeProfile}>
          Voir mon profil <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase text-muted-foreground">{label}</p>
        <p
          className={cn(
            "break-words font-semibold",
            value ? "text-primary" : "text-muted-foreground/70",
          )}
        >
          {value || "Non renseigné"}
        </p>
      </div>
    </div>
  );
}

function ProfileDetails({
  session,
  memberSince,
  editing,
  onEdit,
  onDone,
}: {
  session: LbcSession;
  memberSince: string | null;
  editing: boolean;
  onEdit: () => void;
  onDone: () => void;
}) {
  const [form, setForm] = useState({
    name: session.name,
    jobTitle: session.jobTitle ?? "",
    phone: session.phone ?? "",
    city: session.city ?? "",
    bio: session.bio ?? "",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateSession({
      name: form.name.trim() || session.name,
      jobTitle: form.jobTitle.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      bio: form.bio.trim(),
    });
    toast.success("Votre profil a été mis à jour.");
    onDone();
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 lbc-card-shadow md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-extrabold uppercase text-secondary">
            {accountLabels[session.profile] ?? "Compte utilisateur"}
          </p>
          <h2 className="mt-1 font-display text-3xl font-extrabold text-primary">Mon profil</h2>
        </div>
        {!editing && (
          <Button variant="outline" onClick={onEdit}>
            <Pencil className="size-4" /> Modifier
          </Button>
        )}
      </div>

      {editing ? (
        <form onSubmit={onSubmit} className="mt-6 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="p-name">Nom complet</Label>
              <Input
                id="p-name"
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="p-job">Fonction / titre</Label>
              <Input
                id="p-job"
                value={form.jobTitle}
                onChange={(e) => set("jobTitle")(e.target.value)}
                placeholder="Ex. Directeur commercial"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="p-phone">Téléphone</Label>
              <Input
                id="p-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone")(e.target.value)}
                placeholder="+229 01 00 00 00 00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="p-city">Ville</Label>
              <Input
                id="p-city"
                value={form.city}
                onChange={(e) => set("city")(e.target.value)}
                placeholder="Cotonou"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="p-email">Adresse e-mail</Label>
            <Input id="p-email" value={session.email} disabled />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="p-bio">À propos de moi</Label>
            <textarea
              id="p-bio"
              value={form.bio}
              onChange={(e) => set("bio")(e.target.value)}
              rows={4}
              placeholder="Parlez en quelques mots de votre parcours ou de votre activité."
              className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="accent" size="lg" className="rounded-xl">
              Enregistrer
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-xl"
              onClick={onDone}
            >
              Annuler
            </Button>
          </div>
        </form>
      ) : (
        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow icon={UserRound} label="Nom complet" value={session.name} />
            <InfoRow
              icon={BriefcaseBusiness}
              label="Fonction / titre"
              value={session.jobTitle ?? null}
            />
            <InfoRow icon={Mail} label="Adresse e-mail" value={session.email} />
            <InfoRow icon={Phone} label="Téléphone" value={session.phone ?? null} />
            <InfoRow
              icon={MapPin}
              label="Ville"
              value={session.city ? `${session.city}, Bénin` : null}
            />
            <InfoRow icon={CalendarDays} label="Membre depuis" value={memberSince} />
          </div>
          <div className="rounded-xl border border-border bg-background/60 p-4">
            <p className="text-xs font-bold uppercase text-muted-foreground">À propos de moi</p>
            <p
              className={cn(
                "mt-1 whitespace-pre-line font-medium",
                session.bio ? "text-foreground" : "text-muted-foreground/70",
              )}
            >
              {session.bio || "Non renseigné"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Applications() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 lbc-card-shadow md:p-8">
      <p className="text-sm font-extrabold uppercase text-secondary">Suivi</p>
      <h2 className="mt-1 font-display text-3xl font-extrabold text-primary">Mes candidatures</h2>
      <ul className="mt-6 divide-y divide-border">
        {applications.map((a) => (
          <li key={a.title} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="min-w-0">
              <p className="font-bold text-primary">{a.title}</p>
              <p className="text-sm text-muted-foreground">{a.company}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock3 className="size-3" /> Envoyé {a.date.toLowerCase()}
              </p>
            </div>
            <StatusPill tone={a.tone}>{a.status}</StatusPill>
          </li>
        ))}
      </ul>
      <Button asChild variant="accent" className="mt-4">
        <Link to="/emplois">
          Chercher d'autres offres <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}

function Saved() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="text-sm font-extrabold uppercase text-secondary">Favoris</p>
        <h2 className="mt-1 font-display text-3xl font-extrabold text-primary">
          Éléments sauvegardés
        </h2>
      </div>
      <section>
        <h3 className="font-display text-xl font-extrabold text-primary">Offres sauvegardées</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {opportunities.slice(0, 2).map((item) => (
            <OpportunityCard key={item.id} opportunity={item} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="font-display text-xl font-extrabold text-primary">Entreprises suivies</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredCompanies.slice(0, 3).map((company) => (
            <CompanyCard key={company.slug} company={company} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

function Preferences({ session, onSignOut }: { session: LbcSession; onSignOut: () => void }) {
  const options = [
    {
      id: "alertes",
      label: "Alertes emploi par e-mail",
      hint: "Recevez les nouvelles offres qui vous correspondent.",
    },
    {
      id: "actus",
      label: "Actualités économiques",
      hint: "Un résumé des informations importantes du Bénin.",
    },
    {
      id: "entreprises",
      label: "Mises à jour des entreprises suivies",
      hint: "Soyez prévenu quand une entreprise publie.",
    },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card p-6 lbc-card-shadow md:p-8">
      <p className="text-sm font-extrabold uppercase text-secondary">Compte</p>
      <h2 className="mt-1 font-display text-3xl font-extrabold text-primary">Paramètres</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {accountLabels[session.profile] ?? "Compte utilisateur"} · {session.email}
      </p>

      <ul className="mt-6 grid gap-3">
        {options.map((option) => (
          <li key={option.id}>
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-background/60 p-4">
              <span>
                <span className="flex items-center gap-2 font-bold text-primary">
                  <BellRing className="size-4 text-secondary" /> {option.label}
                </span>
                <span className="text-xs text-muted-foreground">{option.hint}</span>
              </span>
              <input type="checkbox" defaultChecked className="size-5 accent-[var(--secondary)]" />
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-border pt-6">
        <Button
          variant="outline"
          className="border-destructive/40 text-destructive hover:bg-destructive/10"
          onClick={onSignOut}
        >
          <LogOut className="size-4" /> Se déconnecter
        </Button>
      </div>
    </div>
  );
}
