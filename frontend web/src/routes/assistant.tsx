import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, BriefcaseBusiness, Newspaper, SendHorizonal, Sparkles, Landmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import aiOrb from "@/assets/lbc-ai-orb.png";
import { PageSection } from "@/components/lbc/page-tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { assistantExamples, companies, newsFeed, opportunities, practicalInfos } from "@/lib/lbc-data";

type Suggestion = { kind: "entreprise" | "emploi" | "actualite" | "pratique"; label: string; sub: string; to: string };
type Message = { role: "user" | "lbc"; text: string; suggestions?: Suggestion[] };

type SearchParams = { q?: string | undefined };

export const Route = createFileRoute("/assistant")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s["q"] === "string" && s["q"] ? (s["q"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Assistant IA LBC — votre guide dans tout le Bénin" },
      { name: "description", content: "Posez votre question en langage naturel : l'assistant LBC vous oriente vers les entreprises, opportunités, actualités et démarches disponibles." },
      { property: "og:title", content: "Assistant IA LBC" },
      { property: "og:description", content: "Demandez, LBC vous oriente vers la bonne information au Bénin." },
    ],
  }),
  component: AssistantPage,
});

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function answer(question: string): Message {
  const q = norm(question);
  const words = q.split(/[^a-z0-9]+/).filter((w) => w.length > 3);
  const score = (hay: string) => words.reduce((n, w) => (norm(hay).includes(w) ? n + 1 : n), 0);

  const comp = companies
    .map((c) => ({ c, s: score(`${c.name} ${c.sector} ${c.commune} ${c.description} ${c.services.join(" ")}`) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3);

  const jobs = opportunities
    .map((o) => ({ o, s: score(`${o.title} ${o.domain} ${o.location} ${o.type} ${o.level} ${o.summary}`) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3);

  const infos = practicalInfos
    .map((i) => ({ i, s: score(`${i.title} ${i.category} ${i.owner} ${i.description} ${i.steps.join(" ")}`) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 2);

  const news = newsFeed
    .map((n) => ({ n, s: score(`${n.title} ${n.category} ${n.summary} ${n.source}`) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 2);

  const suggestions: Suggestion[] = [
    ...comp.map(({ c }) => ({ kind: "entreprise" as const, label: c.name, sub: `${c.sector} · ${c.commune}`, to: `/entreprises/${c.slug}` })),
    ...jobs.map(({ o }) => ({ kind: "emploi" as const, label: o.title, sub: `${o.type} · ${o.company} · ${o.location}`, to: `/emplois/${o.id}` })),
    ...infos.map(({ i }) => ({ kind: "pratique" as const, label: i.title, sub: `${i.category} · ${i.owner}`, to: `/infos-pratiques/${i.slug}` })),
    ...news.map(({ n }) => ({ kind: "actualite" as const, label: n.title, sub: `${n.source} · ${n.date}`, to: `/actualites/${n.slug}` })),
  ];

  if (!suggestions.length) {
    return {
      role: "lbc",
      text: "Je n'ai pas encore trouvé d'élément correspondant dans les données référencées. LBC est en phase MVP : essayez avec un secteur (BTP, santé, logistique), une commune (Cotonou, Abomey-Calavi, Parakou) ou une démarche (créer une entreprise, permis de conduire).",
    };
  }

  const parts: string[] = [];
  if (comp.length) parts.push(`${comp.length} entreprise${comp.length > 1 ? "s" : ""}`);
  if (jobs.length) parts.push(`${jobs.length} opportunité${jobs.length > 1 ? "s" : ""}`);
  if (infos.length) parts.push(`${infos.length} information${infos.length > 1 ? "s" : ""} pratique${infos.length > 1 ? "s" : ""}`);
  if (news.length) parts.push(`${news.length} actualité${news.length > 1 ? "s" : ""}`);

  return {
    role: "lbc",
    text: `J'ai trouvé ${parts.join(", ")} qui correspondent à votre demande. Voici ce que je vous propose :`,
    suggestions,
  };
}

const kindIcon = {
  entreprise: Building2,
  emploi: BriefcaseBusiness,
  actualite: Newspaper,
  pratique: Landmark,
};

function AssistantPage() {
  const search = Route.useSearch();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "lbc",
      text: "Bonjour 👋 Je suis l'assistant LBC. Dites-moi ce que vous cherchez : une entreprise, un stage, une démarche administrative ou une actualité au Bénin.",
    },
  ]);
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const ask = (text: string) => {
    const question = text.trim();
    if (!question) return;
    setMessages((m) => [...m, { role: "user", text: question }, answer(question)]);
    setValue("");
  };

  useEffect(() => {
    if (search.q) ask(search.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.q]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <PageSection className="pb-20">
      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <div className="flex min-h-[70vh] flex-col overflow-hidden rounded-3xl border border-border bg-card lbc-card-shadow">
          <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-6 py-4">
            <img src={aiOrb} alt="" className="size-10 object-contain" />
            <div>
              <p className="font-display text-lg font-extrabold text-primary">Assistant IA LBC</p>
              <p className="text-xs font-semibold text-muted-foreground">Recherche dans l'ensemble des données LBC</p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-lbc-success/15 px-3 py-1 text-xs font-extrabold text-primary">
              <Sparkles className="size-3.5" /> En ligne
            </span>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-6 " +
                    (m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/60 text-foreground")
                  }
                >
                  <p>{m.text}</p>
                  {m.suggestions && (
                    <div className="mt-4 grid gap-2">
                      {m.suggestions.map((s) => {
                        const Icon = kindIcon[s.kind];
                        return (
                          <Link
                            key={s.to}
                            to={s.to}
                            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:border-secondary/50"
                          >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                              <Icon className="size-4" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate font-bold text-primary">{s.label}</span>
                              <span className="block truncate text-xs text-muted-foreground">{s.sub}</span>
                            </span>
                            <ArrowRight className="ml-auto size-4 shrink-0 text-secondary" />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form
            className="flex items-center gap-2 border-t border-border bg-card p-4"
            onSubmit={(e) => {
              e.preventDefault();
              ask(value);
            }}
          >
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ex. : Trouve-moi les entreprises de BTP à Abomey-Calavi."
              className="h-12 rounded-xl"
            />
            <Button type="submit" size="lg" className="rounded-xl">
              <SendHorizonal className="size-4" /> Envoyer
            </Button>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 lbc-card-shadow">
            <h2 className="font-display text-lg font-extrabold text-primary">Exemples de questions</h2>
            <div className="mt-4 grid gap-2">
              {assistantExamples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => ask(ex)}
                  className="rounded-xl bg-muted/60 p-3 text-left text-sm font-semibold text-foreground hover:bg-muted"
                >
                  « {ex} »
                </button>
              ))}
            </div>
          </div>

          <div className="lbc-hero-panel rounded-2xl p-6 text-primary-foreground">
            <h2 className="font-display text-lg font-extrabold">Ce que l'assistant sait faire</h2>
            <ul className="mt-4 grid gap-2 text-sm text-primary-foreground/85">
              <li>Trouver une entreprise par secteur et commune</li>
              <li>Repérer les stages et emplois selon votre profil</li>
              <li>Expliquer une démarche administrative</li>
              <li>Résumer les actualités économiques récentes</li>
            </ul>
            <p className="mt-4 text-xs text-primary-foreground/70">
              L'assistant s'appuie uniquement sur les informations référencées dans LBC.
            </p>
          </div>
        </aside>
      </div>
    </PageSection>
  );
}
