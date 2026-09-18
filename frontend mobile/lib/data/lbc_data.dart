import 'package:flutter/material.dart';
import 'models.dart';

class LbcModule {
  final String title;
  final String description;
  final IconData icon;
  final String signal;
  final int tabIndex;
  const LbcModule({
    required this.title,
    required this.description,
    required this.icon,
    required this.signal,
    required this.tabIndex,
  });
}

const lbcModules = [
  LbcModule(
    title: "Entreprises",
    description:
        "Recherche par nom, secteur ou commune. Fiches complètes et vérifiées.",
    icon: Icons.apartment_rounded,
    signal: "1 240 fiches",
    tabIndex: 1,
  ),
  LbcModule(
    title: "Emplois & stages",
    description:
        "Offres d'emploi, stages, alternances, recrutements et appels à candidatures.",
    icon: Icons.work_outline_rounded,
    signal: "86 opportunités",
    tabIndex: 2,
  ),
  LbcModule(
    title: "Actualités",
    description:
        "Le fil économique, professionnel et local, publié par les acteurs eux-mêmes.",
    icon: Icons.newspaper_rounded,
    signal: "32 sources",
    tabIndex: 3,
  ),
  LbcModule(
    title: "Infos pratiques",
    description:
        "Administrations, démarches et services utiles au quotidien au Bénin.",
    icon: Icons.account_balance_rounded,
    signal: "58 repères",
    tabIndex: 4,
  ),
];

const sectors = [
  {
    "name": "BTP & construction",
    "count": 418,
    "communes": "Cotonou, Abomey-Calavi, Porto-Novo"
  },
  {
    "name": "Santé & pharmacie",
    "count": 263,
    "communes": "Cotonou, Parakou, Bohicon"
  },
  {
    "name": "Agroalimentaire",
    "count": 198,
    "communes": "Abomey, Natitingou, Lokossa"
  },
  {
    "name": "Éducation & formation",
    "count": 174,
    "communes": "Cotonou, Ouidah, Djougou"
  },
  {
    "name": "Transport & logistique",
    "count": 151,
    "communes": "Cotonou, Sèmè-Podji, Allada"
  },
  {"name": "Numérique & IT", "count": 96, "communes": "Cotonou, Abomey-Calavi"},
  {
    "name": "Commerce & distribution",
    "count": 233,
    "communes": "Cotonou, Porto-Novo, Parakou"
  },
  {"name": "Finance & assurance", "count": 74, "communes": "Cotonou, Porto-Novo"},
];

