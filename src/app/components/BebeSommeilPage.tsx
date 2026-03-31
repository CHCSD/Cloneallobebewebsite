import { useState } from "react";
import { Link } from "react-router";
import {
  ChevronRight, Clock, Calendar, Heart, Moon, Star,
  CheckCircle2, ChevronDown, ChevronUp, AlertCircle,
  BookOpen, ShoppingBag, Lightbulb,
  Trophy, ArrowRight
} from "lucide-react";

// ─── Produits sélection ─────────────────────────────────────────────────────
const produits = [
  {
    id: "p1",
    name: "Veilleuse nomade lumière rouge",
    brand: "ZAZU",
    benefit: "Ne bloque pas la mélatonine — idéale pour les tétées nocturnes.",
    price: 34.9,
    originalPrice: 42.9,
    rating: 4.7,
    reviews: 98,
    badge: "Best-seller",
    image: "https://images.unsplash.com/photo-1481728236344-b5c828da9edf?w=400&q=80",
  },
  {
    id: "p2",
    name: "Gigoteuse d'emmaillotage TOG 2.5",
    brand: "BABYBJÖRN",
    benefit: "Apaise le réflexe de Moro et rappelle le cocon in-utero.",
    price: 44.9,
    originalPrice: 54.9,
    rating: 4.8,
    reviews: 214,
    badge: "Top avis",
    image: "https://images.unsplash.com/photo-1765353225650-2280f21cb79e?w=400&q=80",
  },
  {
    id: "p3",
    name: "Machine à bruits blancs HushBaby",
    brand: "TOMMEE TIPPEE",
    benefit: "Isole des bruits ambiants. 15 sons naturels dont la pluie et le ventre maternel.",
    price: 27.9,
    rating: 4.5,
    reviews: 156,
    badge: null,
    image: "https://images.unsplash.com/photo-1649327700042-36a5f0a82c1f?w=400&q=80",
  },
  {
    id: "p4",
    name: "Doudou sensoriel Lapin",
    brand: "NATTOU",
    benefit: "Aide à l'auto-apaisement lors des micro-réveils nocturnes.",
    price: 19.9,
    originalPrice: 24.9,
    rating: 4.6,
    reviews: 72,
    badge: null,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
  }
];

// ─── Causes par tranche d'âge ───────────────────────────────────────────────
const causesParAge = [
  {
    age: "0 – 3 mois",
    emoji: "🌱",
    causes: [
      "Cycles de sommeil courts (45 min) — physiologiques",
      "Faim fréquente : estomac minuscule, tétées toutes les 2-3 h",
      "Réflexe de Moro (sursauts) qui réveille",
      "Confusion jour/nuit : le rythme circadien n'est pas encore installé",
      "Coliques et gaz (pic entre 2 et 6 semaines)",
    ],
    tip: "À cet âge, l'objectif n'est pas de « faire ses nuits » mais de trouver le calme entre deux cycles.",
  },
  {
    age: "3 – 6 mois",
    emoji: "🌸",
    causes: [
      "4ème leap — régression du sommeil très fréquente vers 4 mois",
      "Poussées de croissance qui augmentent la faim",
      "Début des dents (bavage, gencives rouges)",
      "Éveil cognitif massif : trop de stimulation dans la journée",
    ],
    tip: "C'est le bon moment pour introduire une routine du soir et travailler la sieste.",
  },
  {
    age: "6 – 12 mois",
    emoji: "☀️",
    causes: [
      "Angoisse de séparation : bébé comprend que vous pouvez partir",
      "Diversification alimentaire qui perturbe le transit",
      "Dentition intensive (incisives, molaires)",
      "Régressions autour des grands apprentissages moteurs (ramper, debout)",
    ],
    tip: "Les associations d'endormissement (sein, bras) deviennent parfois problématiques — c'est le bon moment pour les travailler.",
  },
  {
    age: "12 mois et +",
    emoji: "🌟",
    causes: [
      "Résistance au coucher liée à l'autonomie naissante",
      "Peur du noir et premières angoisses",
      "Transition du lit à barreaux au lit toddler",
      "Suppression progressive des siestes (vers 18 mois–3 ans)",
    ],
    tip: "La cohérence et la constance sont vos meilleures armes. Un rituel de 20 min, toujours dans le même ordre.",
  },
];

