import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BadgeCheck, Building2, CalendarDays, Clock3, ExternalLink, GraduationCap, MapPin, Star } from "lucide-react";

import { StatusBadge } from "@/components/lbc/page-tools";
import type { Company, NewsItem, Opportunity, PracticalInfo } from "@/lib/lbc-data";
import { cn } from "@/lib/utils";

export function CompanyCard({ company, compact = false }: { company: Company; compact?: boolean }) {
  return (
    <Link
      to="/entreprises/$slug"
      params={{ slug: company.slug }}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 lbc-card-shadow transition-all hover:-translate-y-0.5 hover:border-secondary/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display text-lg font-extrabold">
          {company.name.slice(0, 1)}
        </div>
        {company.status === "Vérifiée" ? (
          <StatusBadge tone="success">
            <BadgeCheck className="mr-1 size-3.5" /> Vérifiée
          </StatusBadge>
        ) : (
          <StatusBadge tone="neutral">À vérifier</StatusBadge>
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-primary group-hover:text-secondary">{company.name}</h3>
      <p className="mt-1 text-sm font-semibold text-secondary">{company.sector}</p>
      {!compact && <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{company.description}</p>}
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3.5" /> {company.commune}
        </span>
        <span className="inline-flex items-center gap-1">
          <Star className="size-3.5 fill-accent text-accent" /> {company.rating} ({company.reviews})
        </span>
      </div>
    </Link>
  );
}

const typeTone: Record<Opportunity["type"], "primary" | "success" | "warning" | "neutral"> = {
  Emploi: "primary",
  Stage: "success",
  Alternance: "warning",
  Recrutement: "primary",
  "Appel à candidatures": "neutral",
};

export function OpportunityCard({ opportunity, className }: { opportunity: Opportunity; className?: string }) {
  return (
    <Link
      to="/emplois/$id"
      params={{ id: opportunity.id }}
      className={cn(
        "group flex h-full flex-col rounded-xl border border-border bg-card p-5 lbc-card-shadow transition-all hover:-translate-y-0.5 hover:border-secondary/40",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <StatusBadge tone={typeTone[opportunity.type]}>{opportunity.type}</StatusBadge>
        <span className="text-xs font-semibold text-muted-foreground">{opportunity.posted}</span>
      </div>
      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-primary group-hover:text-secondary">{opportunity.title}</h3>
      <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Building2 className="size-4 text-secondary" /> {opportunity.company}
      </p>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{opportunity.summary}</p>
      <div className="mt-auto grid grid-cols-2 gap-2 pt-4 text-xs font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3.5" /> {opportunity.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <GraduationCap className="size-3.5" /> {opportunity.level}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock3 className="size-3.5" /> {opportunity.contract}
        </span>
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="size-3.5" /> {opportunity.deadline}
        </span>
      </div>
    </Link>
  );
}

export function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <Link
      to="/actualites/$slug"
      params={{ slug: item.slug }}
      className={cn(
        "group flex h-full flex-col rounded-xl border border-border bg-card p-5 lbc-card-shadow transition-all hover:-translate-y-0.5 hover:border-secondary/40",
        featured && "lbc-hero-panel border-transparent text-primary-foreground",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-extrabold",
            featured ? "bg-accent text-accent-foreground" : "bg-secondary/10 text-secondary",
          )}
        >
          {item.category}
        </span>
        <span className={cn("text-xs font-semibold", featured ? "text-primary-foreground/70" : "text-muted-foreground")}>{item.time}</span>
      </div>
      <h3 className={cn("mt-4 font-display font-bold leading-snug", featured ? "text-2xl md:text-3xl" : "text-lg text-primary group-hover:text-secondary")}>
        {item.title}
      </h3>
      <p className={cn("mt-3 text-sm leading-6", featured ? "text-primary-foreground/80" : "line-clamp-2 text-muted-foreground")}>{item.summary}</p>
      <div className={cn("mt-auto flex items-center justify-between pt-4 text-xs font-semibold", featured ? "text-primary-foreground/80" : "text-muted-foreground")}>
        <span>
          {item.source} · {item.sourceType}
        </span>
        <ArrowUpRight className="size-4" />
      </div>
    </Link>
  );
}

export function PracticalCard({ info }: { info: PracticalInfo }) {
  return (
    <Link
      to="/infos-pratiques/$slug"
      params={{ slug: info.slug }}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 lbc-card-shadow transition-all hover:-translate-y-0.5 hover:border-secondary/40"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-extrabold uppercase text-secondary">{info.category}</span>
        <StatusBadge tone={info.status === "Disponible" ? "success" : info.status === "Lien officiel" ? "primary" : "warning"}>
          {info.status === "Lien officiel" && <ExternalLink className="mr-1 size-3" />}
          {info.status}
        </StatusBadge>
      </div>
      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-primary group-hover:text-secondary">{info.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{info.description}</p>
      <div className="mt-auto flex items-center justify-between pt-4 text-xs font-semibold text-muted-foreground">
        <span>{info.owner}</span>
        <span className="inline-flex items-center gap-1 text-secondary">
          {info.action} <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