const communes = [
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

const companies = <Company>[
  Company(
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
    services: [
      "Gros œuvre",
      "Rénovation",
      "Études techniques",
      "Suivi de chantier",
      "Voirie"
    ],
    founded: "2014",
    size: "50–100 employés",
    rating: 4.7,
    reviews: 128,
  ),
  Company(
    slug: "clinique-sainte-victoire",
    name: "Clinique Sainte Victoire",
    sector: "Santé & pharmacie",
    commune: "Cotonou",
    address: "Cadjèhoun, Rue 1245",
    phone: "+229 01 61 20 30 40",
    email: "accueil@saintevictoire.bj",
    hours: "24h/24 · 7j/7",
    status: "À vérifier",
    description:
        "Consultations générales, analyses médicales, maternité et orientation vers les spécialistes.",
    services: ["Consultations", "Laboratoire", "Maternité", "Urgences"],
    founded: "2009",
    size: "20–50 employés",
    rating: 4.3,
    reviews: 64,
  ),
  Company(
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
    description:
        "Transformation locale de produits agricoles, circuits courts et distribution vers les marchés urbains.",
    services: ["Transformation", "Conditionnement", "Distribution", "Export régional"],
    founded: "2017",
    size: "10–20 employés",
    rating: 4.5,
    reviews: 41,
  ),
  Company(
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
    description:
        "Centre de formation aux métiers du numérique, bureautique, développement web et reconversion professionnelle.",
    services: ["Développement web", "Bureautique", "Data & IA", "Certifications"],
    founded: "2019",
    size: "10–20 employés",
    rating: 4.8,
    reviews: 212,
  ),
  Company(
    slug: "atlantique-logistics",
    name: "Atlantique Logistics",
    sector: "Transport & logistique",
    commune: "Sèmè-Podji",
    address: "Route Inter-États, PK 12",
    phone: "+229 01 64 30 21 90",
    email: "ops@atlantiquelogistics.bj",
    hours: "Lun–Sam · 7h–20h",
    status: "Vérifiée",
    description:
        "Transit, entreposage et transport routier depuis le Port de Cotonou vers l'hinterland (Niger, Burkina, Mali).",
    services: ["Transit", "Entreposage", "Transport routier", "Dédouanement"],
    founded: "2011",
    size: "100–250 employés",
    rating: 4.4,
    reviews: 87,
  ),
  Company(
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
    description:
        "Agence digitale : sites web, applications mobiles, paiement mobile money et marketing digital pour PME.",
    services: [
      "Sites web",
      "Applications mobiles",
      "Intégration Mobile Money",
      "SEO & publicité"
    ],
    founded: "2020",
    size: "10–20 employés",
    rating: 4.9,
    reviews: 58,
  ),
  Company(
    slug: "pharmacie-la-grace",
    name: "Pharmacie La Grâce",
    sector: "Santé & pharmacie",
    commune: "Parakou",
    address: "Quartier Zongo, face au marché Arzèkè",
    phone: "+229 01 66 10 55 23",
    email: "pharmacie.lagrace@gmail.com",
    hours: "Lun–Dim · 7h–22h",
    status: "Vérifiée",
    description:
        "Officine de garde, produits pharmaceutiques, parapharmacie et conseils santé.",
    services: ["Médicaments", "Parapharmacie", "Garde de nuit", "Livraison"],
    founded: "2005",
    size: "5–10 employés",
    rating: 4.6,
    reviews: 93,
  ),
  Company(
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
    description:
        "Institution de microfinance dédiée au financement des PME, artisans et commerçants.",
    services: ["Microcrédit", "Épargne", "Financement PME", "Mobile banking"],
    founded: "2002",
    size: "50–100 employés",
    rating: 4.2,
    reviews: 156,
  ),
  Company(
    slug: "marche-central-distribution",
    name: "Marché Central Distribution",
    sector: "Commerce & distribution",
    commune: "Bohicon",
    address: "Quartier Sodohomè",
    phone: "+229 01 68 41 09 76",
    email: "mcd.bohicon@gmail.com",
    hours: "Lun–Sam · 7h–19h",
    status: "À vérifier",
    description:
        "Grossiste en produits de grande consommation pour les commerçants du Zou et des Collines.",
    services: ["Vente en gros", "Livraison", "Produits alimentaires", "Boissons"],
    founded: "2015",
    size: "10–20 employés",
    rating: 4.0,
    reviews: 27,
  ),
  Company(
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
    description:
        "Agence de tourisme responsable : circuits culturels, route de l'esclave, plages et écolodges.",
    services: ["Circuits culturels", "Écotourisme", "Hébergement", "Guides certifiés"],
    founded: "2018",
    size: "5–10 employés",
    rating: 4.8,
    reviews: 310,
  ),
  Company(
    slug: "atacora-menuiserie",
    name: "Atacora Menuiserie",
    sector: "BTP & construction",
    commune: "Natitingou",
    address: "Quartier Yimporima",
    phone: "+229 01 60 88 34 51",
    email: "atacora.menuiserie@gmail.com",
    hours: "Lun–Sam · 7h30–18h",
    status: "À vérifier",
    description:
        "Menuiserie bois et aluminium, mobilier sur mesure et aménagement intérieur.",
    services: ["Menuiserie bois", "Aluminium", "Mobilier", "Aménagement"],
    founded: "2012",
    size: "5–10 employés",
    rating: 4.4,
    reviews: 19,
  ),
  Company(
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
    description:
        "Établissement privé d'enseignement supérieur : gestion, agronomie et informatique appliquée.",
    services: ["Licences", "Masters", "Formation continue", "Incubateur"],
    founded: "2008",
    size: "20–50 employés",
    rating: 4.3,
    reviews: 72,
  ),
];

List<Company> get featuredCompanies =>
    companies.where((c) => c.status == "Vérifiée").take(4).toList();

const opportunities = <Opportunity>[
  Opportunity(
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
    summary:
        "Accompagnez le conducteur de travaux sur nos chantiers résidentiels du Grand Nokoué.",
    missions: [
      "Suivi quotidien des chantiers",
      "Contrôle des approvisionnements",
      "Rédaction des rapports d'avancement",
      "Relation avec les sous-traitants"
    ],
    profile: [
      "Formation génie civil ou BTP",
      "Rigueur et sens de l'organisation",
      "Maîtrise d'AutoCAD appréciée"
    ],
    howToApply:
        "Envoyez CV et lettre de motivation à recrutement@beninbtp.bj en précisant la référence LBC-STG-01.",
  ),
  Opportunity(
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
    missions: [
      "Prospection commerciale",
      "Analyse des dossiers de crédit",
      "Suivi du portefeuille",
      "Reporting hebdomadaire"
    ],
    profile: [
      "Bac+3 banque, finance ou commerce",
      "2 ans d'expérience minimum",
      "Bon relationnel et sens du terrain"
    ],
    howToApply:
        "Candidature en ligne via le formulaire du site cla.bj/carrieres ou dépôt physique à l'agence de Ganhi.",
  ),
  Opportunity(
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
    missions: [
      "Développement d'interfaces React",
      "Intégration des maquettes",
      "Tests et documentation"
    ],
    profile: [
      "Bases solides en HTML/CSS/JavaScript",
      "Curiosité pour React et TypeScript",
      "Esprit d'équipe"
    ],
    howToApply: "Postulez sur formatech.bj/alternance avec un lien vers vos projets (GitHub, portfolio).",
  ),
  Opportunity(
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
    summary:
        "Accompagnement, mentorat et financement d'amorçage pour 20 projets portés par des jeunes de 18 à 35 ans.",
    missions: [
      "Bootcamp de 2 semaines",
      "Mentorat individuel",
      "Accès au financement d'amorçage"
    ],
    profile: ["Être âgé de 18 à 35 ans", "Projet à impact local", "Résider au Bénin"],
    howToApply: "Dossier de candidature à déposer sur esd.bj/incubateur avant la date limite.",
  ),
  Opportunity(
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
    missions: [
      "Diagnostic mécanique",
      "Planification de la maintenance préventive",
      "Gestion du stock de pièces"
    ],
    profile: [
      "Étudiant en génie mécanique ou maintenance industrielle",
      "Connaissance des moteurs diesel",
      "Disponibilité immédiate"
    ],
    howToApply: "Envoyez votre CV à rh@atlantiquelogistics.bj avec l'objet « Stage mécanique ».",
  ),
  Opportunity(
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
    profile: [
      "Diplôme d'État infirmier",
      "Expérience en maternité appréciée",
      "Disponibilité pour les gardes"
    ],
    howToApply:
        "Dépôt de dossier physique au secrétariat de la clinique, Cadjèhoun, du lundi au vendredi.",
  ),
  Opportunity(
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
  ),
  Opportunity(
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
    missions: [
      "Recherche utilisateur",
      "Maquettes Figma",
      "Design system",
      "Collaboration avec les développeurs"
    ],
    profile: ["Portfolio solide", "Maîtrise de Figma", "Sens du détail"],
    howToApply: "Envoyez portfolio et CV à jobs@nokouedigital.bj.",
  ),
];

const opportunityTypes = [
  "Emploi",
  "Stage",
  "Alternance",
  "Recrutement",
  "Appel à candidatures"
];
const studyLevels = ["Sans diplôme", "Bac", "Bac+2", "Bac+3", "Bac+5", "Diplôme d'État"];

const newsFeed = <NewsItem>[
  NewsItem(
    slug: "guichet-accompagnement-pme",
    source: "Agence de Promotion des PME",
    sourceType: "Institution",
    title: "Nouveau guichet d'accompagnement pour les petites entreprises",
    category: "Économie",
    date: "17 sept. 2026",
    time: "Il y a 2 h",
    summary:
        "Un programme de suivi simplifié cible les entreprises locales en phase de formalisation.",
    body: [
      "L'Agence de Promotion des PME annonce l'ouverture d'un guichet unique dédié aux très petites entreprises en cours de formalisation. Le dispositif regroupe l'immatriculation, l'accompagnement fiscal et l'accès aux premiers financements.",
      "Les entrepreneurs de Cotonou, Abomey-Calavi et Porto-Novo pourront bénéficier d'un suivi personnalisé pendant douze mois. Une extension vers Parakou et Bohicon est prévue au premier trimestre 2027.",
      "Les inscriptions se font en ligne ou directement dans les antennes départementales.",
    ],
  ),
  NewsItem(
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
  ),
  NewsItem(
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
  ),
  NewsItem(
    slug: "rencontre-digitalisation-pme",
    source: "Hub Éco Bénin",
    sourceType: "Événement",
    title: "Rencontre locale autour de la digitalisation des PME",
    category: "Événement",
    date: "15 sept. 2026",
    time: "Cette semaine",
    summary:
        "Entreprises, institutions et jeunes talents échangent sur la visibilité numérique au Bénin.",
    body: [
      "Le Hub Éco Bénin organise le 26 septembre une matinée d'échanges sur la présence en ligne des PME : référencement, paiement mobile et gestion de la réputation.",
      "Les entreprises référencées sur LBC bénéficient d'une entrée gratuite sur inscription.",
    ],
  ),
  NewsItem(
    slug: "formatech-nouvelle-promotion-data",
    source: "FormaTech Bénin",
    sourceType: "Entreprise",
    title: "FormaTech ouvre une promotion Data & IA à Porto-Novo",
    category: "Formation",
    date: "14 sept. 2026",
    time: "Il y a 3 jours",
    summary:
        "Trente places en formation intensive de six mois, avec stage garanti en entreprise partenaire.",
    body: [
      "Le centre de formation lance sa première promotion consacrée à l'analyse de données et à l'intelligence artificielle appliquée aux métiers de la gestion.",
      "Les candidatures sont ouvertes jusqu'au 5 octobre. Des bourses partielles sont réservées aux jeunes femmes.",
    ],
  ),
  NewsItem(
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
  ),
  NewsItem(
    slug: "mobile-money-commercants",
    source: "Caisse Locale Atlantique",
    sourceType: "Acteur économique",
    title: "Paiement mobile : une offre dédiée aux petits commerçants",
    category: "Économie",
    date: "12 sept. 2026",
    time: "Il y a 5 jours",
    summary:
        "Frais réduits et micro-crédit instantané pour les commerçants des marchés de Cotonou.",
    body: [
      "La Caisse Locale Atlantique déploie une solution d'encaissement mobile money sans abonnement pour les commerçants de Dantokpa et de Ganhi.",
      "L'offre inclut un micro-crédit de trésorerie accessible en 24 heures après trois mois d'activité.",
    ],
  ),
];

const newsCategories = ["Toutes", "Économie", "Emploi", "Pratique", "Événement", "Formation", "Local"];

const practicalInfos = <PracticalInfo>[
  PracticalInfo(
    slug: "creer-une-entreprise",
    title: "Créer une entreprise",
    category: "Formalités",
    owner: "APIEx / Guichet unique",
    action: "Consulter les étapes",
    status: "Lien officiel",
    description:
        "Immatriculation au RCCM, obtention de l'IFU et déclaration d'existence en une seule démarche.",
    steps: [
      "Choisir la forme juridique",
      "Préparer pièce d'identité et justificatif de domicile",
      "Déposer le dossier au guichet unique ou en ligne",
      "Récupérer le RCCM et l'IFU sous 24 à 72h"
    ],
    officialUrl: "https://monentreprise.bj",
  ),
  PracticalInfo(
    slug: "documents-identite",
    title: "Documents d'identité",
    category: "Administration",
    owner: "ANIP",
    action: "Voir les conditions",
    status: "Disponible",
    description:
        "Carte d'identité biométrique, certificat d'identification personnelle (CIP) et passeport.",
    steps: [
      "Vérifier son inscription au RAVIP",
      "Prendre rendez-vous en ligne",
      "Se présenter avec l'acte de naissance",
      "Retirer le document sous 15 jours"
    ],
    officialUrl: "https://anip.bj",
  ),
  PracticalInfo(
    slug: "impots-declarations",
    title: "Impôts et déclarations",
    category: "Fiscalité",
    owner: "Direction Générale des Impôts",
    action: "Accéder au portail",
    status: "Lien officiel",
    description: "Déclaration et paiement en ligne de la TPS, de l'IS et des retenues à la source.",
    steps: [
      "Créer un compte e-services avec son IFU",
      "Sélectionner l'impôt à déclarer",
      "Payer par mobile money ou virement"
    ],
    officialUrl: "https://impots.bj",
  ),
  PracticalInfo(
    slug: "marches-publics",
    title: "Marchés publics",
    category: "Opportunités",
    owner: "ARMP / DNCMP",
    action: "Suivre les avis",
    status: "En validation",
    description: "Avis d'appels d'offres, résultats et calendrier des passations.",
    steps: [
      "S'inscrire sur le portail des marchés publics",
      "Consulter les avis par secteur",
      "Télécharger les dossiers d'appel d'offres"
    ],
    officialUrl: "https://marches-publics.bj",
  ),
  PracticalInfo(
    slug: "administrations-par-commune",
    title: "Administrations par commune",
    category: "Service public",
    owner: "Communes et services déconcentrés",
    action: "Trouver une adresse",
    status: "Disponible",
    description:
        "Mairies, arrondissements, commissariats, centres de santé et services des impôts près de chez vous.",
    steps: ["Choisir la commune", "Filtrer par type de service", "Consulter horaires et contacts"],
  ),
  PracticalInfo(
    slug: "permis-de-conduire",
    title: "Permis de conduire",
    category: "Transport",
    owner: "ANaTT",
    action: "Voir la procédure",
    status: "Lien officiel",
    description: "Inscription à l'examen, duplicata et conversion de permis étranger.",
    steps: [
      "S'inscrire dans une auto-école agréée",
      "Passer le code et la conduite",
      "Retirer le permis biométrique"
    ],
    officialUrl: "https://anatt.bj",
  ),
  PracticalInfo(
    slug: "cnss-immatriculation",
    title: "Sécurité sociale (CNSS)",
    category: "Emploi",
    owner: "CNSS Bénin",
    action: "Immatriculer un salarié",
    status: "Lien officiel",
    description: "Immatriculation employeur, déclaration des salariés et cotisations en ligne.",
    steps: [
      "Créer un compte employeur",
      "Déclarer chaque salarié",
      "Payer les cotisations mensuelles"
    ],
    officialUrl: "https://cnss.bj",
  ),
  PracticalInfo(
    slug: "numeros-utiles",
    title: "Numéros d'urgence et utiles",
    category: "Urgences",
    owner: "Services publics",
    action: "Voir les numéros",
    status: "Disponible",
    description: "Police, pompiers, SAMU, SBEE, SONEB et lignes d'assistance.",
    steps: [
      "Police secours : 117",
      "Sapeurs-pompiers : 118",
      "SAMU : 112",
      "Dépannage SBEE : 7373"
    ],
  ),
];

const practicalCategories = [
  "Toutes",
  "Formalités",
  "Administration",
  "Fiscalité",
  "Opportunités",
  "Service public",
  "Transport",
  "Emploi",
  "Urgences"
];

const administrations = <Administration>[
  Administration(
    name: "Mairie de Cotonou",
    commune: "Cotonou",
    domain: "État civil, urbanisme",
    phone: "+229 01 21 31 20 60",
    hours: "Lun–Ven · 8h–17h30",
  ),
  Administration(
    name: "Mairie d'Abomey-Calavi",
    commune: "Abomey-Calavi",
    domain: "État civil, foncier",
    phone: "+229 01 21 36 01 22",
    hours: "Lun–Ven · 8h–17h30",
  ),
  Administration(
    name: "Préfecture de l'Ouémé",
    commune: "Porto-Novo",
    domain: "Légalisation, autorisations",
    phone: "+229 01 20 21 22 40",
    hours: "Lun–Ven · 8h–17h",
  ),
  Administration(
    name: "Centre des Impôts de Parakou",
    commune: "Parakou",
    domain: "Fiscalité",
    phone: "+229 01 23 61 04 18",
    hours: "Lun–Ven · 8h–16h30",
  ),
  Administration(
    name: "Tribunal de commerce de Cotonou",
    commune: "Cotonou",
    domain: "RCCM, litiges commerciaux",
    phone: "+229 01 21 31 51 72",
    hours: "Lun–Ven · 8h–17h",
  ),
  Administration(
    name: "Agence ANIP Bohicon",
    commune: "Bohicon",
    domain: "Identité, CIP",
    phone: "+229 01 22 51 03 90",
    hours: "Lun–Ven · 8h–16h",
  ),
];

const assistantExamples = [
  "Trouve-moi les entreprises de BTP à Abomey-Calavi.",
  "Je cherche un stage en génie mécanique à Cotonou.",
  "Quelles démarches pour créer une entreprise au Bénin ?",
  "Quelles sont les actualités emploi cette semaine ?",
];

const impactCards = [
  {
    "title": "Une PME gagne en visibilité",
    "text": "Elle présente ses coordonnées, ses services et ses preuves de confiance à tout le Bénin."
  },
  {
    "title": "Un jeune trouve un stage",
    "text": "Il filtre par domaine, niveau d'études et commune, puis postule directement."
  },
  {
    "title": "Un diplômé trouve un emploi",
    "text": "L'assistant IA lui propose les opportunités qui correspondent à son profil."
  },
  {
    "title": "Une institution diffuse mieux",
    "text": "Ses informations officielles restent reliées à leur source et à jour."
  },
];