// ─── Méthodes d'endormissement ───────────────────────────────────────────────
const methodes = [
  {
    id: "gentle",
    nom: "La méthode douce",
    sous: "Accompagnement progressif",
    emoji: "🤗",
    pour: "Pour : faible tolérance aux pleurs. Efficace dès 4–6 mois.",
    desc: "Vous restez présent(e) mais réduisez votre intervention chaque soir. Progressivement, bébé apprend à s'endormir sans aide directe. Résultats en 2–4 semaines.",
    etapes: [
      "Installez bébé éveillé mais calme dans son lit",
      "Restez dans la pièce, posez la main sur son ventre",
      "Retirez la main une fois qu'il s'apaise, mais restez visible",
      "Chaque soir, éloignez-vous un peu plus vers la porte",
    ],
    avis: "⭐ Plébiscitée par 78 % des parents qui l'ont adoptée.",
    highlight: true,
  },
  {
    id: "fading",
    nom: "Le fading",
    sous: "Extinction graduelle",
    emoji: "📉",
    pour: "Pour : bébés qui s'endorment uniquement au sein ou au biberon.",
    desc: "Réduisez progressivement la durée de tétée ou de biberon du soir (1 min de moins par nuit). Bébé apprend à s'endormir sans la tétée complète.",
    etapes: [
      "Notez le temps habituel de tétée (ex. 15 min)",
      "Réduisez de 1–2 min chaque soir",
      "Après la tétée raccourcie, posez bébé éveillé",
      "Accompagnez avec des « chut chut » et la main sur le ventre",
    ],
    avis: "Idéal en combinaison avec la méthode douce.",
    highlight: false,
  },
  {
    id: "ferber",
    nom: "La méthode Ferber",
    sous: "Pauses progressives",
    emoji: "⏱️",
    pour: "Pour : familles qui peuvent tolérer quelques pleurs. Dès 6 mois.",
    desc: "Vous couchez bébé éveillé, sortez et revenez après des intervalles définis (3 min, puis 5, puis 10...). Vous le rassurez sans le prendre. Efficace en 5–7 jours.",
    etapes: [
      "Couchez bébé éveillé, dites bonsoir et sortez",
      "Revenez après 3 min si il pleure (pas avant)",
      "Rassurez 2 min sans prendre dans les bras",
      "Allongez l'intervalle à 5, puis 10, puis 15 min",
    ],
    avis: "Résultats rapides mais nécessite une cohérence absolue des deux parents.",
    highlight: false,
  },
];

// ─── Routine par tranche ─────────────────────────────────────────────────────
const routineSteps = [
  { heure: "H-30 min", icon: "🛁", label: "Bain tiède (37°C)", desc: "La chute de température corporelle après le bain favorise la somnolence." },
  { heure: "H-20 min", icon: "👶", label: "Change & pyjama", desc: "Gestes lents, voix douce. C'est déjà le début du rituel." },
  { heure: "H-15 min", icon: "🍼", label: "Tétée ou biberon", desc: "Gardez bébé éveillé pour ne pas créer une association sein/sommeil." },
  { heure: "H-10 min", icon: "📖", label: "Lecture d'une histoire", desc: "Même livre chaque soir si possible — la répétition rassure." },
  { heure: "H-5 min", icon: "🎵", label: "Berceuse & obscurité", desc: "Tamisez la lumière. Câlin final puis posez bébé éveillé." },
  { heure: "H", icon: "🌙", label: "Au lit, éveillé mais calme", desc: "Dites bonsoir et sortez avec confiance. La confiance est contagieuse." },
];

// ─── FAQ ────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "À quel âge bébé peut-il « faire ses nuits » ?",
    a: "La plupart des bébés peuvent dormir 5 à 6 heures d'affilée entre 3 et 6 mois, mais cela varie énormément. « Faire ses nuits » (8 h sans réveil) arrive généralement entre 6 et 12 mois pour 70 % des bébés.",
  },
  {
    q: "Faut-il laisser pleurer bébé pour qu'il apprenne à dormir ?",
    a: "Non, il n'est pas nécessaire de laisser bébé pleurer seul et longtemps. Les méthodes douces permettent un apprentissage progressif du sommeil autonome, sans pleurs excessifs.",
  },
  {
    q: "Que faire lors d'une régression du sommeil ?",
    a: "Une régression dure en général 2 à 6 semaines. Maintenez votre routine, soyez rassurant·e sans revenir en arrière sur les acquisitions faites. Augmentez les câlins dans la journée.",
  },
];

