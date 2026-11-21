import { useRouterState } from "@tanstack/react-router";
import { MousePointerClick } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Page de chargement (splash) de LBonCoin, affichee une seule fois a
 * l'ouverture du site sur la page d'accueil. Elle recouvre tout le site
 * puis disparait.
 */
let splashPlayed = false;

const SHOW_MS = 2800;
const FADE_MS = 2100;

function MagnifierC() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-[1.12em] w-[1.12em] shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="42" cy="42" r="33" stroke="currentColor" strokeWidth="9" />
      <path
        d="M52.3 29.7 A16 16 0 1 0 52.3 54.3"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path d="M67 67 L91 91" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
    </svg>
  );
}

function Skyline() {
  const cut = "#0c314c";
  return (
    <svg
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMax slice"
      className="lbc-splash-skyline absolute inset-x-0 bottom-0 h-[30vh] min-h-[170px] w-full"
      aria-hidden="true"
    >
      <g fill="#ffffff" fillOpacity="0.14">
        {/* batiments bas a gauche */}
        <rect x="0" y="238" width="62" height="62" />
        <rect x="62" y="212" width="50" height="88" />
        <rect x="112" y="252" width="44" height="48" />
        {/* tour a fleche */}
        <rect x="177" y="150" width="46" height="150" />
        <rect x="170" y="138" width="60" height="16" />
        <rect x="197" y="96" width="6" height="44" />
        {/* monument a etoile */}
        <rect x="296" y="205" width="248" height="95" />
        <rect x="286" y="190" width="268" height="18" />
        <rect x="376" y="176" width="88" height="16" />
        <polygon points="420,138 426,156 444,156 430,166 435,184 420,174 405,184 410,166 396,156 414,156" />
        <rect x="270" y="236" width="30" height="64" />
        <rect x="540" y="236" width="30" height="64" />
        {/* statue */}
        <rect x="636" y="268" width="62" height="32" />
        <path d="M650 268 L647 218 Q649 192 662 182 L658 160 Q667 150 679 158 L685 172 L703 158 L709 172 L691 202 L693 268 Z" />
        <circle cx="668" cy="146" r="11" />
        {/* tour haute */}
        <polygon points="782,300 782,128 802,114 842,126 842,300" />
        <rect x="824" y="58" width="5" height="68" />
        {/* mosquee */}
        <rect x="940" y="218" width="224" height="82" />
        <path d="M1004 218 A46 46 0 0 1 1100 218 Z" />
        <rect x="1021" y="206" width="62" height="14" />
        <rect x="1050" y="152" width="4" height="22" />
        <rect x="948" y="162" width="18" height="60" />
        <path d="M946 164 A11 11 0 0 1 968 164 Z" />
        <rect x="1138" y="162" width="18" height="60" />
        <path d="M1136 164 A11 11 0 0 1 1158 164 Z" />
        {/* batiments bas a droite */}
        <rect x="1200" y="236" width="72" height="64" />
        <rect x="1272" y="206" width="52" height="94" />
        <rect x="1324" y="250" width="58" height="50" />
        <rect x="1382" y="226" width="58" height="74" />
      </g>
      {/* ouvertures */}
      <g fill={cut} fillOpacity="0.55">
        <rect x="334" y="232" width="16" height="68" />
        <rect x="372" y="232" width="16" height="68" />
        <rect x="452" y="232" width="16" height="68" />
        <rect x="490" y="232" width="16" height="68" />
        <rect x="408" y="236" width="24" height="64" />
        <rect x="954" y="248" width="14" height="52" rx="7" />
        <rect x="988" y="248" width="14" height="52" rx="7" />
        <rect x="1030" y="248" width="14" height="52" rx="7" />
        <rect x="1058" y="248" width="14" height="52" rx="7" />
        <rect x="1098" y="248" width="14" height="52" rx="7" />
        <rect x="1130" y="248" width="14" height="52" rx="7" />
      </g>
    </svg>
  );
}

export function SplashScreen() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [phase, setPhase] = useState<"loading" | "ready" | "hide" | "gone">(() =>
    splashPlayed || pathname !== "/" ? "gone" : "loading",
  );

  const gone = phase === "gone";

  // Bloque le défilement tant que le splash est affiché
  useEffect(() => {
    if (gone) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [gone]);

  // Chargement, puis attente du clic, puis fondu de sortie
  useEffect(() => {
    if (phase === "loading") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const timer = window.setTimeout(() => setPhase("ready"), reduce ? 1000 : SHOW_MS);
      return () => window.clearTimeout(timer);
    }
    if (phase === "hide") {
      const timer = window.setTimeout(() => {
        splashPlayed = true;
        setPhase("gone");
      }, FADE_MS);
      return () => window.clearTimeout(timer);
    }
  }, [phase]);

  const proceed = () => setPhase((current) => (current === "ready" ? "hide" : current));

  // Entrée ou espace au clavier pour continuer
  useEffect(() => {
    if (phase !== "ready") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        proceed();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      className={`lbc-splash fixed inset-0 z-[100] overflow-hidden text-white ${
        phase === "ready" ? "cursor-pointer" : ""
      }`}
      data-phase={phase}
      onClick={proceed}
      role={phase === "ready" ? "button" : "status"}
      tabIndex={phase === "ready" ? 0 : -1}
      aria-live="polite"
      aria-label={phase === "ready" ? "Cliquez pour continuer vers LBonCoin" : "Chargement de LBonCoin"}
    >
      {/* Rideau : deux pans qui s'ouvrent au clic */}
      <div className="lbc-splash-curtain lbc-splash-curtain-left" aria-hidden="true" />
      <div className="lbc-splash-curtain lbc-splash-curtain-right" aria-hidden="true" />

      <div className="lbc-splash-content absolute inset-0 flex flex-col items-center justify-center px-6 pb-[22vh] pt-8">
        <div className="relative z-10 flex flex-col items-center text-center font-sans">
          <div className="lbc-splash-logo flex items-center gap-[0.1em] text-[clamp(3rem,8vw,6rem)] font-semibold leading-none">
            <span className="tracking-tight">LB</span>
            <MagnifierC />
          </div>
          <p className="lbc-splash-word mt-4 text-[clamp(2.1rem,5.4vw,4rem)] font-bold leading-none tracking-tight">
            LBonCoin
          </p>
          <p className="lbc-splash-tagline mt-3 text-[clamp(0.95rem,1.7vw,1.3rem)] font-medium text-white/85">
            {"Tout le Bénin en un clic"}
          </p>
        </div>

        <div className="relative z-10 mt-10 flex min-h-[7.5rem] flex-col items-center justify-start">
          {phase === "loading" ? (
            <div className="lbc-splash-loading flex flex-col items-center gap-3">
              <span
                className="lbc-splash-spinner size-9 rounded-full border-[3px] border-white/20 border-t-white"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold tracking-wide text-white/80">
                Chargement
                <span className="lbc-splash-dots" aria-hidden="true" />
              </span>
            </div>
          ) : (
            <div className="lbc-splash-prompt flex flex-col items-center gap-3">
              <span className="lbc-splash-tap flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/5">
                <MousePointerClick className="size-5" aria-hidden="true" />
              </span>
              <span className="text-center text-sm font-medium tracking-wide text-white/75">
                Cliquez n'importe où pour continuer
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="lbc-splash-content">
        <Skyline />
      </div>
    </div>
  );
}
