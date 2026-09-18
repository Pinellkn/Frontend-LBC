import { createFileRoute } from "@tanstack/react-router";

import { AdminDashboard } from "@/components/lbc/admin-pages";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [
    { title: "Tableau de bord — Administration LBC" },
    { name: "description", content: "Vue d'ensemble de la plateforme LBC." },
    { property: "og:title", content: "Administration LBC" },
    { property: "og:description", content: "Centre de contrôle de la plateforme LBC." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AdminDashboard,
});