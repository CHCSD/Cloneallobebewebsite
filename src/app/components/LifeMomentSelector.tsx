import { useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  Bed,
  Backpack,
  Car,
  Baby,
  Puzzle,
  UtensilsCrossed,
  Footprints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  id: string;
  Icon: LucideIcon;
  label: string;
  sublabel: string;
  phase: "grossesse" | "naissance" | "bebe";
  titre: string;
  description: string;
  cta: string;
  ctaHref: string;
  tags: string[];
};

const STEPS: Step[] = [
  { id: "g6",        Icon: Bed,             label: "6 mois",    sublabel: "grossesse", phase: "grossesse", titre: "Le nid se prépare",      description: "Lit, matelas certifié, table à langer… Stokke et Cybex ont tout prévu.",            cta: "Chambre & Sommeil",     ctaHref: "#",           tags: ["Stokke Sleepi", "Lit Maxi-Cosi"] },
  { id: "g7",        Icon: Backpack,        label: "7 mois",    sublabel: "grossesse", phase: "grossesse", titre: "Valise & liste",          description: "Préparez votre valise de maternité et finalisez votre liste de naissance.",           cta: "Créer ma liste",        ctaHref: "/future-maman#liste",           tags: ["Valise Chicco", "Kit maternité"] },
  { id: "g8",        Icon: Car,             label: "8 mois",    sublabel: "grossesse", phase: "grossesse", titre: "Sécurité & Mobilité",     description: "Choisissez votre trio poussette et siège-auto. Cybex, Bébé Confort, Maxi-Cosi.",       cta: "Voir les poussettes",   ctaHref: "/poussettes", tags: ["Cybex Priam", "Maxi-Cosi Jade"] },
  { id: "naissance", Icon: Baby,            label: "Naissance", sublabel: "",          phase: "naissance", titre: "Bienvenue, bébé !",       description: "Couffin, body, stérilisateur, tire-lait… tout l'essentiel pour accueillir bébé.",     cta: "L'essentiel naissance", ctaHref: "#",           tags: ["Couffin Bébé Confort", "Kit Tommee Tippee"] },
  { id: "b3",        Icon: Puzzle,          label: "3 mois",    sublabel: "bébé",      phase: "bebe",      titre: "L'éveil commence",        description: "Tapis d'éveil, arche, hochets et bouncers pour stimuler sa curiosité.",               cta: "Jouets d'éveil",        ctaHref: "#",           tags: ["Tapis Fisher-Price", "Arche Tiny Love"] },
  { id: "b6",        Icon: UtensilsCrossed, label: "6 mois",    sublabel: "bébé",      phase: "bebe",      titre: "Diversification",         description: "Chaise haute, robot cuiseur, vaisselle adaptée : Béaba et Stokke sont là.",           cta: "Alimentation",          ctaHref: "#",           tags: ["Stokke Tripp Trapp", "Robot Béaba"] },
  { id: "b12",       Icon: Footprints,      label: "1 an",      sublabel: "bébé",      phase: "bebe",      titre: "Les premiers pas !",      description: "Draisienne, trotteur, porteur… et des chaussures pour soutenir ses premiers pas.",    cta: "Mobilité",              ctaHref: "#",           tags: ["Draisienne Puky", "Porteur Janod"] },
];

const PHASE_COLOR: Record<Step["phase"], string> = {
  grossesse: "#87A878",
  naissance: "#2D3A2A",
  bebe:      "#5A7A52",
};

const PHASE_LIGHT: Record<Step["phase"], string> = {
  grossesse: "#EEF4EC",
  naissance: "#E8EDE7",
  bebe:      "#EBF2E9",
};

export function LifeMomentSelector() {
  const scrollRef    = useRef<HTMLDivElement>(null);
  const naissanceRef = useRef<HTMLDivElement>(null);
  const isDragging   = useRef(false);
  const startX       = useRef(0);
  const scrollLeft   = useRef(0);

  // Centre sur Naissance au chargement
  useEffect(() => {
    const c = scrollRef.current;
    const n = naissanceRef.current;
    if (c && n) {
      const offset = n.offsetLeft - c.clientWidth / 2 + n.offsetWidth / 2;
      c.scrollLeft = offset;
    }
  }, []);

  // Molette souris → scroll horizontal
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY + e.deltaX;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Drag souris
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current     = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x    = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  return (
    <section className="bg-white py-6 md:py-8 border-t border-gray-100">
      <div className="w-full px-2 sm:px-4 mb-6">
        <h2 className="text-gray-900 mb-2 text-2xl font-bold">
          Votre moment de vie
        </h2>
        <p className="text-gray-500 text-sm">Découvrez notre sélection adaptée à l'âge de votre enfant.</p>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-4 pb-6"
        style={{
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "max(1rem, calc((100vw - 80rem) / 2 + 1rem))",
          paddingRight: "1rem",
          cursor: "grab",
          userSelect: "none",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {STEPS.map((step) => {
          const { Icon } = step;
          const accent = PHASE_COLOR[step.phase];
          const light  = PHASE_LIGHT[step.phase];

          return (
            <div
              key={step.id}
              ref={step.phase === "naissance" ? naissanceRef : undefined}
              className="flex-shrink-0 bg-white rounded-2xl border border-gray-100 flex flex-col hover:border-gray-300 transition-colors hover:shadow-sm"
              style={{
                width: "280px",
                scrollSnapAlign: "center",
              }}
            >
              <div className="p-5 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex items-center justify-center rounded-full w-10 h-10"
                    style={{ backgroundColor: light }}
                  >
                    <Icon size={20} strokeWidth={1.5} color={accent} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {step.sublabel ? `${step.label} · ${step.sublabel}` : step.label}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                  {step.titre}
                </h3>
                
                <p className="text-sm text-gray-500 mb-5 flex-1 leading-relaxed">
                  {step.description}
                </p>

                <div className="flex gap-2 flex-wrap mb-5">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2.5 py-1 rounded-full text-gray-600 border border-gray-100"
                      style={{ backgroundColor: "#F9FAFC" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={step.ctaHref}
                  className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors group border"
                  style={{
                    backgroundColor: "white",
                    borderColor: "transparent",
                    color: accent,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = light;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  {step.cta}
                  <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          );
        })}
        {/* Spacer final */}
        <div style={{ flexShrink: 0, width: "1px" }} />
      </div>

      <style>{`
        section .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}