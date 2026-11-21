import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  Home,
  LogOut,
  Menu,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import lbcLogoMark from "@/assets/lbc-logo-mark.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { can, referencerLabel, roleOf } from "@/lib/lbc-roles";
import { signOut, useSession } from "@/lib/lbc-session";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Entreprises", href: "/entreprises" },
  { label: "Emplois & stages", href: "/emplois" },
  { label: "Actualités", href: "/actualites" },
  { label: "Infos pratiques", href: "/infos-pratiques" },
  { label: "Assistant IA", href: "/assistant" },
] as const;

const bottomItems = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Recherche", href: "/entreprises", icon: Search },
  { label: "Emplois", href: "/emplois", icon: BriefcaseBusiness },
  { label: "Assistant", href: "/assistant", icon: Sparkles },
  { label: "Mon espace", href: "/espace-utilisateur", icon: UserRound },
] as const;

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

export function AppShell({ children }: { children: ReactNode }) {
  const currentPath = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const { ready, session } = useSession();
  const [open, setOpen] = useState(false);
  const isAdmin = currentPath.startsWith("/admin");
  // Pages "plein écran" : sans barre de navigation ni pied de page.
  const isBare = isAdmin || currentPath === "/bienvenue" || currentPath === "/connexion";
  const loggedIn = ready && !!session;
  const role = roleOf(session);

  // Outils réservés aux entreprises et institutions : chaque acteur ne voit que les siens.
  const structureLinks: {
    to: "/espace-entreprise" | "/tableau-structure" | "/publier-offre" | "/publier-actualite";
    label: string;
  }[] = [];
  if (can(role, "referencerStructure"))
    structureLinks.push({ to: "/espace-entreprise", label: referencerLabel(role) });
  if (can(role, "tableauStructure"))
    structureLinks.push({ to: "/tableau-structure", label: "Tableau de ma structure" });
  if (can(role, "publierOffre"))
    structureLinks.push({
      to: "/publier-offre",
      label: role === "institution" ? "Publier un appel à candidatures" : "Publier une offre",
    });
  if (can(role, "publierActualite"))
    structureLinks.push({ to: "/publier-actualite", label: "Publier une actualité" });

  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath === href || currentPath.startsWith(`${href}/`);

  const handleSignOut = () => {
    setOpen(false);
    signOut();
    navigate({ to: "/bienvenue", replace: true });
  };

  if (isBare) return <>{children}</>;

  return (
    <div className={cn("min-h-screen lbc-shell text-foreground", loggedIn && "pb-16 lg:pb-0")}>
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="LBonCoin — Accueil">
            <img src={lbcLogoMark} alt="Logo LBC" className="h-10 w-auto shrink-0" />
            <div className="hidden min-w-0 border-l border-border pl-3 sm:block">
              <p className="font-display text-lg font-extrabold leading-none text-primary">
                LBonCoin
              </p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">
                Tout le Bénin en un clic
              </p>
            </div>
          </Link>

          <nav
            className="hidden flex-1 items-center justify-center gap-1 lg:flex"
            aria-label="Navigation principale"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isActive(item.href) &&
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {ready && session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 text-sm font-bold text-primary transition-colors hover:border-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Menu de mon espace"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                      {initialsOf(session.name)}
                    </span>
                    <span className="hidden max-w-[8rem] truncate sm:inline">
                      {session.name.split(" ")[0]}
                    </span>
                    <ChevronDown className="size-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="font-normal">
                    <p className="truncate text-sm font-extrabold text-primary">{session.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{session.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/espace-utilisateur" className="cursor-pointer">
                      <UserRound className="size-4" /> Mon espace
                    </Link>
                  </DropdownMenuItem>
                  {structureLinks.length > 0 && <DropdownMenuSeparator />}
                  {structureLinks.map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link to={item.to} className="cursor-pointer">
                        <ArrowRight className="size-4" /> {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={handleSignOut}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="size-4" /> Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : ready ? (
              <>
                <Button asChild variant="ghost" className="hidden md:inline-flex">
                  <Link to="/connexion">Connexion</Link>
                </Button>
                <Button asChild variant="accent" className="hidden sm:inline-flex">
                  <Link to="/connexion" search={{ mode: "inscription" }}>
                    Créer un compte
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </>
            ) : null}

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="lg:hidden"
                  aria-label="Ouvrir le menu"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetTitle className="flex items-center gap-3">
                  <img src={lbcLogoMark} alt="Logo LBC" className="h-9 w-auto" />
                  <span className="font-display text-primary">LBonCoin</span>
                </SheetTitle>
                <nav className="mt-8 grid gap-1" aria-label="Navigation mobile">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground",
                        isActive(item.href) && "bg-primary text-primary-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {loggedIn && (
                    <Link
                      to="/espace-utilisateur"
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground",
                        isActive("/espace-utilisateur") && "bg-primary text-primary-foreground",
                      )}
                    >
                      Mon espace
                    </Link>
                  )}
                  {structureLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 grid gap-2">
                  {loggedIn ? (
                    <Button variant="outline" onClick={handleSignOut}>
                      <LogOut className="size-4" /> Se déconnecter
                    </Button>
                  ) : (
                    <Button asChild variant="outline">
                      <Link to="/connexion" onClick={() => setOpen(false)}>
                        Connexion
                      </Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <Link
        to="/assistant"
        className={cn(
          "fixed bottom-5 right-5 z-40 items-center gap-2 rounded-full bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground shadow-xl transition-transform hover:scale-105",
          loggedIn ? "hidden lg:inline-flex" : "inline-flex",
        )}
        aria-label="Ouvrir l'assistant IA LBC"
      >
        <Sparkles className="size-4" /> Assistant IA
      </Link>

      {loggedIn && (
        <nav
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          aria-label="Navigation de l'application"
        >
          <ul className="mx-auto grid max-w-lg grid-cols-5">
            {bottomItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex flex-col items-center gap-1 px-1 py-2 text-[11px] font-bold transition-colors",
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-12 items-center justify-center rounded-full transition-colors",
                        active && "bg-secondary/15 text-secondary",
                      )}
                    >
                      <item.icon className="size-5" />
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <footer className="border-t border-border/80 bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex rounded-xl bg-white px-3 py-2 shadow-sm">
                <img src={lbcLogoMark} alt="Logo LBC" className="h-9 w-auto" />
              </span>
              <div>
                <p className="font-display text-xl font-extrabold">LBonCoin</p>
                <p className="text-sm text-primary-foreground/80">Tout le Bénin en un clic</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-primary-foreground/80">
              Le carrefour numérique qui rassemble et organise les entreprises, les emplois, les
              actualités et les informations pratiques du Bénin.
            </p>
          </div>
          <FooterColumn
            title="Plateforme"
            links={[
              ["/entreprises", "Annuaire entreprises"],
              ["/emplois", "Emplois & stages"],
              ["/actualites", "Actualités"],
              ["/infos-pratiques", "Infos pratiques"],
            ]}
          />
          <FooterColumn
            title={structureLinks.length > 0 ? "Ma structure" : "Mon compte"}
            links={[
              ...structureLinks.map((item): [string, string] => [item.to, item.label]),
              loggedIn ? ["/espace-utilisateur", "Mon espace"] : ["/connexion", "Connexion"],
              ["/assistant", "Assistant IA LBC"],
            ]}
          />
          <div>
            <p className="text-sm font-bold uppercase text-primary-foreground/70">Contact</p>
            <div className="mt-4 grid gap-2 text-sm text-primary-foreground/85">
              <span>Cotonou, Bénin</span>
              <span>contact@lbc.bj</span>
              <span>+229 01 00 00 00 00</span>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-primary-foreground/60 sm:px-6 lg:px-8">
            <span>© 2026 LBonCoin. Tous droits réservés.</span>
            <span>Contribuer à la digitalisation de l'économie béninoise.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-sm font-bold uppercase text-primary-foreground/70">{title}</p>
      <div className="mt-4 grid gap-2 text-sm text-primary-foreground/85">
        {links.map(([href, label]) => (
          <Link key={href} to={href} className="hover:text-accent">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
