import type { LbcSession } from "@/lib/lbc-session";

/**
 * Rôles des acteurs LBC. Chaque acteur ne voit que les outils qui le concernent.
 * Pour changer qui voit quoi, il suffit de modifier la table `permissions`.
 */
export type LbcRole = "utilisateur" | "entreprise" | "institution";

export const roleLabels: Record<LbcRole, string> = {
  utilisateur: "Compte utilisateur",
  entreprise: "Compte entreprise",
  institution: "Compte institution",
};

export const permissions = {
  // Référencer sa structure et suivre sa page : entreprises et institutions
  referencerStructure: ["entreprise", "institution"],
  tableauStructure: ["entreprise", "institution"],
  // Publications : offres/appels à candidatures et actualités
  publierOffre: ["entreprise", "institution"],
  publierActualite: ["entreprise", "institution"],
  // Espace personnel du candidat : candidatures et favoris
  candidatures: ["utilisateur"],
} as const satisfies Record<string, readonly LbcRole[]>;

export type Permission = keyof typeof permissions;

export function roleOf(session: LbcSession | null | undefined): LbcRole | null {
  if (!session) return null;
  return session.profile === "entreprise" || session.profile === "institution"
    ? session.profile
    : "utilisateur";
}

export function can(role: LbcRole | null, permission: Permission): boolean {
  if (!role) return false;
  return (permissions[permission] as readonly LbcRole[]).includes(role);
}

export function isStructure(role: LbcRole | null): boolean {
  return role === "entreprise" || role === "institution";
}

/** Libellé du bouton « référencer » selon l'acteur. */
export function referencerLabel(role: LbcRole | null): string {
  if (role === "institution") return "Référencer mon institution";
  if (role === "entreprise") return "Référencer mon entreprise";
  return "Référencer ma structure";
}
