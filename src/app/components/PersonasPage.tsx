import { useState } from "react";
import {
  Search, ShoppingBag, Tag, Gift, Star, Clock, Smartphone,
  Laptop, MessageCircle, Heart, AlertCircle, Target, Zap, BookOpen,
  ChevronDown, ChevronUp, ArrowRight,
} from "lucide-react";

const PERSONAS = [
  {
    id: "lea",
    name: "Léa",
    age: 28,
    role: "La Future Maman Anxieuse",
    tagline: "« Je veux tout prévoir, mais je ne sais pas par où commencer… »",
    accent: "#E07A5F",
    accentDark: "#C4614A",
    accentBg: "#F5F2ED",
    emoji: "🤰",
    photo: "https://images.unsplash.com/photo-1750008560383-dde947f3d16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    situation: "Enceinte de 6 mois, premier enfant. En congé maternité dans 6 semaines. Vit à Lyon avec son conjoint. Enseignante.",
    device: "📱 Mobile (87% du temps)",
    frequency: "Tous les 2–3 jours",
    budget: "700 – 1 500 €",
    goals: [
      "Constituer sa liste de naissance",
      "Trouver une poussette polyvalente",
      "Lire des guides pour ne rien oublier",
      "Être rassurée sur la sécurité des produits",
    ],
    frustrations: [
      "Trop de choix → paralysie décisionnelle",
      "Jargon technique incompréhensible",
      "Peur d'acheter « le mauvais » produit",
      "Manque de conseils personnalisés",
    ],
    journey: [
      { step: "Découverte", detail: "Instagram / Blog grossesse" },
      { step: "Recherche", detail: "Guides & comparatifs" },
      { step: "Validation", detail: "Avis clients + forums" },
      { step: "Achat", detail: "Liste de naissance" },
    ],
    quote: "J'ai passé 3h sur le site hier soir à lire les guides poussette. C'est rassurant d'avoir autant d'infos.",
    kpis: ["Taux de lecture des guides", "Conversions liste de naissance", "Temps passé sur fiches produit"],
    color: "yellow",
  },
  {
    id: "thomas",
    name: "Thomas",
    age: 34,
    role: "Le Papa Comparateur",
    tagline: "« Je veux le meilleur crash-test au meilleur prix. Point. »",
    accent: "#2C2C2C",
    accentDark: "#2C2C2C",
    accentBg: "#f1f5f9",
    emoji: "🔍",
    photo: "https://images.unsplash.com/photo-1586011876158-197fd32f15e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    situation: "Second enfant à venir. Ingénieur logiciel. Fait tous ses achats en ligne après une analyse minutieuse. Vit à Paris.",
    device: "💻 Desktop (70% du temps)",
    frequency: "Sessions longues, 1–2 fois/semaine",
    budget: "Illimité si justifié",
    goals: [
      "Comparer les specs techniques en détail",
      "Vérifier les résultats aux crash-tests",
      "Trouver le meilleur rapport qualité/prix",
      "Éviter les achats inutiles",
    ],
    frustrations: [
      "Fiches produit trop marketing, pas assez techniques",
      "Absence de tableau comparatif",
      "Avis non vérifiés / biaisés",
      "Délais de livraison flous",
    ],
    journey: [
      { step: "Déclencheur", detail: "Google « meilleur siège auto 2026 »" },
      { step: "Comparaison", detail: "3–4 sites en parallèle" },
      { step: "Deep-dive", detail: "Fiche technique + YouTube" },
      { step: "Achat", detail: "Décision finale en 10 min" },
    ],
    quote: "Si le poids, les dimensions pliées et le homologation i-Size ne sont pas sur la fiche, je passe.",
    kpis: ["Profondeur de navigation", "Taux de rebond fiche produit", "Usage du filtre technique"],
    color: "navy",
  },
  {
    id: "michele",
    name: "Michèle",
    age: 58,
    role: "La Mamie Gâteau",
    tagline: "« Je veux faire un beau cadeau, mais je ne sais pas ce dont ils ont besoin. »",
    accent: "#db2777",
    accentDark: "#9d174d",
    accentBg: "#fdf2f8",
    emoji: "🎁",
    photo: "https://images.unsplash.com/photo-1587556930799-8dca6fad6d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    situation: "Retraitée, premier petit-enfant. Peu à l'aise avec les achats en ligne. Préfère appeler mais essaie de s'adapter.",
    device: "📱 Tablette (chez elle) + téléphone SAV",
    frequency: "Occasions : Noël, naissance, anniversaire",
    budget: "100 – 300 €",
    goals: [
      "Trouver un cadeau qui fera vraiment plaisir",
      "Commander facilement la liste de naissance",
      "Être guidée sans se sentir perdue",
      "Avoir la livraison en point relais ou à domicile",
    ],
    frustrations: [
      "Navigation complexe, trop de clics",
      "Peur de commander « le mauvais produit »",
      "Formulaire de paiement anxiogène",
      "Retours difficiles à gérer seule",
    ],
    journey: [
      { step: "Déclencheur", detail: "Lien liste de naissance reçu par SMS" },
      { step: "Visite", detail: "Fiche produit guidée" },
      { step: "Hésitation", detail: "Appelle le SAV pour valider" },
      { step: "Achat", detail: "CB + livraison à domicile" },
    ],
    quote: "J'ai appelé le numéro, la dame a été très gentille et m'a aidée à passer ma commande. Parfait !",
    kpis: ["Conversions liste de naissance externe", "Volume appels SAV", "Taux abandon panier étape paiement"],
    color: "pink",
  },
  {
    id: "sarah",
    name: "Sarah",
    age: 31,
    role: "La Maman Experte",
    tagline: "« Je sais exactement ce que je veux. Montre-moi juste le meilleur prix. »",
    accent: "#059669",
    accentDark: "#065f46",
    accentBg: "#ecfdf5",
    emoji: "⚡",
    photo: "https://images.unsplash.com/photo-1580451299338-3658f5b11930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    situation: "2 enfants (3 ans et 8 mois). Infirmière en mi-temps. Connaît toutes les marques par cœur. Chasseuse de bons plans.",
    device: "📱 Mobile (notifications push activées)",
    frequency: "Plusieurs fois par semaine",
    budget: "Flexible — cherche toujours des promos",
    goals: [
      "Accéder directement aux bons plans & outlet",
      "Profiter des ventes flash avant tout le monde",
      "Fidéliser ses points de réduction",
    ],
    frustrations: [
      "Promo expirée avant d'avoir pu en profiter",
      "Stock insuffisant sur les outlets",
      "Pas d'alerte de restockage produit",
      "Programme fidélité peu visible",
    ],
    journey: [
      { step: "Déclencheur", detail: "Newsletter / Notif push promo" },
      { step: "Vérification", detail: "Outlet + bons plans" },
      { step: "Décision", detail: "< 5 minutes" },
      { step: "Achat", detail: "1-click + retrait en magasin" },
    ],
    quote: "J'ai eu la poussette à -35% grâce à la newsletter. J'avais même pas besoin d'une deuxième, mais à ce prix…",
    kpis: ["Taux d'ouverture newsletter", "Conversions outlet", "Récurrence d'achat"],
    color: "green",
  },
];