// ─── Composants annexes ─────────────────────────────────────────────────────
function ProduitCard({ p }: { p: typeof produits[0] }) {
  const [wished, setWished] = useState(false);
  
  return (
    <Link to="#" className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
      <div className="relative aspect-square overflow-hidden bg-white p-4 flex items-center justify-center">
        {p.badge && (
          <span className="absolute top-3 left-3 z-10 text-[10px] font-bold px-2 py-1 rounded bg-[#87A878] text-white">
            {p.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setWished(!wished); }}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={16} className={wished ? "fill-red-400 text-red-400" : "text-gray-400"} />
        </button>
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 lg:p-5 flex flex-col flex-1 border-t border-gray-50">
        <p className="text-xs font-semibold text-gray-500 mb-1">{p.brand}</p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 group-hover:text-[#87A878] transition-colors line-clamp-2">
          {p.name}
        </h3>
        <p className="text-xs text-gray-500 mb-3 flex-1 line-clamp-2">{p.benefit}</p>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={12}
                className={s <= Math.round(p.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({p.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-lg font-bold text-gray-900">{p.price.toFixed(2)} €</span>
          {p.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{p.originalPrice.toFixed(2)} €</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-gray-100">
      {faqs.map((faq, i) => (
        <div key={i} className="py-1">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 py-4 text-left group"
          >
            <span className="text-gray-900 text-base font-semibold group-hover:text-[#87A878] transition-colors">{faq.q}</span>
            {open === i
              ? <ChevronUp size={20} className="flex-shrink-0 mt-0.5 text-[#87A878]" />
              : <ChevronDown size={20} className="flex-shrink-0 mt-0.5 text-gray-400 group-hover:text-[#87A878] transition-colors" />
            }
          </button>
          {open === i && (
            <p className="text-gray-600 text-sm leading-relaxed pb-4 animate-in fade-in slide-in-from-top-1">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Page principale ─────────────────────────────────────────────────────────
export function BebeSommeilPage() {
  const [activeAge, setActiveAge] = useState(0);
  const [activeMethode, setActiveMethode] = useState(0);

  return (
    <div className="bg-white min-h-screen">

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="w-full px-4 py-3 flex items-center gap-2 text-xs font-medium text-gray-500 flex-wrap">
          <Link to="/home" className="hover:text-[#5A7A52] transition-colors">Accueil</Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="hover:text-[#5A7A52] transition-colors cursor-pointer">Conseils & Guides</span>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-gray-900 font-semibold">Bébé ne dort pas</span>
        </div>
      </div>

      {/* ── Hero Banner (Aligned with HomePage) ── */}
      <div className="relative w-full overflow-hidden h-[400px] md:h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1761891918775-c7d4a77605c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlcGluZyUyMGJhYnklMjBuZXV0cmFsfGVufDF8fHx8MTc3Mzc1MzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Bébé qui dort paisiblement"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 items-start w-full mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#87A878]/20 border border-[#87A878]/50 text-[#87A878] text-xs font-bold px-3 py-1 rounded-full mb-4">
            <Moon size={12} /> Sommeil & Bien-être
          </div>
          <h1
            className="text-white mb-4 drop-shadow-lg text-4xl md:text-5xl lg:text-6xl"
            style={{ fontWeight: 800, lineHeight: 1.1, fontFamily: "'Nunito', sans-serif" }}
          >
            Bébé ne dort pas ?
          </h1>
          <p className="text-gray-100 text-sm md:text-lg mb-8 max-w-md drop-shadow-md">
            Causes par âge, méthodes douces, sélection produits — le guide complet pour retrouver des nuits sereines.
          </p>
          <div className="flex items-center gap-4 text-white/90 text-xs md:text-sm font-medium">
            <span className="flex items-center gap-1.5"><Clock size={16} /> 8 min de lecture</span>
            <span className="flex items-center gap-1.5"><Calendar size={16} /> Mis à jour mars 2026</span>
          </div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="w-full px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ── Colonne de Gauche : Contenu ── */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Intro */}
            <div className="bg-[#F0F4EE] border border-[#87A878]/20 rounded-2xl p-6 md:p-8 flex gap-4 items-start shadow-sm">
              <AlertCircle size={24} className="flex-shrink-0 text-[#87A878]" />
              <div>
                <p className="text-lg font-bold text-gray-900 mb-2">Vous n'êtes pas seul·e.</p>
                <p className="text-gray-700 leading-relaxed">
                  Les troubles du sommeil sont la première préoccupation des parents. En France, <strong>1 bébé sur 3</strong> présente des difficultés d'endormissement ou des réveils nocturnes fréquents. Ce guide vous donne les clés pour comprendre, agir et retrouver le repos mérité en respectant le rythme de votre enfant.
                </p>
              </div>
            </div>

            {/* Causes par âge */}
            <section id="causes" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-2 text-[#87A878]">
                <Clock size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Développement</span>
              </div>
              <h2 className="text-gray-900 text-2xl md:text-3xl font-bold mb-6">
                Les causes par âge
              </h2>
              
              <p className="text-gray-600 mb-6">
                Chaque tranche d'âge a ses propres challenges. Sélectionnez celle de votre bébé pour comprendre ce qu'il traverse.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {causesParAge.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveAge(i)}
                    className={`flex-shrink-0 px-4 py-2 border rounded text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeAge === i 
                        ? "border-[#87A878] bg-[#F0F4EE] text-[#5A7A52]" 
                        : "border-gray-300 text-gray-700 hover:border-[#87A878] hover:text-[#5A7A52] hover:bg-[#F0F4EE]"
                    }`}
                  >
                    <span>{c.emoji}</span> {c.age}
                  </button>
                ))}
              </div>

              {(() => {
                const c = causesParAge[activeAge];
                return (
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden animate-in fade-in duration-300">
                    <div className="p-6 border-b border-gray-100 bg-[#F8FAF8]">
                      <h3 className="text-gray-900 font-bold text-xl mb-1">{c.emoji} Ce qui se passe entre {c.age}</h3>
                      <p className="text-gray-500 text-sm">Les facteurs physiologiques et cognitifs fréquents</p>
                    </div>
                    <div className="p-6 md:p-8 bg-white">
                      <ul className="space-y-4 mb-8">
                        {c.causes.map((cause, j) => (
                          <li key={j} className="flex items-start gap-3 text-gray-700">
                            <CheckCircle2 size={20} className="flex-shrink-0 text-[#87A878] mt-0.5" />
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="rounded-xl px-5 py-4 text-sm text-[#5A7A52] bg-[#F0F4EE] flex gap-3 items-start border border-[#87A878]/20">
                        <Lightbulb size={20} className="flex-shrink-0 mt-0.5 text-[#87A878]" />
                        <p><strong className="font-bold text-gray-900">Notre conseil : </strong>{c.tip}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </section>

            {/* Routine du soir */}
            <section id="routine" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-2 text-[#87A878]">
                <Moon size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Le rituel</span>
              </div>
              <h2 className="text-gray-900 text-2xl md:text-3xl font-bold mb-6">
                La routine parfaite en 30 min
              </h2>
              <p className="text-gray-600 mb-8">
                Un rituel répété, toujours dans le même ordre, envoie à bébé le signal que le dodo arrive. Voici le déroulé idéal.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {routineSteps.map((step, i) => (
                  <div key={i} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4">
                     <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-4 border-white shadow-sm ${
                        i === routineSteps.length - 1 ? "bg-[#87A878] text-white" : "bg-[#F0F4EE] text-gray-700"
                      }`}>
                        {step.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded uppercase bg-gray-100 text-gray-500">
                            {step.heure}
                          </span>
                          <h3 className="text-gray-900 text-sm font-bold">{step.label}</h3>
                        </div>
                        <p className="text-gray-500 text-sm leading-snug">{step.desc}</p>
                      </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Méthodes */}
            <section id="methodes" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-2 text-[#87A878]">
                <Star size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Solutions</span>
              </div>
              <h2 className="text-gray-900 text-2xl md:text-3xl font-bold mb-6">
                Les méthodes d'endormissement
              </h2>
              <p className="text-gray-600 mb-8">
                Il n'existe pas de méthode universelle. Choisissez celle qui correspond à votre philosophie parentale.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {methodes.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveMethode(i)}
                    className={`flex-shrink-0 px-4 py-2 border rounded text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeMethode === i
                        ? "border-[#87A878] bg-[#F0F4EE] text-[#5A7A52]"
                        : "border-gray-300 text-gray-700 hover:border-[#87A878] hover:text-[#5A7A52] hover:bg-[#F0F4EE]"
                    }`}
                  >
                    <span>{m.emoji}</span> {m.nom}
                  </button>
                ))}
              </div>

              {(() => {
                const m = methodes[activeMethode];
                return (
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-300">
                    <div className="p-6 border-b border-gray-100 bg-[#F8FAF8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900 text-xl">{m.nom}</h3>
                          {m.highlight && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#87A878] text-white uppercase tracking-wider">
                              Recommandée
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-[#87A878]">{m.sous}</p>
                      </div>
                      <div className="text-xs font-semibold px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-700 self-start sm:self-auto">
                        {m.pour}
                      </div>
                    </div>
                    <div className="p-6 md:p-8 bg-white">
                      <p className="text-gray-700 text-base leading-relaxed mb-8">{m.desc}</p>
                      
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-6">
                        <h4 className="text-gray-900 text-sm font-bold uppercase tracking-widest mb-4">Plan d'action</h4>
                        <ol className="space-y-4">
                          {m.etapes.map((e, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-white border border-gray-300 shadow-sm mt-0.5">
                                {i + 1}
                              </span>
                              <span>{e}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-orange-50/50 px-5 py-4 rounded-xl border border-orange-100">
                        <Trophy size={18} className="text-orange-400 flex-shrink-0" />
                        {m.avis}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </section>
          </div>

          {/* ── Colonne de Droite : Sidebar collante ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            
            {/* Encart Conseil Expert (Personal Shopper) */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#87A878]/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-[#87A878]/20 transition-colors duration-700" />
              <div className="relative z-10">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#87A878] mb-3 px-2 py-1 rounded bg-[#F0F4EE]">
                  Service Gratuit
                </span>
                <h3 className="text-gray-900 text-xl font-bold leading-tight mb-3">
                  Besoin d'aide pour équiper la chambre ? 🌙
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Prenez rendez-vous avec un Personal Shopper Allobébé pour choisir le meilleur équipement sommeil selon votre budget et vos envies.
                </p>
                <Link
                  to="/future-maman"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded text-sm font-semibold bg-gray-900 hover:bg-[#87A878] text-white transition-colors duration-200"
                >
                  Prendre RDV
                </Link>
                <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                  Sans engagement · En magasin ou visio
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Section Produits (Aligné style FeaturedProducts de l'accueil) ── */}
      <section className="py-12 md:py-20 bg-[#F8FAF8] border-t border-gray-100">
        <div className="w-full px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#87A878]">
                <ShoppingBag size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Sélection d'experts</span>
              </div>
              <h2 className="text-gray-900 text-2xl md:text-3xl font-bold">
                L'essentiel pour de douces nuits
              </h2>
            </div>
            <Link to="/home" className="flex items-center gap-1.5 text-sm font-semibold text-[#5A7A52] hover:text-[#3f5739] transition-colors group">
              Voir tout le rayon 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {produits.map((p) => <ProduitCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* ── Section FAQ & Pour aller plus loin ── */}
      <section className="py-12 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 space-y-16">
          <div id="faq">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Questions fréquentes</h2>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
              <FAQ />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6 justify-center text-[#87A878]">
              <BookOpen size={20} />
              <h2 className="text-xl font-bold text-gray-900">Pour aller plus loin</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { tag: "Cycle", title: "Comprendre les cycles de sommeil", desc: "Pourquoi bébé se réveille toutes les 45 min." },
                { tag: "Santé", title: "Règles HAS du dodo sécurisé", desc: "Les recommandations officielles pour la sécurité." },
              ].map((g) => (
                <Link
                  key={g.title}
                  to="#"
                  className="group flex flex-col p-6 rounded-2xl border border-gray-100 bg-white hover:border-[#87A878]/50 hover:shadow-md transition-all duration-300"
                >
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-50 text-gray-600 self-start mb-3 group-hover:bg-[#F0F4EE] group-hover:text-[#5A7A52] transition-colors uppercase tracking-wider">
                    {g.tag}
                  </span>
                  <p className="text-gray-900 text-base font-semibold mb-2 group-hover:text-[#5A7A52] transition-colors">{g.title}</p>
                  <p className="text-gray-500 text-sm leading-snug">{g.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center p-6 bg-gray-50 border border-gray-100 rounded-xl">
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
              📌 Ce guide est rédigé par l'équipe conseil d'Allobébé. Il ne remplace pas l'avis d'un professionnel de santé. En cas de doute prolongé sur le sommeil de votre bébé, consultez votre pédiatre.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
