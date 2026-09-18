import { CalendarDays, ImagePlus, Save, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function PublishForm({ kind }: { kind: "offre" | "actualite" }) {
  const offer = kind === "offre";
  return <form className="grid gap-5" onSubmit={(event) => { event.preventDefault(); toast.success(offer ? "Offre envoyée en modération." : "Actualité envoyée en modération."); }}>
    <div className="grid gap-2"><Label htmlFor="title">{offer ? "Intitulé du poste ou de l'opportunité" : "Titre de l'actualité"}</Label><Input id="title" required placeholder={offer ? "Ex. : Assistant conducteur de travaux" : "Ex. : Ouverture d'une nouvelle agence"} /></div>
    <div className="grid gap-4 sm:grid-cols-2"><div className="grid gap-2"><Label>Catégorie</Label><Select required><SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger><SelectContent>{(offer ? ["Emploi", "Stage", "Alternance", "Recrutement", "Appel à candidatures"] : ["Économie", "Emploi", "Formation", "Événement", "Local"]).map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div><div className="grid gap-2"><Label htmlFor="place">{offer ? "Localisation" : "Lieu concerné"}</Label><Input id="place" required placeholder="Cotonou" /></div></div>
    {offer && <div className="grid gap-4 sm:grid-cols-2"><div className="grid gap-2"><Label htmlFor="level">Niveau d'études</Label><Input id="level" placeholder="Bac+3" /></div><div className="grid gap-2"><Label htmlFor="deadline">Date limite</Label><div className="flex items-center gap-2 rounded-md border border-input px-3"><CalendarDays className="size-4 text-secondary" /><Input id="deadline" type="date" className="border-0 shadow-none focus-visible:ring-0" /></div></div></div>}
    <div className="grid gap-2"><Label htmlFor="summary">Résumé</Label><Textarea id="summary" required rows={3} placeholder="Présentez l'essentiel en quelques lignes." /></div>
    <div className="grid gap-2"><Label htmlFor="content">{offer ? "Missions, profil et modalités de candidature" : "Contenu de la publication"}</Label><Textarea id="content" required rows={9} placeholder="Rédigez toutes les informations utiles…" /></div>
    {!offer && <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 p-7 text-sm font-bold text-muted-foreground hover:border-secondary"><ImagePlus className="size-5 text-secondary" /> Ajouter une image PNG ou JPG<input type="file" accept="image/png,image/jpeg" className="hidden" /></label>}
    <div className="flex flex-wrap justify-end gap-3"><Button type="button" variant="outline" onClick={() => toast.success("Brouillon enregistré sur cet appareil.")}><Save className="size-4" /> Enregistrer le brouillon</Button><Button type="submit"><Send className="size-4" /> Envoyer en modération</Button></div>
  </form>;
}