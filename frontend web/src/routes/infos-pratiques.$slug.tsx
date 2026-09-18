import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";

import { PracticalCard } from "@/components/lbc/cards";
import { PageSection, StatusBadge } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { practicalInfos } from "@/lib/lbc-data";

export const Route = createFileRoute("/infos-pratiques/$slug")({
  loader: ({ params }) => {
    const info = practicalInfos.find((i) => i.slug === params.slug);
    if (!info) throw notFound();
    return { info };
  },
  head: ({ loaderData }) => {
    const i = loaderData?.info;
    const title = i ? `${i.title} — Infos pratiques | LBC` : "Info pratique — LBC";
    const description = i?.description ?? "Démarche pratique au Bénin sur LBC.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PracticalDetail,
});

function PracticalDetail() {
  const { info } = Route.useLoaderData();
  const others = practicalInfos.filter((i) => i.slug !== info.slug && i.category === info.category).slice(0, 3);

  return (
    <>
      <PageSection className="pb-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/infos-pratiques">
            <ArrowLeft className="size-4" /> Toutes les infos pratiques
          </Link>
        </Button>

        <div className="mt-4 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 lbc-card-shadow md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-extrabold uppercase text-secondary">{info.category}</span>
              <StatusBadge tone={info.status === "Disponible" ? "success" : info.status === "Lien officiel" ? "primary" : "warning"}>
                {info.status}
              </StatusBadge>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-primary md:text-4xl">{info.title}</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{info.description}</p>

            <h2 className="mt-8 font-display text-xl font-extrabold text-primary">Les étapes</h2>
            <ol className="mt-4 grid gap-3">
              {info.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3 rounded-xl bg-muted/50 p-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-foreground">{s}</span>
                </li>
              ))}
            </ol>

            {info.officialUrl && (
              <div className="mt-8 rounded-2xl border border-secondary/30 bg-secondary/5 p-6">
                <p className="font-display text-lg font-extrabold text-primary">Service assuré par {info.owner}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  LBC ne délivre pas ce document. La démarche se poursuit sur le site officiel.
                </p>
                <Button asChild className="mt-4">
                  <a href={info.officialUrl} target="_blank" rel="noreferrer">
                    Aller sur le site officiel <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
              <ShieldCheck className="size-5 text-secondary" />
              <p className="mt-3 text-xs font-bold uppercase text-muted-foreground">Responsable de l'information</p>
              <p className="mt-1 font-display text-lg font-extrabold text-primary">{info.owner}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Les informations pratiques sont vérifiées puis mises à jour avec les administrations concernées.
              </p>
            </div>

            {others.length > 0 && (
              <div className="grid gap-5">
                {others.map((o) => (
                  <PracticalCard key={o.slug} info={o} />
                ))}
              </div>
            )}
          </aside>
        </div>
      </PageSection>
    </>
  );
}
