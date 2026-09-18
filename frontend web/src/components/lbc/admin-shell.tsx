import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronLeft, LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";

import lbcLogo from "@/assets/lbc-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { adminNav } from "@/lib/lbc-data";
import { cn } from "@/lib/utils";

export function AdminShell() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const current = adminNav.find((item) => pathname === (item.slug ? `/admin/${item.slug}` : "/admin")) ?? adminNav[0];
  if (!current) return null;

  const navigation = <nav className="grid gap-1" aria-label="Navigation du back-office">
    {adminNav.map((item) => {
      const href = item.slug ? `/admin/${item.slug}` : "/admin";
      const active = pathname === href;
      const className = cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors", active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground");
      return item.slug ? <Link key={item.slug} to="/admin/$section" params={{ section: item.slug }} onClick={() => setOpen(false)} className={className}><item.icon className="size-4" /> {item.label}</Link> : <Link key="dashboard" to="/admin" onClick={() => setOpen(false)} className={className}><item.icon className="size-4" /> {item.label}</Link>;
    })}
  </nav>;

  return <div className="min-h-screen bg-background text-foreground">
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-sidebar-border bg-sidebar p-5 lg:block">
      <Link to="/admin" className="flex items-center gap-3 border-b border-sidebar-border pb-5">
        <img src={lbcLogo} alt="LBC" className="size-11 rounded-lg object-cover" />
        <div><p className="font-display text-lg font-extrabold text-sidebar-foreground">LBC Admin</p><p className="text-xs text-sidebar-foreground/60">Centre de contrôle</p></div>
      </Link>
      <div className="mt-5 h-[calc(100vh-9rem)] overflow-y-auto pr-1">{navigation}</div>
      <Button asChild variant="ghost" className="absolute bottom-4 left-5 right-5 justify-start text-sidebar-foreground hover:bg-sidebar-accent">
        <Link to="/"><ChevronLeft className="size-4" /> Retour au site</Link>
      </Button>
    </aside>
    <div className="lg:pl-72">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-xl md:px-7">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><Button size="icon" variant="outline" className="lg:hidden" aria-label="Menu"><Menu className="size-4" /></Button></SheetTrigger>
          <SheetContent side="left" className="w-80 bg-sidebar text-sidebar-foreground"><SheetTitle className="mb-6 text-sidebar-foreground">LBC Administration</SheetTitle>{navigation}</SheetContent>
        </Sheet>
        <div className="min-w-0"><h1 className="truncate font-display text-lg font-extrabold text-primary">{current.label}</h1><p className="hidden text-xs text-muted-foreground sm:block">{current.description}</p></div>
        <div className="ml-auto hidden w-64 items-center gap-2 rounded-lg border border-input bg-card px-3 md:flex"><Search className="size-4 text-muted-foreground" /><Input aria-label="Rechercher dans l'administration" placeholder="Rechercher…" className="border-0 bg-transparent shadow-none focus-visible:ring-0" /></div>
        <Button size="icon" variant="outline" aria-label="Notifications"><Bell className="size-4" /></Button>
        <div className="hidden items-center gap-2 sm:flex"><span className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">PL</span><div className="text-xs"><p className="font-bold">Pinel Lokonon</p><p className="text-muted-foreground">Super admin</p></div></div>
        <Button size="icon" variant="ghost" aria-label="Déconnexion"><LogOut className="size-4" /></Button>
      </header>
      <main className="p-4 md:p-7"><Outlet /></main>
    </div>
  </div>;
}