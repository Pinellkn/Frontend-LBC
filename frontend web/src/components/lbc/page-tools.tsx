import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageSection({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8", className)}>{children}</section>;
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="text-sm font-extrabold uppercase text-secondary">{eyebrow}</p>}
      <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-primary md:text-5xl">{title}</h1>
      {description && <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">{description}</p>}
    </div>
  );
}

export function MiniStat({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl font-extrabold text-primary">{value}</p>
        </div>
        <div className="rounded-md bg-secondary/10 p-3 text-secondary">
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "success" | "warning" | "neutral" }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-md px-2.5 py-1 text-xs font-extrabold",
        tone === "primary" && "bg-secondary/10 text-secondary",
        tone === "success" && "bg-lbc-success/15 text-primary",
        tone === "warning" && "bg-accent/20 text-accent-foreground",
        tone === "neutral" && "bg-muted text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function ActionLine({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm font-bold text-secondary">
      {children}
      <ArrowRight className="size-4" />
    </div>
  );
}