const colorMap = {
  yellow: { ring: "ring-[#E07A5F]", badge: "bg-[#E07A5F] text-white", dot: "bg-[#E07A5F]" },
  navy:   { ring: "ring-[#2C2C2C]", badge: "bg-[#2C2C2C] text-white",     dot: "bg-[#2C2C2C]" },
  pink:   { ring: "ring-pink-400",  badge: "bg-pink-500 text-white",       dot: "bg-pink-400" },
  green:  { ring: "ring-emerald-500", badge: "bg-emerald-600 text-white",  dot: "bg-emerald-500" },
};

function JourneyStep({ step, detail, index, accent }: { step: string; detail: string; index: number; accent: string }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
        style={{ backgroundColor: accent, color: "white" }}
      >
        {index + 1}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-800">{step}</p>
        <p className="text-[11px] text-gray-500">{detail}</p>
      </div>
    </div>
  );
}

function PersonaCard({ persona }: { persona: typeof PERSONAS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const colors = colorMap[persona.color as keyof typeof colorMap];

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">

      {/* Header photo + identity */}
      <div className="relative h-52 overflow-hidden">
        <img src={persona.photo} alt={persona.name} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />

        {/* Emoji badge */}
        <div
          className="absolute top-4 right-4 text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: persona.accent, color: "white" }}
        >
          {persona.emoji}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p
            className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-1"
            style={{ backgroundColor: persona.accent, color: "white" }}
          >
            {persona.role}
          </p>
          <h2 className="text-white text-xl" style={{ fontWeight: 900 }}>
            {persona.name}, {persona.age} ans
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">

        {/* Tagline */}
        <p
          className="text-sm italic mb-4 pb-4 border-b border-gray-100"
          style={{ color: persona.accentDark }}
        >
          {persona.tagline}
        </p>

        {/* Situation */}
        <p className="text-[12px] text-gray-600 leading-relaxed mb-4">{persona.situation}</p>

        {/* Quick stats */}
        <div
          className="grid grid-cols-3 gap-2 rounded-xl p-3 mb-4"
          style={{ backgroundColor: persona.accentBg }}
        >
          <div className="text-center">
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Appareil</p>
            <p className="text-[10px] font-semibold text-gray-800 mt-0.5 leading-tight">{persona.device}</p>
          </div>
          <div className="text-center border-x border-gray-200">
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Visite</p>
            <p className="text-[10px] font-semibold text-gray-800 mt-0.5 leading-tight">{persona.frequency}</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Budget</p>
            <p className="text-[10px] font-semibold text-gray-800 mt-0.5 leading-tight">{persona.budget}</p>
          </div>
        </div>

        {/* Goals & Frustrations */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-2">
              <Target size={10} /> Objectifs
            </p>
            <ul className="space-y-1">
              {persona.goals.map((g) => (
                <li key={g} className="flex items-start gap-1.5 text-[11px] text-gray-700">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: persona.accent }} />
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-2">
              <AlertCircle size={10} /> Frustrations
            </p>
            <ul className="space-y-1">
              {persona.frustrations.map((f) => (
                <li key={f} className="flex items-start gap-1.5 text-[11px] text-gray-700">
                  <span className="mt-1 text-red-400 flex-shrink-0">✗</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Toggle expand */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 mt-4 py-3 rounded-xl text-[13px] font-bold transition-all duration-200 shadow-sm"
          style={{
            backgroundColor: persona.accent,
            color: "white",
          }}
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {expanded ? "Masquer les détails" : "👉 Voir le parcours & verbatim"}
        </button>

        {/* Expandable: Journey + Quote + KPIs */}
        {expanded && (
          <div className="pt-4 space-y-5 border-t border-gray-100">

            {/* Customer journey */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1">
                <ArrowRight size={10} /> Parcours type
              </p>
              <div className="space-y-3">
                {persona.journey.map((j, i) => (
                  <JourneyStep key={j.step} step={j.step} detail={j.detail} index={i} accent={persona.accent} />
                ))}
              </div>
            </div>

            {/* Quote */}
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: persona.accentBg, borderLeft: `3px solid ${persona.accent}` }}
            >
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                <MessageCircle size={10} /> Verbatim
              </p>
              <p className="text-[12px] text-gray-700 italic leading-relaxed">"{persona.quote}"</p>
            </div>

            {/* KPIs */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                <Zap size={10} /> KPIs à suivre
              </p>
              <div className="flex flex-wrap gap-1.5">
                {persona.kpis.map((k) => (
                  <span
                    key={k}
                    className="text-[10px] px-2 py-1 rounded-full border"
                    style={{ borderColor: persona.accent, color: persona.accentDark, backgroundColor: persona.accentBg }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PersonasPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-[#2C2C2C] py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span
            className="inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: "#E07A5F", color: "white" }}
          >
            UX Research · Allobébé
          </span>
          <h1 className="text-white mb-3" style={{ fontSize: "2rem", fontWeight: 900, lineHeight: 1.1 }}>
            Les 4 personas<br />
            <span style={{ color: "#E07A5F" }}>visiteurs du site</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Ces profils ont été construits pour mieux comprendre les besoins, les motivations et les points de friction
            des différents types d'utilisateurs du site Allobébé.
          </p>

          {/* Légende rapide */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {PERSONAS.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: p.accent, color: "white" }}
              >
                {p.emoji} {p.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Grille personas */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PERSONAS.map((persona) => (
            <div key={persona.id} id={persona.id}>
              <PersonaCard persona={persona} />
            </div>
          ))}
        </div>

        {/* Matrice synthèse */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-gray-900 text-sm" style={{ fontWeight: 800 }}>
              Matrice de synthèse
            </h2>
            <p className="text-gray-500 text-[11px] mt-0.5">Comparaison rapide des 4 personas</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-gray-500 font-bold text-[10px] uppercase tracking-wide w-32">Critère</th>
                  {PERSONAS.map((p) => (
                    <th key={p.id} className="px-4 py-3 text-center">
                      <span
                        className="inline-block px-2 py-1 rounded-full text-[10px] font-black"
                        style={{ backgroundColor: p.accent, color: "white" }}
                      >
                        {p.emoji} {p.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Aisance digitale", values: ["⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐", "⭐⭐⭐⭐⭐"] },
                  { label: "Sensibilité prix", values: ["Moyenne", "Haute", "Faible", "Très haute"] },
                  { label: "Besoin conseil", values: ["Très élevé", "Faible", "Très élevé", "Nul"] },
                  { label: "Fréquence visite", values: ["Hebdo", "Ponctuelle", "Occasionnelle", "Plurihebdo"] },
                  { label: "Canal prioritaire", values: ["Mobile", "Desktop", "SAV / Tel", "App / Notif"] },
                  { label: "Décision", values: ["Lente (semaines)", "Lente (jours)", "Lente + aidée", "Rapide (minutes)"] },
                ].map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}>
                    <td className="px-4 py-3 font-semibold text-gray-600 text-[11px]">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="px-4 py-3 text-center text-gray-700">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-[11px] mt-6">
          Ces personas sont des représentations fictives basées sur des archétypes comportementaux communs dans la puériculture en ligne.
        </p>
      </div>
    </div>
  );
}