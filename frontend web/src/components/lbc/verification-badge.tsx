import { Award, BadgeCheck, ShieldCheck, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type VerificationLevel = 1 | 2 | 3;

type LevelInfo = {
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** classes de couleur : bleu, vert, or */
  classes: string;
  dot: string;
};

export const verificationLevels: Record<VerificationLevel, LevelInfo> = {
  1: {
    label: "Vérifiée",
    title: "Niveau 1 · Identité vérifiée",
    description: "RCCM / IFU et coordonnées contrôlés par l'équipe LBC.",
    icon: BadgeCheck,
    classes: "border-sky-200 bg-sky-100 text-sky-800",
    dot: "bg-sky-500",
  },
  2: {
    label: "Certifiée",
    title: "Niveau 2 · Activité certifiée",
    description: "Activité confirmée sur le terrain et contact validé.",
    icon: ShieldCheck,
    classes: "border-emerald-200 bg-emerald-100 text-emerald-800",
    dot: "bg-emerald-500",
  },
  3: {
    label: "Excellence",
    title: "Niveau 3 · Partenaire d'excellence",
    description: "Audit complet, avis clients suivis et engagement qualité LBC.",
    icon: Award,
    classes: "border-amber-300 bg-amber-100 text-amber-900",
    dot: "bg-amber-500",
  },
};

/**
 * Niveau de vérification d'une structure.
 * En attendant la vraie donnée du back-end, le niveau est déduit de façon stable du slug.
 */
export function verificationLevelOf(slug: string): VerificationLevel {
  let sum = 0;
  for (const char of slug) sum += char.charCodeAt(0);
  return ((sum % 3) + 1) as VerificationLevel;
}

export function VerificationBadge({
  level,
  className,
  showLevel = false,
}: {
  level: VerificationLevel;
  className?: string;
  showLevel?: boolean;
}) {
  const info = verificationLevels[level];
  const Icon = info.icon;
  return (
    <span
      title={`${info.title} — ${info.description}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-extrabold",
        info.classes,
        className,
      )}
    >
      <Icon className="size-3.5" />
      {showLevel ? info.title : info.label}
    </span>
  );
}

/** Légende des trois niveaux (à afficher dans l'espace structure). */
export function VerificationLegend({ current }: { current?: VerificationLevel }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {([1, 2, 3] as const).map((level) => {
        const info = verificationLevels[level];
        return (
          <li
            key={level}
            className={cn(
              "rounded-xl border bg-card p-4",
              current === level ? "border-secondary ring-2 ring-secondary/20" : "border-border",
            )}
          >
            <VerificationBadge level={level} />
            <p className="mt-3 text-sm font-bold text-primary">{info.title}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{info.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
