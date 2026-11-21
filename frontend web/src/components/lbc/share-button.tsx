import { Check, Link2, Mail, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Target = {
  id: string;
  label: string;
  badge: string;
  color: string;
  href: (url: string, title: string) => string;
};

const targets: Target[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    badge: "W",
    color: "bg-[#25D366]",
    href: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    badge: "f",
    color: "bg-[#1877F2]",
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "x",
    label: "X (Twitter)",
    badge: "X",
    color: "bg-black",
    href: (url, title) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    badge: "in",
    color: "bg-[#0A66C2]",
    href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    badge: "T",
    color: "bg-[#229ED9]",
    href: (url, title) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
];

/**
 * Bouton « Partager » : WhatsApp, Facebook, X, LinkedIn, Telegram, e-mail,
 * copie du lien et partage natif du téléphone quand il est disponible.
 */
export function ShareButton({
  path,
  title,
  className,
  withLabel = false,
}: {
  /** chemin de la page à partager, ex. /emplois/mon-offre */
  path: string;
  title: string;
  className?: string;
  withLabel?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => new URL(path, window.location.origin).toString();

  const openTarget = (target: Target) => {
    window.open(target.href(getUrl(), title), "_blank", "noopener,noreferrer");
  };

  const sendEmail = () => {
    const url = getUrl();
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n${url}`)}`;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      toast.success("Lien copié dans le presse-papiers.");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Impossible de copier le lien.");
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url: getUrl() });
    } catch {
      // partage annulé : rien à faire
    }
  };

  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size={withLabel ? "sm" : "icon-sm"}
          className={cn("rounded-full bg-background/90", className)}
          aria-label={`Partager : ${title}`}
        >
          <Share2 className="size-4" />
          {withLabel && "Partager"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Partager avec</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {targets.map((target) => (
          <DropdownMenuItem
            key={target.id}
            onSelect={() => openTarget(target)}
            className="cursor-pointer gap-3"
          >
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-md text-[11px] font-extrabold text-white",
                target.color,
              )}
            >
              {target.badge}
            </span>
            {target.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onSelect={sendEmail} className="cursor-pointer gap-3">
          <span className="flex size-6 items-center justify-center rounded-md bg-muted text-foreground">
            <Mail className="size-3.5" />
          </span>
          E-mail
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={copyLink} className="cursor-pointer gap-3">
          <span className="flex size-6 items-center justify-center rounded-md bg-muted text-foreground">
            {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
          </span>
          {copied ? "Lien copié" : "Copier le lien"}
        </DropdownMenuItem>
        {canNativeShare && (
          <DropdownMenuItem onSelect={nativeShare} className="cursor-pointer gap-3">
            <span className="flex size-6 items-center justify-center rounded-md bg-muted text-foreground">
              <Share2 className="size-3.5" />
            </span>
            Plus d'options…
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
