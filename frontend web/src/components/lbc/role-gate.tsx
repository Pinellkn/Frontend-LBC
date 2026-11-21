import { Link, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import { PageSection } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { can, roleLabels, roleOf, type Permission } from "@/lib/lbc-roles";
import { useSession } from "@/lib/lbc-session";

/**
 * Protège une page réservée à certains acteurs :
 * - visiteur non connecté -> page de connexion
 * - acteur non autorisé -> message « accès réservé »
 */
export function RoleGate({
  permission,
  children,
}: {
  permission: Permission;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const { ready, session } = useSession();
  const role = roleOf(session);

  useEffect(() => {
    if (ready && !session) navigate({ to: "/connexion", replace: true });
  }, [ready, session, navigate]);

  if (!ready || !session) return <div className="min-h-[70vh]" aria-hidden="true" />;

  if (!can(role, permission)) {
    return (
      <PageSection className="py-20">
        <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-8 text-center lbc-card-shadow">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <Lock className="size-7" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-extrabold text-primary">Accès réservé</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Cette page est réservée aux entreprises et aux institutions. Vous êtes connecté avec un{" "}
            <strong>{role ? roleLabels[role].toLowerCase() : "compte"}</strong>.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="accent">
              <Link to="/espace-utilisateur">Aller à mon espace</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </div>
      </PageSection>
    );
  }

  return <>{children}</>;
}
