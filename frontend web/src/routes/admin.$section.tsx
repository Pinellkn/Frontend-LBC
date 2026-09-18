import { createFileRoute, notFound } from "@tanstack/react-router";

import { AdminSection } from "@/components/lbc/admin-pages";
import { adminNav } from "@/lib/lbc-data";

export const Route = createFileRoute("/admin/$section")({
  loader: ({ params }) => {
    const item = adminNav.find((entry) => entry.slug === params.section && entry.slug);
    if (!item) throw notFound();
    return { item: { label: item.label, description: item.description } };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.item.label ?? "Administration";
    const description = loaderData?.item.description ?? "Gestion de la plateforme LBC.";
    return { meta: [
      { title: `${title} — Administration LBC` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — Administration LBC` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: AdminSectionRoute,
});

function AdminSectionRoute() {
  const { section } = Route.useParams();
  return <AdminSection section={section} />;
}