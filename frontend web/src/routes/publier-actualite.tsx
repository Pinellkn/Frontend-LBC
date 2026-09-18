import { createFileRoute } from "@tanstack/react-router";

import { PageSection, SectionHeading } from "@/components/lbc/page-tools";
import { PublishForm } from "@/components/lbc/publish-form";

export const Route = createFileRoute("/publier-actualite")({
  head: () => ({ meta: [
    { title: "Publier une actualité — LBC" },
    { name: "description", content: "Diffusez une information officielle depuis votre espace structure LBC." },
    { property: "og:title", content: "Publier une actualité — LBC" },
    { property: "og:description", content: "Partagez une information économique, locale ou institutionnelle." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PublishNewsPage,
});

function PublishNewsPage() { return <PageSection className="pb-20"><div className="mx-auto max-w-3xl"><SectionHeading eyebrow="Espace structure" title="Publier une actualité" description="Informez votre communauté avec une publication claire, sourcée et à jour." /><div className="mt-8 rounded-2xl border border-border bg-card p-6 lbc-card-shadow md:p-9"><PublishForm kind="actualite" /></div></div></PageSection>; }