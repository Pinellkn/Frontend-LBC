import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";

import lbcLogo from "@/assets/lbc-logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Entreprises", href: "/entreprises" },
  { label: "Emplois & stages", href: "/emplois" },
  { label: "Actualités", href: "/actualites" },
  { label: "Infos pratiques", href: "/infos-pratiques" },
  { label: "Assistant IA", href: "/assistant" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const currentPath = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const isAdmin = currentPath.startsWith("/admin");

  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath === href || currentPath.startsWith(`${href}/`);

  if (isAdmin) return <>{children}</>;

  return (
    <div className="min-h-screen lbc-shell text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src={lbcLogo} alt="Logo LBC LBonCoin" className="h-11 w-11 rounded-xl object-cover shadow-md" />
            <div className="min-w-0">
              <p className="font-display text-lg font-extrabold leading-none text-primary">LBC</p>
              <p className="hidden text-xs font-semibold text-muted-foreground sm:block">Tout le Bénin en un clic</p>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isActive(item.href) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link to="/connexion">Connexion</Link>
            </Button>
            <Button asChild variant="accent" className="hidden sm:inline-flex">
              <Link to="/espace-entreprise">
                Référencer ma structure
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon-sm" className="lg:hidden" aria-label="Ouvrir le menu">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetTitle className="flex items-center gap-3">
                  <img src={lbcLogo} alt="" className="h-10 w-10 rounded-lg" />
                  <span className="font-display text-primary">LBC LBonCoin</span>
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
                  <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted">
                    Back-office
                  </Link>
                </nav>
                <div className="mt-8 grid gap-2">
                  <Button asChild variant="accent">
                    <Link to="/espace-entreprise" onClick={() => setOpen(false)}>
                      Référencer ma structure
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/connexion" onClick={() => setOpen(false)}>
                      Connexion
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <Link
        to="/assistant"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground shadow-xl transition-transform hover:scale-105"
        aria-label="Ouvrir l'assistant IA LBC"
      >
        <Sparkles className="size-4" /> Assistant IA
      </Link>

      <footer className="border-t border-border/80 bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <img src={lbcLogo} alt="Logo LBC" className="h-12 w-12 rounded-xl object-cover" />
              <div>
                <p className="font-display text-xl font-extrabold">LBC LBonCoin</p>
                <p className="text-sm text-primary-foreground/80">Tout le Bénin en un clic</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-primary-foreground/80">
              Le carrefour numérique qui rassemble et organise les entreprises, les emplois, les actualités et les informations pratiques du Bénin.
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
            title="Structures"
            links={[
              ["/espace-entreprise", "Référencer ma structure"],
              ["/connexion", "Connexion"],
              ["/assistant", "Assistant IA LBC"],
              ["/admin", "Back-office"],
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
            <span>© 2026 LBC LBonCoin. Tous droits réservés.</span>
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
