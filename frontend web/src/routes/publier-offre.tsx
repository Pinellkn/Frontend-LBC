import { createFileRoute } from "@tanstack/react-router";

import { PageSection, SectionHeading } from "@/components/lbc/page-tools";
import { PublishForm } from "@/components/lbc/publish-form";

export const Route = createFileRoute("/publier-offre")({
  head: () => ({ meta: [
    { title: "Publier une offre — LBC" },
    { name: "description", content: "Publiez un emploi, un stage ou un appel à candidatures sur LBC." },
    { property: "og:title", content: "Publier une offre — LBC" },
    { property: "og:description", content: "Diffusez vos opportunités professionnelles au Bénin." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PublishOfferPage,
});

function PublishOfferPage() { return <PageSection className="pb-20"><div className="mx-auto max-w-3xl"><SectionHeading eyebrow="Espace structure" title="Publier une opportunité" description="Présentez votre offre avec toutes les informations utiles. Elle sera vérifiée avant publication." /><div className="mt-8 rounded-2xl border border-border bg-card p-6 lbc-card-shadow md:p-9"><PublishForm kind="offre" /></div></div></PageSection>; }