import { Link, createFileRoute } from "@tanstack/react-router";
import { BellRing, Bookmark, BriefcaseBusiness, CheckCircle2, Clock3, MapPin, Settings, UserRound } from "lucide-react";
import { toast } from "sonner";

import { CompanyCard, OpportunityCard } from "@/components/lbc/cards";
import { PageSection } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { featuredCompanies, opportunities } from "@/lib/lbc-data";

export const Route = createFileRoute("/espace-utilisateur")({
  head: () => ({ meta: [
    { title: "Mon espace — LBC" }, { name: "description", content: "Retrouvez vos favoris, candidatures et alertes LBC." },
    { property: "og:title", content: "Mon espace — LBC" }, { property: "og:description", content: "Votre activité personnelle sur LBC." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: UserSpacePage,
});

function UserSpacePage() {
  return <PageSection className="pb-20"><div className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-4"><span className="flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground"><UserRound className="size-6" /></span><div><p className="text-sm font-bold text-secondary">Espace personnel</p><h1 className="font-display text-3xl font-extrabold text-primary">Bonjour Kossi</h1></div></div><Button variant="outline" onClick={() => toast("Préférences ouvertes.")}><Settings className="size-4" /> Mes préférences</Button></div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{ icon: Bookmark,value:"8",label:"Favoris"},{icon:BriefcaseBusiness,value:"3",label:"Candidatures"},{icon:BellRing,value:"4",label:"Alertes actives"},{icon:CheckCircle2,value:"72 %",label:"Profil complété"}].map((item) => <div key={item.label} className="rounded-xl border border-border bg-card p-5 lbc-card-shadow"><item.icon className="size-5 text-secondary" /><p className="mt-4 font-display text-3xl font-extrabold text-primary">{item.value}</p><p className="text-sm text-muted-foreground">{item.label}</p></div>)}</div>
    <div className="mt-10 grid gap-8 xl:grid-cols-[1.5fr_1fr]"><section><div className="flex items-end justify-between"><div><p className="text-sm font-extrabold uppercase text-secondary">Pour vous</p><h2 className="mt-1 font-display text-2xl font-extrabold text-primary">Opportunités recommandées</h2></div><Button asChild variant="outline" size="sm"><Link to="/emplois">Tout voir</Link></Button></div><div className="mt-5 grid gap-4 md:grid-cols-2">{opportunities.slice(0,4).map((item) => <OpportunityCard key={item.id} opportunity={item} />)}</div></section><aside className="space-y-6"><div className="rounded-xl border border-border bg-card p-6"><h2 className="font-display text-xl font-extrabold text-primary">Mes candidatures</h2><div className="mt-5 space-y-4">{[["Designer UI/UX","Dossier transmis","Aujourd'hui"],["Assistant conducteur de travaux","Consultée","Il y a 2 j"],["Chargé de clientèle PME","Entretien prévu","23 sept."]].map(([title,status,date]) => <div key={title} className="border-b border-border pb-4 last:border-0 last:pb-0"><p className="font-bold text-primary">{title}</p><div className="mt-1 flex items-center justify-between text-xs"><span className="font-semibold text-secondary">{status}</span><span className="text-muted-foreground"><Clock3 className="mr-1 inline size-3" />{date}</span></div></div>)}</div></div><div className="rounded-xl bg-primary p-6 text-primary-foreground"><BellRing className="size-6 text-accent" /><h2 className="mt-4 font-display text-xl font-extrabold">Alerte génie mécanique</h2><p className="mt-2 text-sm text-primary-foreground/75"><MapPin className="mr-1 inline size-4" /> Cotonou et Abomey-Calavi</p><Button variant="accent" size="sm" className="mt-4" onClick={() => toast.success("Alerte mise à jour.")}>Modifier l'alerte</Button></div></aside></div>
    <section className="mt-12"><h2 className="font-display text-2xl font-extrabold text-primary">Entreprises enregistrées</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featuredCompanies.map((company) => <CompanyCard key={company.slug} company={company} compact />)}</div></section>
  </PageSection>;
}