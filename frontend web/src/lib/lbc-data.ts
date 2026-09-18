import {
  BarChart3,
  BellRing,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  DatabaseZap,
  FileText,
  Flag,
  Handshake,
  Landmark,
  LockKeyhole,
  Megaphone,
  Newspaper,
  Radio,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------- Types --------------------------------- */

export type Company = {
  slug: string;
  name: string;
  sector: string;
  commune: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  hours: string;
  status: "Vérifiée" | "À vérifier";
  description: string;
  services: string[];
  founded: string;
  size: string;
  rating: number;
  reviews: number;
};

export type OpportunityType = "Emploi" | "Stage" | "Alternance" | "Recrutement" | "Appel à candidatures";

export type Opportunity = {
  id: string;
  title: string;
  companySlug: string;
  company: string;
  type: OpportunityType;
  domain: string;
  location: string;
  level: string;
  contract: string;
  deadline: string;
  posted: string;
  salary?: string;
  summary: string;
  missions: string[];
  profile: string[];
  howToApply: string;
};

export type NewsItem = {
  slug: string;
  source: string;
  sourceType: "Entreprise" | "Institution" | "Organisation" | "Événement" | "Acteur économique";
  title: string;
  category: string;
  date: string;
  time: string;
  summary: string;
  body: string[];
};

export type PracticalInfo = {
  slug: string;
  title: string;
  category: string;
  owner: string;
  action: string;
  status: "Disponible" | "Lien officiel" | "En validation";
  description: string;
  steps: string[];
  officialUrl?: string;
};

export type Administration = {
  name: string;
  commune: string;
  domain: string;
  phone: string;
  hours: string;
};

/* --------------------------------- Modules -------------------------------- */

export const lbcModules = [
  {
    title: "Entreprises",
    description: "Recherche par nom, secteur ou commune. Fiches complètes et vérifiées.",
    href: "/entreprises",
    icon: Building2,
    signal: "1 240 fiches",
  },
  {
    title: "Emplois & stages",
    description: "Offres d'emploi, stages, alternances, recrutements et appels à candidatures.",
    href: "/emplois",
    icon: BriefcaseBusiness,
    signal: "86 opportunités",
  },
  {
    title: "Actualités",
    description: "Le fil économique, professionnel et local, publié par les acteurs eux-mêmes.",
    href: "/actualites",
    icon: Newspaper,
    signal: "32 sources",
  },
  {
    title: "Infos pratiques",
    description: "Administrations, démarches et services utiles au quotidien au Bénin.",
    href: "/infos-pratiques",
    icon: Landmark,
    signal: "58 repères",
  },
] as const;

export const sectors = [
  { name: "BTP & construction", count: 418, communes: "Cotonou, Abomey-Calavi, Porto-Novo" },
  { name: "Santé & pharmacie", count: 263, communes: "Cotonou, Parakou, Bohicon" },
  { name: "Agroalimentaire", count: 198, communes: "Abomey, Natitingou, Lokossa" },
  { name: "Éducation & formation", count: 174, communes: "Cotonou, Ouidah, Djougou" },
  { name: "Transport & logistique", count: 151, communes: "Cotonou, Sèmè-Podji, Allada" },
  { name: "Numérique & IT", count: 96, communes: "Cotonou, Abomey-Calavi" },
  { name: "Commerce & distribution", count: 233, communes: "Cotonou, Porto-Novo, Parakou" },
  { name: "Finance & assurance", count: 74, communes: "Cotonou, Porto-Novo" },
];

export const communes = [
  "Cotonou",
  "Abomey-Calavi",
  "Porto-Novo",
  "Parakou",
  "Bohicon",
  "Abomey",
  "Ouidah",
  "Lokossa",
  "Natitingou",
  "Djougou",
  "Sèmè-Podji",
  "Allada",
];

/* -------------------------------- Companies ------------------------------- */

export const companies: Company[] = [
  {
    slug: "benin-btp-services",
    name: "Bénin BTP Services",
    sector: "BTP & construction",
    commune: "Abomey-Calavi",
    address: "Quartier Zogbadjè, Route de Ouidah",
    phone: "+229 01 60 00 00 00",
    email: "contact@beninbtp.bj",
    website: "beninbtp.bj",
    hours: "Lun–Sam · 8h–18h",
    status: "Vérifiée",
    description:
      "Entreprise de construction spécialisée en gros œuvre, rénovation et suivi technique de chantiers résidentiels et tertiaires dans le Grand Nokoué.",
    services: ["Gros œuvre", "Rénovation", "Études techniques", "Suivi de chantier", "Voirie"],
    founded: "2014",
    size: "50–100 employés",
    rating: 4.7,
    reviews: 128,
  },
  {
    slug: "clinique-sainte-victoire",
    name: "Clinique Sainte Victoire",
    sector: "Santé & pharmacie",
    commune: "Cotonou",
    address: "Cadjèhoun, Rue 1245",
    phone: "+229 01 61 20 30 40",
    email: "accueil@saintevictoire.bj",
    hours: "24h/24 · 7j/7",
    status: "À vérifier",
    description: "Consultations générales, analyses médicales, maternité et orientation vers les spécialistes.",
    services: ["Consultations", "Laboratoire", "Maternité", "Urgences"],
    founded: "2009",
    size: "20–50 employés",
    rating: 4.3,
    reviews: 64,
  },
  {
    slug: "kouffo-agro-distribution",
    name: "Kouffo Agro Distribution",
    sector: "Agroalimentaire",
    commune: "Lokossa",
    address: "Zone industrielle, Lokossa",
    phone: "+229 01 62 45 88 19",
    email: "ventes@kouffoagro.bj",
    website: "kouffoagro.bj",
    hours: "Lun–Ven · 7h30–17h",
    status: "Vérifiée",
    description: "Transformation locale de produits agricoles, circuits courts et distribution vers les marchés urbains.",
    services: ["Transformation", "Conditionnement", "Distribution", "Export régional"],
    founded: "2017",
    size: "10–20 employés",
    rating: 4.5,
    reviews: 41,
  },
  {
    slug: "formatech-benin",
    name: "FormaTech Bénin",
    sector: "Éducation & formation",
    commune: "Porto-Novo",
    address: "Ouando, Carrefour Catchi",
    phone: "+229 01 63 12 77 08",
    email: "info@formatech.bj",
    website: "formatech.bj",
    hours: "Lun–Sam · 8h–19h",
    status: "Vérifiée",
    description: "Centre de formation aux métiers du numérique, bureautique, développement web et reconversion professionnelle.",
    services: ["Développement web", "Bureautique", "Data & IA", "Certifications"],
    founded: "2019",
    size: "10–20 employés",
    rating: 4.8,
    reviews: 212,
  },
  {
    slug: "atlantique-logistics",
    name: "Atlantique Logistics",
    sector: "Transport & logistique",
    commune: "Sèmè-Podji",
    address: "Route Inter-États, PK 12",
    phone: "+229 01 64 30 21 90",
    email: "ops@atlantiquelogistics.bj",
    hours: "Lun–Sam · 7h–20h",
    status: "Vérifiée",
    description: "Transit, entreposage et transport routier depuis le Port de Cotonou vers l'hinterland (Niger, Burkina, Mali).",
    services: ["Transit", "Entreposage", "Transport routier", "Dédouanement"],
    founded: "2011",
    size: "100–250 employés",
    rating: 4.4,
    reviews: 87,
  },
  {
    slug: "nokoue-digital",
    name: "Nokoué Digital",
    sector: "Numérique & IT",
    commune: "Cotonou",
    address: "Haie Vive, Immeuble Horizon",
    phone: "+229 01 65 77 40 12",
    email: "hello@nokouedigital.bj",
    website: "nokouedigital.bj",
    hours: "Lun–Ven · 9h–18h",
    status: "Vérifiée",
    description: "Agence digitale : sites web, applications mobiles, paiement mobile money et marketing digital pour PME.",
    services: ["Sites web", "Applications mobiles", "Intégration Mobile Money", "SEO & publicité"],
    founded: "2020",
    size: "10–20 employés",
    rating: 4.9,
    reviews: 58,
  },
  {
    slug: "pharmacie-la-grace",
    name: "Pharmacie La Grâce",
    sector: "Santé & pharmacie",
    commune: "Parakou",
    address: "Quartier Zongo, face au marché Arzèkè",
    phone: "+229 01 66 10 55 23",
    email: "pharmacie.lagrace@gmail.com",
    hours: "Lun–Dim · 7h–22h",
    status: "Vérifiée",
    description: "Officine de garde, produits pharmaceutiques, parapharmacie et conseils santé.",
    services: ["Médicaments", "Parapharmacie", "Garde de nuit", "Livraison"],
    founded: "2005",
    size: "5–10 employés",
    rating: 4.6,
    reviews: 93,
  },
  {
    slug: "caisse-locale-atlantique",
    name: "Caisse Locale Atlantique",
    sector: "Finance & assurance",
    commune: "Cotonou",
    address: "Ganhi, Avenue Steinmetz",
    phone: "+229 01 67 22 88 00",
    email: "clientele@cla.bj",
    website: "cla.bj",
    hours: "Lun–Ven · 8h–16h30",
    status: "Vérifiée",
    description: "Institution de microfinance dédiée au financement des PME, artisans et commerçants.",
    services: ["Microcrédit", "Épargne", "Financement PME", "Mobile banking"],
    founded: "2002",
    size: "50–100 employés",
    rating: 4.2,
    reviews: 156,
  },
  {
    slug: "marche-central-distribution",
    name: "Marché Central Distribution",
    sector: "Commerce & distribution",
    commune: "Bohicon",
    address: "Quartier Sodohomè",
    phone: "+229 01 68 41 09 76",
    email: "mcd.bohicon@gmail.com",
    hours: "Lun–Sam · 7h–19h",
    status: "À vérifier",
    description: "Grossiste en produits de grande consommation pour les commerçants du Zou et des Collines.",
    services: ["Vente en gros", "Livraison", "Produits alimentaires", "Boissons"],
    founded: "2015",
    size: "10–20 employés",
    rating: 4.0,
    reviews: 27,
  },
  {
    slug: "ouidah-eco-tours",
    name: "Ouidah Éco Tours",
    sector: "Commerce & distribution",
    commune: "Ouidah",
    address: "Route des Pêches, Ouidah",
    phone: "+229 01 69 15 62 44",
    email: "contact@ouidahecotours.bj",
    website: "ouidahecotours.bj",
    hours: "Lun–Dim · 8h–18h",
    status: "Vérifiée",
    description: "Agence de tourisme responsable : circuits culturels, route de l'esclave, plages et écolodges.",
    services: ["Circuits culturels", "Écotourisme", "Hébergement", "Guides certifiés"],
    founded: "2018",
    size: "5–10 employés",
    rating: 4.8,
    reviews: 310,
  },
  {
    slug: "atacora-menuiserie",
    name: "Atacora Menuiserie",
    sector: "BTP & construction",
    commune: "Natitingou",
    address: "Quartier Yimporima",
    phone: "+229 01 60 88 34 51",
    email: "atacora.menuiserie@gmail.com",
    hours: "Lun–Sam · 7h30–18h",
    status: "À vérifier",
    description: "Menuiserie bois et aluminium, mobilier sur mesure et aménagement intérieur.",
    services: ["Menuiserie bois", "Aluminium", "Mobilier", "Aménagement"],
    founded: "2012",
    size: "5–10 employés",
    rating: 4.4,
    reviews: 19,
  },
  {
    slug: "ecole-superieure-djougou",
    name: "École Supérieure de Djougou",
    sector: "Éducation & formation",
    commune: "Djougou",
    address: "Route de Natitingou",
    phone: "+229 01 61 47 90 13",
    email: "scolarite@esd.bj",
    website: "esd.bj",
    hours: "Lun–Ven · 8h–17h",
    status: "Vérifiée",
    description: "Établissement privé d'enseignement supérieur : gestion, agronomie et informatique appliquée.",
    services: ["Licences", "Masters", "Formation continue", "Incubateur"],
    founded: "2008",
    size: "20–50 employés",
    rating: 4.3,
    reviews: 72,
  },
];

export const featuredCompanies = companies.filter((c) => c.status === "Vérifiée").slice(0, 4);

/* ------------------------------ Opportunities ----------------------------- */

export const opportunities: Opportunity[] = [
  {
    id: "stage-conducteur-travaux",
    title: "Assistant conducteur de travaux",
    companySlug: "benin-btp-services",
    company: "Bénin BTP Services",
    type: "Stage",
    domain: "BTP & génie civil",
    location: "Abomey-Calavi",
    level: "Bac+2 / Bac+3",
    contract: "Stage de 6 mois",
    deadline: "28 sept. 2026",
    posted: "Il y a 2 jours",
    salary: "Indemnité 60 000 FCFA/mois",
    summary: "Accompagnez le conducteur de travaux sur nos chantiers résidentiels du Grand Nokoué.",
    missions: ["Suivi quotidien des chantiers", "Contrôle des approvisionnements", "Rédaction des rapports d'avancement", "Relation avec les sous-traitants"],
    profile: ["Formation génie civil ou BTP", "Rigueur et sens de l'organisation", "Maîtrise d'AutoCAD appréciée"],
    howToApply: "Envoyez CV et lettre de motivation à recrutement@beninbtp.bj en précisant la référence LBC-STG-01.",
  },
  {
    id: "charge-clientele-pme",
    title: "Chargé de clientèle PME",
    companySlug: "caisse-locale-atlantique",
    company: "Caisse Locale Atlantique",
    type: "Emploi",
    domain: "Finance & commerce",
    location: "Cotonou",
    level: "Bac+3",
    contract: "CDI",
    deadline: "04 oct. 2026",
    posted: "Il y a 3 jours",
    salary: "À négocier selon profil",
    summary: "Développez et fidélisez un portefeuille de PME, artisans et commerçants.",
    missions: ["Prospection commerciale", "Analyse des dossiers de crédit", "Suivi du portefeuille", "Reporting hebdomadaire"],
    profile: ["Bac+3 banque, finance ou commerce", "2 ans d'expérience minimum", "Bon relationnel et sens du terrain"],
    howToApply: "Candidature en ligne via le formulaire du site cla.bj/carrieres ou dépôt physique à l'agence de Ganhi.",
  },
  {
    id: "dev-frontend-junior",
    title: "Développeur frontend junior",
    companySlug: "formatech-benin",
    company: "FormaTech Bénin",
    type: "Alternance",
    domain: "Numérique & IT",
    location: "Porto-Novo",
    level: "Bac+2 minimum",
    contract: "Alternance 12 mois",
    deadline: "12 oct. 2026",
    posted: "Il y a 5 jours",
    summary: "Participez à la conception des plateformes pédagogiques de FormaTech en React.",
    missions: ["Développement d'interfaces React", "Intégration des maquettes", "Tests et documentation"],
    profile: ["Bases solides en HTML/CSS/JavaScript", "Curiosité pour React et TypeScript", "Esprit d'équipe"],
    howToApply: "Postulez sur formatech.bj/alternance avec un lien vers vos projets (GitHub, portfolio).",
  },
  {
    id: "appel-jeunes-entrepreneurs",
    title: "Appel à candidatures – Jeunes entrepreneurs 2026",
    companySlug: "ecole-superieure-djougou",
    company: "Incubateur ESD",
    type: "Appel à candidatures",
    domain: "Entrepreneuriat",
    location: "National",
    level: "Projet en démarrage",
    contract: "Programme de 9 mois",
    deadline: "20 oct. 2026",
    posted: "Il y a 1 semaine",
    summary: "Accompagnement, mentorat et financement d'amorçage pour 20 projets portés par des jeunes de 18 à 35 ans.",
    missions: ["Bootcamp de 2 semaines", "Mentorat individuel", "Accès au financement d'amorçage"],
    profile: ["Être âgé de 18 à 35 ans", "Projet à impact local", "Résider au Bénin"],
    howToApply: "Dossier de candidature à déposer sur esd.bj/incubateur avant la date limite.",
  },
  {
    id: "stage-genie-mecanique",
    title: "Stagiaire en génie mécanique",
    companySlug: "atlantique-logistics",
    company: "Atlantique Logistics",
    type: "Stage",
    domain: "Génie mécanique",
    location: "Cotonou",
    level: "Bac+3 / Bac+5",
    contract: "Stage de 4 mois",
    deadline: "30 sept. 2026",
    posted: "Hier",
    salary: "Indemnité 75 000 FCFA/mois",
    summary: "Rejoignez l'atelier de maintenance de notre flotte de 80 camions au Port de Cotonou.",
    missions: ["Diagnostic mécanique", "Planification de la maintenance préventive", "Gestion du stock de pièces"],
    profile: ["Étudiant en génie mécanique ou maintenance industrielle", "Connaissance des moteurs diesel", "Disponibilité immédiate"],
    howToApply: "Envoyez votre CV à rh@atlantiquelogistics.bj avec l'objet « Stage mécanique ».",
  },
  {
    id: "recrutement-infirmiers",
    title: "Recrutement de 6 infirmiers diplômés d'État",
    companySlug: "clinique-sainte-victoire",
    company: "Clinique Sainte Victoire",
    type: "Recrutement",
    domain: "Santé",
    location: "Cotonou",
    level: "Diplôme d'État",
    contract: "CDD 12 mois renouvelable",
    deadline: "15 oct. 2026",
    posted: "Il y a 4 jours",
    summary: "Renfort des équipes de soins pour l'ouverture d'un nouveau service de maternité.",
    missions: ["Soins infirmiers", "Surveillance des patients", "Tenue des dossiers médicaux"],
    profile: ["Diplôme d'État infirmier", "Expérience en maternité appréciée", "Disponibilité pour les gardes"],
    howToApply: "Dépôt de dossier physique au secrétariat de la clinique, Cadjèhoun, du lundi au vendredi.",
  },
  {
    id: "commercial-terrain-bohicon",
    title: "Commercial terrain",
    companySlug: "marche-central-distribution",
    company: "Marché Central Distribution",
    type: "Emploi",
    domain: "Commerce",
    location: "Bohicon",
    level: "Bac / Bac+2",
    contract: "CDD 6 mois",
    deadline: "10 oct. 2026",
    posted: "Il y a 6 jours",
    salary: "Fixe + commissions",
    summary: "Développez le réseau de revendeurs dans le Zou et les Collines.",
    missions: ["Visites clients", "Prise de commandes", "Suivi des encaissements"],
    profile: ["Permis A ou B", "Connaissance du Zou", "Goût du terrain"],
    howToApply: "Appelez le +229 01 68 41 09 76 ou présentez-vous au dépôt de Sodohomè.",
  },
  {
    id: "designer-ui-nokoue",
    title: "Designer UI/UX",
    companySlug: "nokoue-digital",
    company: "Nokoué Digital",
    type: "Emploi",
    domain: "Numérique & IT",
    location: "Cotonou",
    level: "Bac+3",
    contract: "CDI",
    deadline: "25 oct. 2026",
    posted: "Aujourd'hui",
    salary: "350 000 – 500 000 FCFA",
    summary: "Concevez des interfaces mobiles et web pour nos clients PME et fintech.",
    missions: ["Recherche utilisateur", "Maquettes Figma", "Design system", "Collaboration avec les développeurs"],
    profile: ["Portfolio solide", "Maîtrise de Figma", "Sens du détail"],
    howToApply: "Envoyez portfolio et CV à jobs@nokouedigital.bj.",
  },
];

export const opportunityTypes: OpportunityType[] = ["Emploi", "Stage", "Alternance", "Recrutement", "Appel à candidatures"];
export const studyLevels = ["Sans diplôme", "Bac", "Bac+2", "Bac+3", "Bac+5", "Diplôme d'État"];

/* ---------------------------------- News ---------------------------------- */

export const newsFeed: NewsItem[] = [
  {
    slug: "guichet-accompagnement-pme",
    source: "Agence de Promotion des PME",
    sourceType: "Institution",
    title: "Nouveau guichet d'accompagnement pour les petites entreprises",
    category: "Économie",
    date: "17 sept. 2026",
    time: "Il y a 2 h",
    summary: "Un programme de suivi simplifié cible les entreprises locales en phase de formalisation.",
    body: [
      "L'Agence de Promotion des PME annonce l'ouverture d'un guichet unique dédié aux très petites entreprises en cours de formalisation. Le dispositif regroupe l'immatriculation, l'accompagnement fiscal et l'accès aux premiers financements.",
      "Les entrepreneurs de Cotonou, Abomey-Calavi et Porto-Novo pourront bénéficier d'un suivi personnalisé pendant douze mois. Une extension vers Parakou et Bohicon est prévue au premier trimestre 2027.",
      "Les inscriptions se font en ligne ou directement dans les antennes départementales.",
    ],
  },
  {
    slug: "recrutement-logistique-nokoue",
    source: "Atlantique Logistics",
    sourceType: "Entreprise",
    title: "Recrutement groupé dans les métiers de la logistique",
    category: "Emploi",
    date: "17 sept. 2026",
    time: "Ce matin",
    summary: "Plusieurs structures recherchent des profils opérationnels autour du Grand Nokoué.",
    body: [
      "Face à la hausse du trafic portuaire, plusieurs entreprises de transit et de transport lancent une campagne de recrutement coordonnée : chauffeurs poids lourds, magasiniers, déclarants en douane et techniciens de maintenance.",
      "Les candidatures sont centralisées sur LBC dans la rubrique Emplois & stages. Une journée de recrutement se tiendra à Sèmè-Podji le 3 octobre.",
    ],
  },
  {
    slug: "calendrier-demarches-administratives",
    source: "Mairie de Cotonou",
    sourceType: "Institution",
    title: "Calendrier des démarches administratives prioritaires",
    category: "Pratique",
    date: "16 sept. 2026",
    time: "Hier",
    summary: "Les informations officielles sont regroupées par commune et par type de service.",
    body: [
      "La mairie publie le calendrier des services d'état civil, d'urbanisme et de fiscalité locale pour le dernier trimestre 2026, avec les horaires étendus des arrondissements.",
      "LBC relaie ces informations dans la rubrique Infos pratiques et redirige vers le portail officiel pour les téléchargements de formulaires.",
    ],
  },
  {
    slug: "rencontre-digitalisation-pme",
    source: "Hub Éco Bénin",
    sourceType: "Événement",
    title: "Rencontre locale autour de la digitalisation des PME",
    category: "Événement",
    date: "15 sept. 2026",
    time: "Cette semaine",
    summary: "Entreprises, institutions et jeunes talents échangent sur la visibilité numérique au Bénin.",
    body: [
      "Le Hub Éco Bénin organise le 26 septembre une matinée d'échanges sur la présence en ligne des PME : référencement, paiement mobile et gestion de la réputation.",
      "Les entreprises référencées sur LBC bénéficient d'une entrée gratuite sur inscription.",
    ],
  },
  {
    slug: "formatech-nouvelle-promotion-data",
    source: "FormaTech Bénin",
    sourceType: "Entreprise",
    title: "FormaTech ouvre une promotion Data & IA à Porto-Novo",
    category: "Formation",
    date: "14 sept. 2026",
    time: "Il y a 3 jours",
    summary: "Trente places en formation intensive de six mois, avec stage garanti en entreprise partenaire.",
    body: [
      "Le centre de formation lance sa première promotion consacrée à l'analyse de données et à l'intelligence artificielle appliquée aux métiers de la gestion.",
      "Les candidatures sont ouvertes jusqu'au 5 octobre. Des bourses partielles sont réservées aux jeunes femmes.",
    ],
  },
  {
    slug: "ouidah-saison-touristique",
    source: "Office de Tourisme de Ouidah",
    sourceType: "Organisation",
    title: "Ouidah prépare la saison touristique 2026-2027",
    category: "Local",
    date: "13 sept. 2026",
    time: "Il y a 4 jours",
    summary: "Agences, hôtels et artisans coordonnent leurs offres pour l'arrivée des visiteurs.",
    body: [
      "L'office de tourisme réunit les acteurs locaux pour harmoniser tarifs, horaires et circuits en amont du festival des Vodun Days.",
      "Un annuaire des prestataires certifiés sera publié sur LBC.",
    ],
  },
  {
    slug: "mobile-money-commercants",
    source: "Caisse Locale Atlantique",
    sourceType: "Acteur économique",
    title: "Paiement mobile : une offre dédiée aux petits commerçants",
    category: "Économie",
    date: "12 sept. 2026",
    time: "Il y a 5 jours",
    summary: "Frais réduits et micro-crédit instantané pour les commerçants des marchés de Cotonou.",
    body: [
      "La Caisse Locale Atlantique déploie une solution d'encaissement mobile money sans abonnement pour les commerçants de Dantokpa et de Ganhi.",
      "L'offre inclut un micro-crédit de trésorerie accessible en 24 heures après trois mois d'activité.",
    ],
  },
];

export const newsCategories = ["Toutes", "Économie", "Emploi", "Pratique", "Événement", "Formation", "Local"];

/* ----------------------------- Practical infos ---------------------------- */

export const practicalInfos: PracticalInfo[] = [
  {
    slug: "creer-une-entreprise",
    title: "Créer une entreprise",
    category: "Formalités",
    owner: "APIEx / Guichet unique",
    action: "Consulter les étapes",
    status: "Lien officiel",
    description: "Immatriculation au RCCM, obtention de l'IFU et déclaration d'existence en une seule démarche.",
    steps: ["Choisir la forme juridique", "Préparer pièce d'identité et justificatif de domicile", "Déposer le dossier au guichet unique ou en ligne", "Récupérer le RCCM et l'IFU sous 24 à 72h"],
    officialUrl: "https://monentreprise.bj",
  },
  {
    slug: "documents-identite",
    title: "Documents d'identité",
    category: "Administration",
    owner: "ANIP",
    action: "Voir les conditions",
    status: "Disponible",
    description: "Carte d'identité biométrique, certificat d'identification personnelle (CIP) et passeport.",
    steps: ["Vérifier son inscription au RAVIP", "Prendre rendez-vous en ligne", "Se présenter avec l'acte de naissance", "Retirer le document sous 15 jours"],
    officialUrl: "https://anip.bj",
  },
  {
    slug: "impots-declarations",
    title: "Impôts et déclarations",
    category: "Fiscalité",
    owner: "Direction Générale des Impôts",
    action: "Accéder au portail",
    status: "Lien officiel",
    description: "Déclaration et paiement en ligne de la TPS, de l'IS et des retenues à la source.",
    steps: ["Créer un compte e-services avec son IFU", "Sélectionner l'impôt à déclarer", "Payer par mobile money ou virement"],
    officialUrl: "https://impots.bj",
  },
  {
    slug: "marches-publics",
    title: "Marchés publics",
    category: "Opportunités",
    owner: "ARMP / DNCMP",
    action: "Suivre les avis",
    status: "En validation",
    description: "Avis d'appels d'offres, résultats et calendrier des passations.",
    steps: ["S'inscrire sur le portail des marchés publics", "Consulter les avis par secteur", "Télécharger les dossiers d'appel d'offres"],
    officialUrl: "https://marches-publics.bj",
  },
  {
    slug: "administrations-par-commune",
    title: "Administrations par commune",
    category: "Service public",
    owner: "Communes et services déconcentrés",
    action: "Trouver une adresse",
    status: "Disponible",
    description: "Mairies, arrondissements, commissariats, centres de santé et services des impôts près de chez vous.",
    steps: ["Choisir la commune", "Filtrer par type de service", "Consulter horaires et contacts"],
  },
  {
    slug: "permis-de-conduire",
    title: "Permis de conduire",
    category: "Transport",
    owner: "ANaTT",
    action: "Voir la procédure",
    status: "Lien officiel",
    description: "Inscription à l'examen, duplicata et conversion de permis étranger.",
    steps: ["S'inscrire dans une auto-école agréée", "Passer le code et la conduite", "Retirer le permis biométrique"],
    officialUrl: "https://anatt.bj",
  },
  {
    slug: "cnss-immatriculation",
    title: "Sécurité sociale (CNSS)",
    category: "Emploi",
    owner: "CNSS Bénin",
    action: "Immatriculer un salarié",
    status: "Lien officiel",
    description: "Immatriculation employeur, déclaration des salariés et cotisations en ligne.",
    steps: ["Créer un compte employeur", "Déclarer chaque salarié", "Payer les cotisations mensuelles"],
    officialUrl: "https://cnss.bj",
  },
  {
    slug: "numeros-utiles",
    title: "Numéros d'urgence et utiles",
    category: "Urgences",
    owner: "Services publics",
    action: "Voir les numéros",
    status: "Disponible",
    description: "Police, pompiers, SAMU, SBEE, SONEB et lignes d'assistance.",
    steps: ["Police secours : 117", "Sapeurs-pompiers : 118", "SAMU : 112", "Dépannage SBEE : 7373"],
  },
];

export const practicalCategories = ["Toutes", "Formalités", "Administration", "Fiscalité", "Opportunités", "Service public", "Transport", "Emploi", "Urgences"];

export const administrations: Administration[] = [
  { name: "Mairie de Cotonou", commune: "Cotonou", domain: "État civil, urbanisme", phone: "+229 01 21 31 20 60", hours: "Lun–Ven · 8h–17h30" },
  { name: "Mairie d'Abomey-Calavi", commune: "Abomey-Calavi", domain: "État civil, foncier", phone: "+229 01 21 36 01 22", hours: "Lun–Ven · 8h–17h30" },
  { name: "Préfecture de l'Ouémé", commune: "Porto-Novo", domain: "Légalisation, autorisations", phone: "+229 01 20 21 22 40", hours: "Lun–Ven · 8h–17h" },
  { name: "Centre des Impôts de Parakou", commune: "Parakou", domain: "Fiscalité", phone: "+229 01 23 61 04 18", hours: "Lun–Ven · 8h–16h30" },
  { name: "Tribunal de commerce de Cotonou", commune: "Cotonou", domain: "RCCM, litiges commerciaux", phone: "+229 01 21 31 51 72", hours: "Lun–Ven · 8h–17h" },
  { name: "Agence ANIP Bohicon", commune: "Bohicon", domain: "Identité, CIP", phone: "+229 01 22 51 03 90", hours: "Lun–Ven · 8h–16h" },
];

/* -------------------------------- Assistant ------------------------------- */

export const assistantExamples = [
  "Trouve-moi les entreprises de BTP à Abomey-Calavi.",
  "Je cherche un stage en génie mécanique à Cotonou.",
  "Quelles démarches pour créer une entreprise au Bénin ?",
  "Quelles sont les actualités emploi cette semaine ?",
];

/* ---------------------------------- Admin --------------------------------- */

export const adminNav: { label: string; slug: string; icon: LucideIcon; description: string }[] = [
  { label: "Tableau de bord", slug: "", icon: BarChart3, description: "Vue d'ensemble de la plateforme" },
  { label: "Entreprises", slug: "entreprises", icon: Building2, description: "Fiches, comptes et propriétaires" },
  { label: "Utilisateurs", slug: "utilisateurs", icon: UsersRound, description: "Comptes, rôles et permissions" },
  { label: "Actualités", slug: "actualites", icon: Newspaper, description: "Publications et planification" },
  { label: "Sources", slug: "sources", icon: Radio, description: "Sources d'information suivies" },
  { label: "Vérifications", slug: "verifications", icon: ShieldCheck, description: "Preuves et badges de confiance" },
  { label: "Signalements", slug: "signalements", icon: Flag, description: "Erreurs, doublons, abus" },
  { label: "Modération", slug: "moderation", icon: ClipboardCheck, description: "File de validation des contenus" },
  { label: "Statistiques", slug: "statistiques", icon: BarChart3, description: "Trafic, recherches, conversions" },
  { label: "Publicité", slug: "publicite", icon: Megaphone, description: "Campagnes et emplacements" },
  { label: "Partenariats", slug: "partenariats", icon: Handshake, description: "Institutions et partenaires" },
  { label: "Qualité des données", slug: "qualite", icon: DatabaseZap, description: "Fraîcheur, complétude, doublons" },
  { label: "Sécurité", slug: "securite", icon: LockKeyhole, description: "Accès, journaux et alertes" },
];

export const adminQueues = [
  { label: "Entreprises à vérifier", count: 128, detail: "coordonnées, pièces, activité", tone: "primary" as const },
  { label: "Signalements ouverts", count: 24, detail: "doublons, numéros, infos expirées", tone: "warning" as const },
  { label: "Sources actives", count: 32, detail: "institutions, médias, entreprises", tone: "success" as const },
  { label: "Contenus en modération", count: 47, detail: "offres, actualités, avis", tone: "primary" as const },
];

export const dashboardStats = [
  { label: "Fiches entreprises", value: "1 240", delta: "+38 cette semaine", icon: Building2 },
  { label: "Utilisateurs", value: "8 900", delta: "+12 % sur 30 j", icon: UsersRound },
  { label: "Opportunités actives", value: "86", delta: "+9 cette semaine", icon: BriefcaseBusiness },
  { label: "Requêtes IA / jour", value: "1 430", delta: "+21 %", icon: Sparkles },
];

export const trafficSeries = [
  { day: "Lun", visites: 1820, recherches: 940, ia: 310 },
  { day: "Mar", visites: 2140, recherches: 1120, ia: 380 },
  { day: "Mer", visites: 2380, recherches: 1260, ia: 420 },
  { day: "Jeu", visites: 2210, recherches: 1180, ia: 455 },
  { day: "Ven", visites: 2670, recherches: 1390, ia: 510 },
  { day: "Sam", visites: 1960, recherches: 980, ia: 360 },
  { day: "Dim", visites: 1540, recherches: 720, ia: 290 },
];

export const searchBreakdown = [
  { name: "Entreprises", value: 46 },
  { name: "Emplois", value: 31 },
  { name: "Infos pratiques", value: 14 },
  { name: "Actualités", value: 9 },
];

export const dataQualityRows = [
  { source: "Entreprises", fresh: 92, complete: 78, duplicates: 14, owner: "Équipe vérification", risk: "Moyen" },
  { source: "Emplois", fresh: 88, complete: 91, duplicates: 3, owner: "Modération offres", risk: "Faible" },
  { source: "Actualités", fresh: 76, complete: 85, duplicates: 6, owner: "Sources partenaires", risk: "Moyen" },
  { source: "Infos pratiques", fresh: 69, complete: 64, duplicates: 2, owner: "Administrations", risk: "Élevé" },
];

export const verificationRequests = [
  { company: "Clinique Sainte Victoire", commune: "Cotonou", submitted: "Il y a 2 j", docs: "RCCM, IFU, facture SBEE", status: "En cours" },
  { company: "Marché Central Distribution", commune: "Bohicon", submitted: "Il y a 4 j", docs: "RCCM", status: "Pièces manquantes" },
  { company: "Atacora Menuiserie", commune: "Natitingou", submitted: "Il y a 6 j", docs: "IFU, photos du local", status: "À planifier" },
  { company: "Sèmè Fresh Market", commune: "Sèmè-Podji", submitted: "Hier", docs: "RCCM, IFU", status: "En cours" },
  { company: "Garage Auto Plus", commune: "Parakou", submitted: "Aujourd'hui", docs: "IFU", status: "Nouveau" },
];

export const reports = [
  { id: "SIG-1042", target: "Pharmacie La Grâce", type: "Numéro erroné", reporter: "Utilisateur", date: "Aujourd'hui", priority: "Haute", status: "Ouvert" },
  { id: "SIG-1041", target: "Offre : Commercial terrain", type: "Offre expirée", reporter: "Utilisateur", date: "Hier", priority: "Moyenne", status: "Ouvert" },
  { id: "SIG-1039", target: "Bénin BTP Services", type: "Doublon", reporter: "Système", date: "Il y a 2 j", priority: "Basse", status: "En traitement" },
  { id: "SIG-1035", target: "Actualité : Guichet PME", type: "Information inexacte", reporter: "Institution", date: "Il y a 3 j", priority: "Haute", status: "Résolu" },
  { id: "SIG-1031", target: "Compte utilisateur #8821", type: "Spam", reporter: "Modérateur", date: "Il y a 5 j", priority: "Moyenne", status: "Résolu" },
];

export const moderationQueue = [
  { item: "Offre : Designer UI/UX", kind: "Emploi", author: "Nokoué Digital", submitted: "Il y a 1 h", status: "À valider" },
  { item: "Actualité : Promotion Data & IA", kind: "Actualité", author: "FormaTech Bénin", submitted: "Il y a 3 h", status: "À valider" },
  { item: "Avis client sur Ouidah Éco Tours", kind: "Avis", author: "Utilisateur", submitted: "Il y a 5 h", status: "Signalé" },
  { item: "Fiche : Sèmè Fresh Market", kind: "Entreprise", author: "Propriétaire", submitted: "Hier", status: "À valider" },
  { item: "Événement : Journée recrutement logistique", kind: "Événement", author: "Atlantique Logistics", submitted: "Hier", status: "Validé" },
];

export const adminUsers = [
  { name: "Pinel Lokonon", email: "pinel@lbc.bj", role: "Super admin", status: "Actif", lastSeen: "Maintenant" },
  { name: "Aïcha Gbaguidi", email: "aicha@lbc.bj", role: "Modératrice", status: "Actif", lastSeen: "Il y a 12 min" },
  { name: "Rodrigue Hounsou", email: "rodrigue@lbc.bj", role: "Vérificateur", status: "Actif", lastSeen: "Il y a 1 h" },
  { name: "Bénin BTP Services", email: "contact@beninbtp.bj", role: "Compte entreprise", status: "Actif", lastSeen: "Hier" },
  { name: "Mairie de Cotonou", email: "communication@cotonou.bj", role: "Compte institution", status: "Actif", lastSeen: "Il y a 2 j" },
  { name: "Kossi Adjovi", email: "kossi.adjovi@gmail.com", role: "Utilisateur", status: "Suspendu", lastSeen: "Il y a 9 j" },
];

export const sources = [
  { name: "Agence de Promotion des PME", type: "Institution", items: 42, fresh: "98 %", status: "Active" },
  { name: "Mairie de Cotonou", type: "Institution", items: 31, fresh: "91 %", status: "Active" },
  { name: "Portail emploi national", type: "Média", items: 128, fresh: "84 %", status: "Active" },
  { name: "Hub Éco Bénin", type: "Organisation", items: 17, fresh: "95 %", status: "Active" },
  { name: "Chambre de Commerce", type: "Institution", items: 22, fresh: "72 %", status: "À relancer" },
  { name: "Flux presse économique", type: "Média", items: 210, fresh: "61 %", status: "En pause" },
];

export const adCampaigns = [
  { name: "Bannière accueil – FormaTech", advertiser: "FormaTech Bénin", placement: "Accueil · hero", impressions: "42 300", clicks: "1 280", budget: "150 000 FCFA", status: "En cours" },
  { name: "Fiche sponsorisée – Nokoué Digital", advertiser: "Nokoué Digital", placement: "Annuaire · top", impressions: "18 900", clicks: "760", budget: "80 000 FCFA", status: "En cours" },
  { name: "Offre mise en avant – CLA", advertiser: "Caisse Locale Atlantique", placement: "Emplois · sticky", impressions: "9 400", clicks: "410", budget: "50 000 FCFA", status: "Planifiée" },
  { name: "Événement – Hub Éco", advertiser: "Hub Éco Bénin", placement: "Actualités · encart", impressions: "27 100", clicks: "930", budget: "Partenariat", status: "Terminée" },
];

export const partners = [
  { name: "Agence de Promotion des PME", type: "Institution publique", since: "2026", scope: "Données entreprises, guichet unique", status: "Actif" },
  { name: "Chambre de Commerce et d'Industrie", type: "Institution", since: "2026", scope: "Annuaire membres, événements", status: "En discussion" },
  { name: "Hub Éco Bénin", type: "Organisation", since: "2026", scope: "Événements, programmes jeunes", status: "Actif" },
  { name: "Université d'Abomey-Calavi", type: "Académique", since: "2026", scope: "Stages, alternances, insertion", status: "Actif" },
  { name: "Opérateur mobile money", type: "Entreprise", since: "2027", scope: "Paiements, visibilité PME", status: "Pipeline" },
];

export const securityEvents = [
  { time: "18:42", event: "Connexion admin réussie", actor: "pinel@lbc.bj", ip: "41.85.x.x", level: "Info" },
  { time: "17:15", event: "5 tentatives de connexion échouées", actor: "inconnu", ip: "102.164.x.x", level: "Alerte" },
  { time: "15:03", event: "Changement de rôle : Rodrigue → Vérificateur", actor: "pinel@lbc.bj", ip: "41.85.x.x", level: "Info" },
  { time: "11:20", event: "Export des données entreprises", actor: "aicha@lbc.bj", ip: "41.85.x.x", level: "Sensible" },
  { time: "09:48", event: "Clé API partenaire régénérée", actor: "système", ip: "—", level: "Info" },
];

export const impactCards = [
  { title: "Une PME gagne en visibilité", text: "Elle présente ses coordonnées, ses services et ses preuves de confiance à tout le Bénin." },
  { title: "Un jeune trouve un stage", text: "Il filtre par domaine, niveau d'études et commune, puis postule directement." },
  { title: "Un diplômé trouve un emploi", text: "L'assistant IA lui propose les opportunités qui correspondent à son profil." },
  { title: "Une institution diffuse mieux", text: "Ses informations officielles restent reliées à leur source et à jour." },
];

export const roadmapSteps = [
  { phase: "Phase 1 · MVP", period: "T4 2026", items: ["Annuaire Grand Nokoué", "Premières entreprises référencées", "Emplois & stages", "Assistant IA v1"] },
  { phase: "Phase 2 · Extension", period: "T1–T2 2027", items: ["Comptes entreprises autonomes", "Vérification renforcée", "Actualités par les acteurs", "Parakou, Bohicon, Ouidah"] },
  { phase: "Phase 3 · National", period: "S2 2027", items: ["Toutes les communes", "Publicité & partenariats", "Recommandations IA personnalisées", "API partenaires"] },
];

export const iconStrip = [BellRing, FileText];
