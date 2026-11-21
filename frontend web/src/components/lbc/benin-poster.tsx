import {
  BriefcaseBusiness,
  Building2,
  Info,
  MapPin,
  MousePointer2,
  Newspaper,
  Search,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import lbcLogoMark from "@/assets/lbc-logo-mark.png";

/**
 * Affiche « Le Bénin en un clic » : la carte du Bénin et les services LBC,
 * dessinés en vectoriel avec les couleurs exactes du site (bleu nuit, bleu, ambre).
 * Le plan de travail fait 1024 x 1536 ; tout est positionné en pourcentage,
 * les textes suivent la largeur du conteneur (unités cqw).
 */
const W = 1024;
const H = 1536;
const x = (n: number) => `${((n / W) * 100).toFixed(3)}%`;
const y = (n: number) => `${((n / H) * 100).toFixed(3)}%`;
const cq = (n: number) => `${(n / 10.24).toFixed(3)}cqw`;

const SILHOUETTE =
  "M393 1192 L389 1191 L389 1176 L384 1163 L382 1146 L374 1132 L372 1114 L361 1096 L362 1072 L370 1061 L372 1053 L371 1026 L366 1010 L371 993 L371 973 L366 960 L366 955 L367 950 L378 936 L381 925 L381 909 L379 897 L379 884 L376 870 L379 858 L381 839 L382 804 L379 795 L373 786 L371 769 L365 754 L351 738 L345 726 L344 720 L348 707 L347 688 L351 676 L353 660 L352 652 L345 642 L321 626 L314 609 L298 594 L296 586 L296 571 L292 558 L293 552 L308 534 L311 526 L312 515 L318 504 L333 493 L343 472 L358 463 L370 444 L389 444 L401 440 L413 431 L426 433 L444 443 L459 444 L492 427 L514 399 L527 388 L539 361 L542 347 L552 332 L553 323 L550 311 L552 302 L553 283 L556 281 L582 275 L592 264 L601 261 L609 255 L615 254 L629 262 L640 274 L647 296 L659 309 L669 313 L673 317 L685 337 L700 353 L707 356 L727 358 L738 364 L740 379 L735 396 L739 421 L738 434 L746 453 L759 463 L765 471 L761 484 L739 518 L735 530 L720 545 L707 570 L694 588 L671 640 L664 651 L659 674 L653 688 L657 726 L646 741 L644 757 L634 774 L629 803 L623 812 L618 826 L618 848 L612 867 L614 880 L613 894 L616 910 L616 922 L623 939 L637 952 L632 978 L634 998 L641 1011 L638 1025 L638 1037 L643 1053 L638 1069 L637 1084 L631 1097 L627 1131 L624 1133 L570 1136 L542 1142 L506 1140 L475 1150 L446 1162 L436 1171 L423 1175 L393 1192Z";

// Limites des départements (tracé simplifié, très discret)
const BORDERS = [
  "M548 340 L520 410 L470 470 L450 520 L446 590",
  "M530 445 L580 440 L630 430 L690 455 L740 505",
  "M446 515 L495 532 L535 524",
  "M535 540 L580 566 L625 586 L672 592",
  "M440 606 L495 617 L532 600 L580 562",
  "M505 625 L522 670 L514 712 L520 760",
  "M372 812 L440 826 L500 812 L545 800 L585 770",
  "M430 745 L470 775 L498 838 L520 900",
  "M470 950 L520 1000 L566 1050 L528 1100",
  "M395 1082 L460 1088 L520 1118",
  "M520 1000 L580 990 L630 1000",
];

type City = { name: string; dot: [number, number]; label: [number, number]; anchor?: "start" | "middle" };

const CITIES: City[] = [
  { name: "Malanville", dot: [676, 369], label: [676, 396], anchor: "middle" },
  { name: "Kandi", dot: [566, 482], label: [577, 477] },
  { name: "Natitingou", dot: [360, 571], label: [371, 564] },
  { name: "Parakou", dot: [514, 624], label: [529, 625] },
  { name: "Djougou", dot: [399, 692], label: [409, 685] },
  { name: "Bembèrèkè", dot: [590, 692], label: [600, 685] },
  { name: "Savalou", dot: [411, 858], label: [420, 851] },
  { name: "Savè", dot: [554, 846], label: [563, 839] },
  { name: "Abomey-Calavi", dot: [438, 1084], label: [452, 1089] },
  { name: "Porto-Novo", dot: [620, 1105], label: [635, 1112] },
];

type Service = {
  icon: LucideIcon;
  tone: "primary" | "accent";
  tile: [number, number];
  text: [number, number];
  title: string[];
  desc: string[];
};

const SERVICES: Service[] = [
  {
    icon: Building2,
    tone: "primary",
    tile: [59, 379],
    text: [59, 465],
    title: ["Annuaire des", "entreprises"],
    desc: ["Trouvez des entreprises", "fiables près de chez vous."],
  },
  {
    icon: Newspaper,
    tone: "accent",
    tile: [59, 627],
    text: [59, 714],
    title: ["Actualités", "économiques"],
    desc: ["Restez informé sur la vie", "des affaires au Bénin."],
  },
  {
    icon: Info,
    tone: "primary",
    tile: [807, 555],
    text: [808, 643],
    title: ["Informations", "pratiques"],
    desc: ["Services publics, transports,", "infos utiles au quotidien."],
  },
  {
    icon: BriefcaseBusiness,
    tone: "accent",
    tile: [808, 823],
    text: [808, 918],
    title: ["Emploi & Carrières"],
    desc: ["Trouvez des opportunités", "près de chez vous."],
  },
];

const ACTIONS: { label: string; cx: number; icon: LucideIcon }[] = [
  { label: "Recherchez", cx: 107, icon: Search },
  { label: "Découvrez", cx: 263, icon: MousePointer2 },
  { label: "Connectez-vous", cx: 428, icon: MapPin },
  { label: "Avancez", cx: 610, icon: TrendingUp },
];

export function BeninPoster({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Carte du Bénin avec les services LBonCoin : annuaire des entreprises, actualités économiques, informations pratiques, emploi et carrières"
      className={`relative w-full overflow-hidden bg-card ${className ?? ""}`}
      style={{ aspectRatio: `${W} / ${H}`, containerType: "inline-size" }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="bp-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "color-mix(in oklab, var(--primary) 78%, var(--secondary))" }} />
            <stop offset="0.6" style={{ stopColor: "var(--primary)" }} />
            <stop offset="1" style={{ stopColor: "color-mix(in oklab, var(--primary) 88%, black)" }} />
          </linearGradient>
          <linearGradient id="bp-rim-x" gradientUnits="userSpaceOnUse" x1="292" y1="0" x2="765" y2="0">
            <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
            <stop offset="0.58" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
            <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="bp-rim-y" gradientUnits="userSpaceOnUse" x1="0" y1="900" x2="0" y2="1193">
            <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
            <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 1 }} />
          </linearGradient>
          <filter id="bp-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="bp-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="22" stdDeviation="16" floodColor="#0c314c" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* cercles décoratifs */}
        <circle cx="1045" cy="-10" r="150" fill="none" strokeWidth="62" style={{ stroke: "var(--accent)", strokeOpacity: 0.16 }} />
        <circle cx="-60" cy="1190" r="240" fill="none" strokeWidth="84" style={{ stroke: "var(--accent)", strokeOpacity: 0.12 }} />

        {/* carte */}
        <path d={SILHOUETTE} fill="url(#bp-fill)" filter="url(#bp-shadow)" />
        <g fill="none" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.4" style={{ stroke: "white", strokeOpacity: 0.2 }}>
          {BORDERS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <path d={SILHOUETTE} fill="none" strokeWidth="9" stroke="url(#bp-rim-x)" filter="url(#bp-glow)" opacity="0.55" />
        <path d={SILHOUETTE} fill="none" strokeWidth="9" stroke="url(#bp-rim-y)" filter="url(#bp-glow)" opacity="0.55" />
        <path d={SILHOUETTE} fill="none" strokeWidth="3" strokeLinejoin="round" stroke="url(#bp-rim-x)" />
        <path d={SILHOUETTE} fill="none" strokeWidth="3" strokeLinejoin="round" stroke="url(#bp-rim-y)" />

        {/* villes */}
        {CITIES.map((c) => (
          <g key={c.name}>
            <circle cx={c.dot[0]} cy={c.dot[1]} r="7" style={{ fill: "var(--accent)" }} />
            <circle cx={c.dot[0]} cy={c.dot[1]} r="7" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="1.5" />
            <text
              x={c.label[0]}
              y={c.label[1]}
              textAnchor={c.anchor ?? "start"}
              fill="white"
              fontSize="19"
              fontWeight="600"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {c.name}
            </text>
          </g>
        ))}
        {/* Cotonou */}
        <circle cx="510" cy="1129" r="20" style={{ fill: "var(--accent)", fillOpacity: 0.28 }} />
        <circle cx="510" cy="1129" r="13" fill="none" strokeWidth="3" style={{ stroke: "var(--accent)" }} />
        <circle cx="510" cy="1129" r="6" fill="white" />
        <text
          x="511"
          y="1168"
          textAnchor="middle"
          fontSize="21"
          fontWeight="800"
          style={{ fontFamily: "var(--font-body)", fill: "var(--primary)" }}
        >
          Cotonou
        </text>

        {/* traits de liaison */}
        <g fill="none" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M179 418 L285 418" style={{ stroke: "var(--primary)", strokeOpacity: 0.6 }} />
          <circle cx="285" cy="418" r="4.5" style={{ fill: "var(--primary)" }} />
          <path d="M158 672 L268 672 L320 745" style={{ stroke: "var(--accent)" }} />
          <circle cx="320" cy="745" r="4.5" style={{ fill: "var(--accent)" }} />
          <path d="M790 595 L770 595 L715 720" style={{ stroke: "var(--accent)" }} />
          <circle cx="715" cy="720" r="4.5" style={{ fill: "var(--accent)" }} />
          <path d="M790 865 L770 865 L685 935" style={{ stroke: "var(--accent)" }} />
          <circle cx="685" cy="935" r="4.5" style={{ fill: "var(--accent)" }} />
        </g>
      </svg>

      {/* en-tête : logo, nom et slogan */}
      <img
        src={lbcLogoMark}
        alt=""
        className="absolute"
        style={{ left: x(66), top: y(74), height: cq(82), width: "auto" }}
      />
      <p
        className="absolute font-display font-extrabold leading-none tracking-tight"
        style={{ left: x(282), top: y(62), fontSize: cq(96) }}
      >
        <span className="text-primary">LBon</span>
        <span className="text-accent">Coin</span>
      </p>
      <p className="absolute text-muted-foreground" style={{ left: x(286), top: y(158), fontSize: cq(31) }}>
        Tout le Bénin en un clic
      </p>
      <span className="absolute rounded-full bg-accent" style={{ left: x(49), top: y(222), width: cq(72), height: cq(4) }} />

      {/* services */}
      {SERVICES.map((s) => (
        <div key={s.title.join(" ")}>
          <div
            className={`absolute flex items-center justify-center shadow-md ${
              s.tone === "primary" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
            }`}
            style={{ left: x(s.tile[0]), top: y(s.tile[1]), width: cq(78), height: cq(78), borderRadius: cq(18) }}
          >
            <s.icon strokeWidth={1.7} style={{ width: cq(40), height: cq(40) }} />
          </div>
          <div className="absolute" style={{ left: x(s.text[0]), top: y(s.text[1]), width: cq(280) }}>
            <p className="font-display font-extrabold text-primary" style={{ fontSize: cq(22), lineHeight: cq(25) }}>
              {s.title.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <p className="text-muted-foreground" style={{ marginTop: cq(14), fontSize: cq(16), lineHeight: cq(23) }}>
              {s.desc.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      ))}

      {/* bas de page : parcours en quatre actions */}
      {[191, 342, 529].map((lx) => (
        <span key={lx} className="absolute bg-border" style={{ left: x(lx), top: y(1375), width: 1, height: cq(54) }} />
      ))}
      {ACTIONS.map((a) => (
        <div
          key={a.label}
          className="absolute flex flex-col items-center text-primary"
          style={{ left: x(a.cx - 80), top: y(1362), width: cq(160) }}
        >
          <a.icon strokeWidth={1.6} style={{ width: cq(30), height: cq(30) }} />
          <span className="font-medium" style={{ marginTop: cq(10), fontSize: cq(18) }}>
            {a.label}
          </span>
        </div>
      ))}

      <p
        className="absolute font-semibold uppercase text-primary"
        style={{ left: x(813), top: y(1316), fontSize: cq(17), lineHeight: cq(28), letterSpacing: "0.28em" }}
      >
        Le Bénin
        <br />
        plus proche
        <br />
        de vous
      </p>
      <span className="absolute rounded-full bg-accent" style={{ left: x(813), top: y(1411), width: cq(50), height: cq(4) }} />
    </div>
  );
}
