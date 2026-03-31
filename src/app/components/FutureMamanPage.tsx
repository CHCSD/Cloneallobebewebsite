import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Gift, Heart, CheckCircle2, Circle, BookOpen, Star, ChevronDown, ChevronUp, UserPlus } from "lucide-react";

// ─── Liste de naissance — univers ────────────────────────────────────────────
const listeUnivers = [
  {
    id: "chambre",
    emoji: "🛏️",
    label: "La Chambre",
    title: "Mobilier & Déco",
    color: "#E8F4FD",
    accent: "#4A90D9",
    categories: [
      {
        name: "Mobilier et Accessoires",
        items: [
          "Lit de bébé",
          "Matelas pour lit de bébé",
          "Commode(s)",
          "Berceau / Moïse",
          "Table à langer",
          "Matelas à langer",
          "Fauteuil d'allaitement",
          "Pouf",
          "Coffre à jouets",
          "Bibliothèque",
        ],
      },
      {
        name: "Linge de maison",
        items: [
          "2-6 Draps housses pour lit de bébé",
          "2-3 Protège-matelas",
          "2-6 Draps pour berceau",
          "1-2 Couvertures pour lit de bébé",
          "1-2 Draps pour parc",
          "2-4 Housses de matelas à langer",
        ],
      },
      {
        name: "Décoration",
        items: [
          "Mobile",
          "Veilleuse",
          "Lampe",
          "Tapis",
          "Décoration murale",
          "Paniers / Organisateurs",
          "Panier à linge",
          "Cadres photo",
        ],
      },
    ],
  },
  {
    id: "mouvement",
    emoji: "🚗",
    label: "En Mouvement",
    title: "Sorties & Voyage",
    color: "#FEF3E2",
    accent: "#E8921A",
    categories: [
      {
        name: "Sièges auto",
        items: [
          "Siège auto nourrisson",
          "Base supplémentaire pour siège auto",
          "Siège auto évolutif / convertible",
          "Cocon pour siège auto",
          "Sac de transport pour siège auto",
          "Tapis de protection pour siège",
          "Protège-sangles",
          "Cale-tête / Support de tête",
          "Pare-soleil pour voiture",
          "Miroir de surveillance arrière",
        ],
      },
      {
        name: "Poussette & Portage",
        items: [
          "Poussette standard",
          "Chancelière pour poussette",
          "Sac à langer",
          "Porte-bébé / Écharpe de portage",
        ],
      },
      {
        name: "Voyage",
        items: [
          "Lit de voyage / Parc pliant",
          "Signe \"Bébé à bord\"",
        ],
      },
    ],
  },
  {
    id: "repas",
    emoji: "🍼",
    label: "Repas & Soins",
    title: "Alimentation & Hygiène",
    color: "#F0FBF4",
    accent: "#2E9E5B",
    categories: [
      {
        name: "Allaitement au biberon",
        items: [
          "10-12 Biberons de 260 ml",
          "4-6 Biberons de 120 ml",
          "4 Biberons de naissance",
          "Stérilisateur de biberons",
          "Chauffe-biberon",
          "Goupillon",
        ],
      },
      {
        name: "Allaitement maternel",
        items: [
          "Tire-lait",
          "Coussinets d'allaitement",
          "Housses d'allaitement",
          "2-3 Soutiens-gorge d'allaitement",
          "Crème pour les mamelons",
          "Conservation du lait maternel",
          "2 Biberons de 120 ml",
          "2 Tétines naissance",
        ],
      },
      {
        name: "Soins de Bébé",
        items: [
          "2-3 Sucettes / Tétines",
          "Attache-sucette",
          "Anneaux de dentition",
          "Couches et lingettes",
          "Pommade contre l'érythème fessier",
          "Chauffe-lingettes",
          "Poubelle à couches + recharges",
          "Machine à sons blancs",
          "Thermomètre",
          "Mouche-bébé",
          "Coupe-ongles pour bébé",
          "Lessive pour linge de bébé",
        ],
      },
    ],
  },
  {
    id: "eveil",
    emoji: "🎈",
    label: "Éveil & Vêtements",
    title: "Bain, Jeux & Tenue",
    color: "#FDF0F8",
    accent: "#C2559A",
    categories: [
      {
        name: "Vêtements",
        items: [
          "Tenue de sortie de maternité",
          "3-6 Bodies",
          "Ensembles de naissance",
          "4-6 Pyjamas / Dors-bien",
          "4-5 Chaussons / Chaussettes",
          "3-4 Bonnets",
          "2-3 Moufles anti-griffures",
          "2-3 Gigoteuses",
          "4-6 Couvertures d'emmaillotage",
        ],
      },
      {
        name: "Bain & Hygiène",
        items: [
          "Baignoire de bébé",
          "2-3 Capes de bain à capuche",
          "8-10 Gants de toilette",
          "Shampooing / Gel lavant bébé",
          "Lait de toilette / Lotion bébé",
          "Jouets de bain",
          "Brosse et peigne pour bébé",
          "Brosse à dents pour bébé",
        ],
      },
      {
        name: "Activités & Sécurité",
        items: [
          "Transat",
          "Balancelle",
          "Tapis d'éveil / Arche d'activités",
          "Jouets d'éveil / Hochets",
          "Centre d'activités",
          "Livres d'éveil en tissu",
          "Babyphone",
          "Barrière de sécurité",
          "Verrous de tiroirs",
          "Protège-prises",
        ],
      },
    ],
  },
];

// ─── Composant ListeNaissanceChecklist ────────────────────────────────────────
function ListeNaissanceChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalItems = listeUnivers.reduce(
    (acc, u) => acc + u.categories.reduce((a, c) => a + c.items.length, 0),
    0
  );
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((totalChecked / totalItems) * 100);

  const handleExportPDF = () => {
    const printContent = document.getElementById("liste-naissance-print");
    if (!printContent) return;
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Ma liste de naissance</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: Arial, sans-serif; color: #2D3A2A; background: #fff; padding: 32px; }
            h1 { font-size: 22px; font-weight: 900; margin-bottom: 4px; }
            .subtitle { font-size: 12px; color: #888; margin-bottom: 24px; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
            .univers { border: 1px solid #C8D9C2; border-radius: 12px; padding: 16px; background: #F0F4EE; }
            .univers-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; border-bottom: 1px solid #C8D9C2; padding-bottom: 8px; }
            .univers-emoji { font-size: 18px; }
            .univers-title { font-size: 13px; font-weight: 800; }
            .cat-name { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #5A7A52; margin-top: 10px; margin-bottom: 4px; }
            .item { display: flex; align-items: flex-start; gap: 6px; font-size: 11px; color: #333; margin-bottom: 3px; }
            .checkbox { width: 11px; height: 11px; border: 1.5px solid #87A878; border-radius: 3px; flex-shrink: 0; margin-top: 1px; background: ${(() => '')()}; }
            .checked-box { background: #87A878; }
            .checked-text { text-decoration: line-through; color: #aaa; }
            .progress-bar-wrap { background: #C8D9C2; border-radius: 8px; height: 8px; margin-bottom: 20px; overflow: hidden; }
            .progress-bar { background: #87A878; height: 100%; border-radius: 8px; }
            .progress-label { display: flex; justify-content: space-between; font-size: 11px; color: #888; margin-bottom: 4px; }
          </style>
        </head>
        <body>
          <h1>✅ Ma liste de naissance</h1>
          <p class="subtitle">Générée depuis Allobébé · ${totalChecked}/${totalItems} articles cochés</p>
          <div class="progress-label"><span>${totalChecked} / ${totalItems} articles cochés</span><span>${progress}%</span></div>
          <div class="progress-bar-wrap"><div class="progress-bar" style="width:${progress}%"></div></div>
          <div class="grid">
            ${listeUnivers.map(u => `
              <div class="univers">
                <div class="univers-header">
                  <span class="univers-emoji">${u.emoji}</span>
                  <div>
                    <div class="univers-title">${u.title}</div>
                    <div style="font-size:10px;color:#5A7A52">${u.label}</div>
                  </div>
                </div>
                ${u.categories.map(cat => `
                  <div class="cat-name">${cat.name}</div>
                  ${cat.items.map(item => {
                    const k = `${u.id}__${cat.name}__${item}`;
                    const isDone = !!checked[k];
                    return `<div class="item">
                      <div class="checkbox ${isDone ? 'checked-box' : ''}"></div>
                      <span class="${isDone ? 'checked-text' : ''}">${item}</span>
                    </div>`;
                  }).join('')}
                `).join('')}
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 400);
  };

  return (
    <div>
      {/* Header row : titre + bouton PDF alignés */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xl">✅</span>
          <div>
            <h3 className="text-white" style={{ fontSize: "1.2rem", fontWeight: 800 }}>
              Ma check list
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">Cochez les articles à ajouter à votre liste</p>
          </div>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap"
        >
          <BookOpen size={13} /> Exporter en PDF
        </button>
      </div>

      {/* Mention d'information */}
      <div className="mb-6 px-4 py-3 rounded-xl border border-[#87A878]/30" style={{ backgroundColor: "rgba(135, 168, 120, 0.1)" }}>
        <p className="text-[#87A878] text-xs font-medium leading-relaxed">
          💡 <strong className="font-bold">Info pratique :</strong> Cette liste est donnée à titre informatif pour aider et guider les futurs parents à s'équiper sans rien oublier ! N'hésitez pas à l'adapter selon vos propres besoins.
        </p>
      </div>

      {/* Liste complète — tous les univers affichés */}
      <div id="liste-naissance-print" className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {listeUnivers.map((u) => {
          const uChecked = u.categories.reduce(
            (acc, c) => acc + c.items.filter((item) => checked[`${u.id}__${c.name}__${item}`]).length,
            0
          );
          const uTotal = u.categories.reduce((acc, c) => acc + c.items.length, 0);
          return (
            <div
              key={u.id}
              className="rounded-2xl p-4 border border-white/10 flex flex-col gap-4"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              {/* Header univers */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{u.emoji}</span>
                  <div>
                    <p className="text-white text-xs font-bold leading-tight">{u.title}</p>
                    <p className="text-gray-500 text-[10px]">{u.label}</p>
                  </div>
                </div>
                
              </div>

              {/* Catégories + items */}
              <div className="flex flex-col gap-3">
                {u.categories.map((cat) => (
                  <div key={cat.name}>
                    <p className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: "#87A878" }}>
                      {cat.name}
                    </p>
                    <ul className="space-y-1.5">
                      {cat.items.map((item) => {
                        const key = `${u.id}__${cat.name}__${item}`;
                        const done = !!checked[key];
                        return (
                          <li key={item}>
                            <button
                              onClick={() => toggle(key)}
                              className="flex items-start gap-2 w-full text-left group"
                            >
                              {done
                                ? <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#87A878" }} />
                                : <Circle size={13} className="flex-shrink-0 mt-0.5 text-white/20 group-hover:text-white/40 transition-colors" />
                              }
                              <span className={`text-[11px] leading-snug ${done ? "line-through text-white/25" : "text-gray-300"}`}>
                                {item}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Trimestres ───────────────────────────────────────────────────────────────
const trimesters = [
  {
    num: "1er",
    weeks: "Semaines 1 → 12",
    title: "Les premiers émois",
    desc: "Votre corps se transforme doucement. La fatigue et les nausées sont fréquentes, c'est tout à fait normal. Profitez de cette période pour vous informer et prendre vos premiers rendez-vous médicaux.",
    tips: [
      "Prendre de l'acide folique chaque jour",
      "Planifier la première échographie (SA 12)",
      "Informer votre médecin traitant",
      "Réduire le café et l'alcool",
      "Commencer un journal de grossesse",
    ],
    products: ["Vitamines prénatales", "Coussin de grossesse", "Journal bébé", "Tisane bio"],
  },
  {
    num: "2ème",
    weeks: "Semaines 13 → 26",
    title: "La belle période",
    desc: "Les nausées s'estompent, l'énergie revient ! C'est le moment idéal pour préparer la chambre, commencer votre liste de naissance et profiter des premiers coups de pied de bébé.",
    tips: [
      "Préparer la chambre et choisir le mobilier",
      "Commencer la liste de naissance",
      "Prévoir les cours de préparation à l'accouchement",
      "Penser à l'allaitement ou aux biberons",
      "Échographie morphologique (SA 22)",
    ],
    products: ["Lit bébé", "Table à langer", "Babyphone", "Coussin d'allaitement"],
  },
  {
    num: "3ème",
    weeks: "Semaines 27 → 40",
    title: "Le grand final",
    desc: "Bébé grandit vite et votre ventre aussi ! C'est l'heure de finaliser la valise de maternité, de choisir votre siège auto et de vous reposer autant que possible.",
    tips: [
      "Préparer la valise de maternité",
      "Installer et faire homologuer le siège auto",
      "Visiter la maternité",
      "Finaliser le plan de naissance",
      "Préparer le retour à la maison",
    ],
    products: ["Siège auto", "Tire-lait", "Poussette", "Gigoteuse"],
  },
];

// ─── Checklist valise ─────────────────────────────────────────────────────────
const checklistItems = [
  {
    category: "Pour maman",
    emoji: "👗",
    items: [
      "Robe de chambre",
      "Chaussons",
      "Sous-vêtements post-partum (x5)",
      "Soutien-gorge d'allaitement (x3)",
      "Coussinets d'allaitement",
      "Affaires de toilette",
      "Pyjamas confortables",
    ],
  },
  {
    category: "Pour bébé",
    emoji: "👶",
    items: [
      "Bodies (x5, taille 1 mois)",
      "Pyjamas (x3)",
      "Chaussettes (x5 paires)",
      "Bonnets (x2)",
      "Gigoteuse",
      "Couverture",
      "Couches nouveau-né",
      "Lingettes sans parfum",
    ],
  },
  {
    category: "Administratif",
    emoji: "📋",
    items: [
      "Carte vitale",
      "Carnet de maternité",
      "Pièce d'identité",
      "Carte mutuelle",
      "Plan de naissance",
      "Déclaration de naissance",
    ],
  },
  {
    category: "Confort & Divers",
    emoji: "🎧",
    items: [
      "Chargeur de téléphone",
      "Snacks sains",
      "Bouteille d'eau",
      "Lecture / tablette",
      "Musique / playlist",
    ],
  },
];

function Checklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setChecked((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-6">
        {checklistItems.map((cat) => (
          <div key={cat.category}>
            <p className="text-xs font-bold uppercase tracking-wide text-[#5A7A52] mb-3 flex items-center gap-1.5">
              <span>{cat.emoji}</span> {cat.category}
            </p>
            <ul className="space-y-2">
              {cat.items.map((item) => {
                const key = `${cat.category}__${item}`;
                const isDone = !!checked[key];
                return (
                  <li key={item}>
                    <button
                      onClick={() => toggle(key)}
                      className="flex items-center gap-2.5 w-full text-left group"
                    >
                      {isDone
                        ? <CheckCircle2 size={15} className="flex-shrink-0 text-[#87A878]" />
                        : <Circle size={15} className="flex-shrink-0 text-gray-300 group-hover:text-[#87A878] transition-colors" />
                      }
                      <span className={`text-sm ${isDone ? "line-through text-gray-400" : "text-gray-700"}`}>
                        {item}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "À partir de quand peut-on créer une liste de naissance ?",
    a: "Vous pouvez créer votre liste dès que vous le souhaitez ! La plupart des futures mamans commencent entre la 12e et la 20e semaine, après la première ou deuxième échographie.",
  },
  {
    q: "Comment fonctionne la liste de naissance Allobébé ?",
    a: "Vous ajoutez les produits que vous souhaitez recevoir, puis partagez le lien avec vos proches. Chaque achat est marqué comme réservé pour éviter les doublons. Vous êtes notifiée en temps réel.",
  },
  {
    q: "Peut-on échanger un article reçu ?",
    a: "Oui, tous les produits de votre liste bénéficient d'un délai de retour de 30 jours. Un simple mail à notre service client suffit pour initier l'échange.",
  },
  {
    q: "Quels produits sont indispensables pour la chambre de bébé ?",
    a: "Le lit (avec matelas adapté), la table à langer, et une bonne veilleuse sont la base. Ajoutez un babyphone si les chambres sont éloignées et un tapis d'éveil pour les premiers mois.",
  },
  {
    q: "Comment choisir le bon siège auto ?",
    a: "Pour les nouveau-nés, privilégiez une coque (groupe 0+) dos à la route. Vérifiez la compatibilité avec votre voiture et faites-la homologuer en magasin. Notre équipe peut vous conseiller en boutique.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-[#C8D9C2]">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 py-4 text-left"
          >
            <span className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{faq.q}</span>
            {open === i
              ? <ChevronUp size={16} className="flex-shrink-0 mt-0.5 text-[#5A7A52]" />
              : <ChevronDown size={16} className="flex-shrink-0 mt-0.5 text-gray-400" />
            }
          </button>
          {open === i && (
            <p className="text-gray-600 text-sm leading-relaxed pb-4">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Guides conseils ──────────────────────────────────────────────────────────
const guides = [
  {
    tag: "Sommeil",
    title: "Comment aménager la chambre de bébé ?",
    desc: "Nos conseils pour un espace sûr, pratique et cocooning.",
    img: "https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=400&q=80",
    href: "#",
  },
  {
    tag: "Nutrition",
    title: "Allaitement vs biberon : tout comprendre",
    desc: "Les avantages de chaque méthode, sans jugement.",
    img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80",
    href: "#",
  },
  {
    tag: "Mobilité",
    title: "Quel siège auto choisir selon son budget ?",
    desc: "Comparatif complet des meilleures coques et sièges convertibles.",
    img: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400&q=80",
    href: "#",
  },
  {
    tag: "Bien-être",
    title: "Gérer la fatigue des premiers mois",
    desc: "Conseils concrets pour tenir le rythme avec bébé à la maison.",
    img: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&q=80",
    href: "#",
  },
];

// ─── Personal Shopper ─────────────────────────────────────────────────────────
const shopperFormules = [
  {
    id: "full",
    emoji: "⭐",
    title: "L'Essentiel",
    duration: "1h30",
    badge: "Populaire",
    badgeBg: "#87A878",
    desc: "Un temps complet pour tout couvrir : mobilier de chambre, poussettes, sièges auto, alimentation... Le rendez-vous idéal pour les futures mamans qui démarrent.",
    details: ["Tous les univers puériculture", "Démo poussettes & sièges auto", "Conseils mobilier & chambre", "Bon d'achat offert à l'issue du RDV"],
  },
  {
    id: "out",
    emoji: "🚗",
    title: "Sorties & Mobilité",
    duration: "1h",
    badge: null,
    badgeBg: null,
    desc: "Focus approfondi sur les poussettes, sièges auto et systèmes de voyage. Essayez notre piste de test en magasin pour comparer en conditions réelles.",
    details: ["Comparatif poussettes & coques", "Piste de test en magasin", "Vérification compatibilité voiture", "Conseils portage & écharpe"],
  },
  {
    id: "short",
    emoji: "⚡",
    title: "Express",
    duration: "30 min",
    badge: null,
    badgeBg: null,
    desc: "Un article ou un thème précis en tête ? Ce créneau court est parfait pour une question ciblée : quel babyphone choisir, quelle poussette pour le bus...",
    details: ["1 univers ou 1 produit ciblé", "Conseils rapides & impartiaux", "Sans obligation d'achat", "Idéal en fin de grossesse"],
  },
  {
    id: "portage",
    emoji: "🤱",
    title: "Portage Bébé",
    duration: "20 min",
    badge: "Nouveau",
    badgeBg: "#2D3A2A",
    desc: "Découvrez les porte-bébés physiologiques et apprenez à porter en toute sécurité. Une séance dédiée au portage, adaptée à votre morphologie.",
    details: ["Présentation porte-bébés & écharpes", "Essayage & ajustement", "Conseils positions sécurisées", "Adapté dès la naissance"],
  },
];

function PersonalShopperSection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="py-14 bg-white">
      <div className="w-full px-4">

        {/* En-tête */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          <div>
            <span
              className="inline-block text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: "#87A878" }}
            >
              Service gratuit · En magasin
            </span>
            <h2 className="text-gray-900 mb-4" style={{ fontSize: "1.7rem", fontWeight: 900, lineHeight: 1.2 }}>
              Votre expérience shopping<br />personnalisée, 1 pour 1 🛍️
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              Préparez l'arrivée de bébé en toute sérénité avec un rendez-vous Personal Shopper gratuit et sans obligation d'achat. Un conseiller dédié vous accompagne selon vos besoins, votre budget et vos questions.
            </p>
            <ul className="space-y-2.5 mb-7">
              {[
                "Choix de la durée et du thème selon vos priorités",
                "Conseils personnalisés et impartiaux",
                "Aucune obligation d'achat lors du rendez-vous",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: "#87A878" }}>
                    <span className="text-[9px] font-black text-gray-900">✓</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#87A878] hover:bg-[#6A9060] text-gray-900 px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                📅 Réserver un créneau
              </a>
              
            </div>
          </div>

          {/* Avantages visuels */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🎯", label: "Conseils sur-mesure", sub: "Adaptés à votre situation" },
              { icon: "🆓", label: "100% gratuit", sub: "Sans engagement d'achat" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl p-5 border border-gray-100 text-center"
                style={{ backgroundColor: "#F0F4EE" }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-gray-900 text-xs font-bold mb-0.5">{item.label}</p>
                <p className="text-gray-500 text-[11px]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Formules */}
        <div>
          <h3 className="text-gray-900 mb-2" style={{ fontSize: "1.2rem", fontWeight: 800 }}>
            Choisissez votre formule
          </h3>
          <p className="text-gray-500 text-sm mb-6">Cliquez sur une formule pour en savoir plus</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {shopperFormules.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelected(selected === f.id ? null : f.id)}
                className="text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden"
                style={{
                  borderColor: selected === f.id ? "#87A878" : "#e5e7eb",
                  backgroundColor: selected === f.id ? "#F0F4EE" : "#ffffff",
                }}
              >
                {/* Header carte */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{f.emoji}</span>
                    {f.badge && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: f.badgeBg!, color: f.badgeBg === "#87A878" ? "#2D3A2A" : "#87A878" }}
                      >
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-900 text-sm font-bold mb-0.5">{f.title}</p>
                  <p className="text-[#5A7A52] text-xs font-semibold mb-3">⏱ {f.duration}</p>
                  <p className="text-gray-500 text-xs leading-snug">{f.desc}</p>
                </div>

                {/* Détails (expandable) */}
                {selected === f.id && (
                  <div className="px-5 pb-4 pt-3 border-t border-[#C8D9C2]">
                    <ul className="space-y-1.5">
                      {f.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-xs text-gray-700">
                          <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "#87A878" }}>
                            <span className="text-[8px] font-black text-gray-900">✓</span>
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 inline-flex items-center gap-1.5 bg-[#87A878] hover:bg-[#6A9060] text-gray-900 px-4 py-2 rounded-full text-xs font-bold transition-colors"
                    >
                      📅 Réserver cette formule
                    </a>
                  </div>
                )}

                {/* CTA bas de carte (quand non sélectionnée) */}
                {selected !== f.id && (
                  <div className="px-5 pb-4">
                    <span className="text-xs text-[#5A7A52] font-semibold">Voir les détails →</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Note bas */}
        
      </div>
    </section>
  );
}

// ─── Parlez-nous de vous ──────────────────────────────────────────────────────
type ProfileForm = {
  prenom: string;
  semaine: number;
  dejaMaman: boolean | null;
  nbEnfants: string;
  situation: string;
  sexeBebe: string;
  prenomBebe: string;
  univers: string[];
  budget: string;
  decouverte: string;
  message: string;
};

const UNIVERS_OPTIONS = [
  { id: "chambre", label: "Chambre & Mobilier", emoji: "🛏️" },
  { id: "mobilite", label: "Poussette & Mobilité", emoji: "🚗" },
  { id: "alim", label: "Alimentation & Allaitement", emoji: "🍼" },
  { id: "vetements", label: "Vêtements & Layette", emoji: "👶" },
  { id: "eveil", label: "Éveil & Jeux", emoji: "🎈" },
  { id: "soins", label: "Soins & Hygiène", emoji: "🧴" },
  { id: "portage", label: "Portage", emoji: "🤱" },
  { id: "securite", label: "Sécurité & Surveillance", emoji: "🔒" },
];

const EMPTY_FORM: ProfileForm = {
  prenom: "",
  semaine: 20,
  dejaMaman: null,
  nbEnfants: "",
  situation: "",
  sexeBebe: "",
  prenomBebe: "",
  univers: [],
  budget: "",
  decouverte: "",
  message: "",
};

function ParleNousDeVousSection() {
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Votre profil", "Votre famille", "Vos priorités", "Votre message"];

  const setField = <K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleUnivers = (id: string) =>
    setField("univers", form.univers.includes(id)
      ? form.univers.filter((u) => u !== id)
      : [...form.univers, id]);

  const canNext = () => {
    if (activeStep === 0) return form.prenom.trim().length > 0 && form.dejaMaman !== null;
    if (activeStep === 1) return form.sexeBebe !== "";
    if (activeStep === 2) return form.univers.length > 0 && form.budget !== "";
    return true;
  };

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#87A878] focus:ring-2 focus:ring-[#87A878]/20 transition-all bg-white placeholder:text-gray-300";
  const chipCls = (active: boolean) =>
    `cursor-pointer px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all select-none ${
      active ? "border-[#87A878] bg-[#F0F4EE] text-[#5A7A52]" : "border-gray-200 bg-white text-gray-500 hover:border-[#87A878]/60"
    }`;

  if (submitted) {
    return (
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl" style={{ backgroundColor: "#87A878" }}>
            🌟
          </div>
          <h2 className="text-gray-900 mb-3" style={{ fontSize: "1.5rem", fontWeight: 900 }}>
            Merci {form.prenom} ! 🎉
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md mx-auto">
            Vos informations ont bien été enregistrées. Notre équipe va les analyser pour vous proposer des conseils et produits parfaitement adaptés à votre situation.
          </p>
          <div className="bg-[#F0F4EE] border border-[#C8D9C2] rounded-2xl p-5 text-left mb-6 max-w-sm mx-auto">
            <p className="text-xs font-bold text-[#5A7A52] uppercase tracking-wide mb-3">Votre profil en un coup d'œil</p>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li>🤰 Semaine {form.semaine} de grossesse</li>
              {form.dejaMaman && <li>👨‍👩‍👧 Déjà maman · {form.nbEnfants} enfant(s)</li>}
              {form.sexeBebe && form.sexeBebe !== "surprise" && (
                <li>💛 Bébé {form.sexeBebe === "fille" ? "fille" : "garçon"}{form.prenomBebe ? ` · ${form.prenomBebe}` : ""}</li>
              )}
              {form.univers.length > 0 && <li>🎯 {form.univers.length} univers prioritaire(s)</li>}
              {form.budget && <li>💰 Budget : {form.budget}</li>}
            </ul>
          </div>
          <button
            onClick={() => { setForm(EMPTY_FORM); setSubmitted(false); setActiveStep(0); }}
            className="text-xs text-gray-400 underline hover:text-[#5A7A52] transition-colors"
          >
            Modifier mes informations
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 bg-white">
      <div className="max-w-2xl mx-auto px-4">

        {/* Intro */}
        <div className="text-center mb-10">
          <h2 className="text-gray-900 mb-2" style={{ fontSize: "1.5rem", fontWeight: 900 }}>
            Parlez-nous de vous 💛
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            En partageant quelques informations sur votre grossesse et votre famille, nos conseillers pourront vous proposer des recommandations vraiment personnalisées.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 -z-0" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-[#87A878] transition-all duration-500 -z-0"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1.5 z-10">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  backgroundColor: i <= activeStep ? "#87A878" : "#f3f4f6",
                  color: i <= activeStep ? "#2D3A2A" : "#9ca3af",
                }}
              >
                {i < activeStep ? "✓" : i + 1}
              </div>
              <span className="text-[10px] font-semibold hidden sm:block" style={{ color: i <= activeStep ? "#5A7A52" : "#9ca3af" }}>
                {s}
              </span>
            </div>
          ))}
        </div>

        {/* ── Étape 0 · Votre profil ── */}
        {activeStep === 0 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Votre prénom *</label>
              <input
                type="text"
                placeholder="Marie, Sophie, Chloé…"
                value={form.prenom}
                onChange={(e) => setField("prenom", e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                Semaine de grossesse — <span style={{ color: "#5A7A52" }}>SA {form.semaine}</span>
              </label>
              <input
                type="range"
                min={1} max={40} step={1}
                value={form.semaine}
                onChange={(e) => setField("semaine", parseInt(e.target.value))}
                className="w-full accent-[#87A878] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>SA 1 · 1er trimestre</span>
                <span>SA 20 · mi-parcours</span>
                <span>SA 40 · terme</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Êtes-vous déjà maman ? *</label>
              <div className="flex gap-3">
                {[{ val: false, label: "🌸 Première fois" }, { val: true, label: "👨‍👩‍👧 Déjà maman" }].map(({ val, label }) => (
                  <button
                    key={label}
                    onClick={() => setField("dejaMaman", val)}
                    className={chipCls(form.dejaMaman === val)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {form.dejaMaman === true && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Combien d'enfants avez-vous déjà ?</label>
                <div className="flex gap-2">
                  {["1", "2", "3+"].map((n) => (
                    <button key={n} onClick={() => setField("nbEnfants", n)} className={chipCls(form.nbEnfants === n)}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}

            
          </div>
        )}

        {/* ── Étape 1 · Votre famille ── */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Le sexe de bébé *</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { val: "fille", label: "💗 C'est une fille" },
                  { val: "garcon", label: "💙 C'est un garçon" },
                  { val: "jumeaux", label: "👯 Jumeaux / Jumelles" },
                  { val: "surprise", label: "🎁 Surprise !" },
                ].map(({ val, label }) => (
                  <button key={val} onClick={() => setField("sexeBebe", val)} className={chipCls(form.sexeBebe === val)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                Prénom de bébé <span className="text-gray-400 font-normal normal-case">(si vous l'avez choisi)</span>
              </label>
              <input
                type="text"
                placeholder="Léa, Noah, Emma…"
                value={form.prenomBebe}
                onChange={(e) => setField("prenomBebe", e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Comment avez-vous entendu parler de nous ?
              </label>
              <div className="flex flex-wrap gap-2">
                {["Bouche-à-oreille", "Instagram / Réseaux", "Google", "Sage-femme / Médecin", "Déjà cliente", "Autre"].map((d) => (
                  <button key={d} onClick={() => setField("decouverte", d)} className={chipCls(form.decouverte === d)}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Étape 2 · Vos priorités ── */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Quels univers vous intéressent le plus ? *{" "}
                <span className="text-gray-400 font-normal normal-case">(plusieurs choix possibles)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {UNIVERS_OPTIONS.map((u) => {
                  const active = form.univers.includes(u.id);
                  return (
                    <button
                      key={u.id}
                      onClick={() => toggleUnivers(u.id)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all text-center"
                      style={{
                        borderColor: active ? "#87A878" : "#e5e7eb",
                        backgroundColor: active ? "#F0F4EE" : "#fff",
                      }}
                    >
                      <span className="text-xl">{u.emoji}</span>
                      <span className="text-[11px] font-semibold leading-tight" style={{ color: active ? "#5A7A52" : "#6b7280" }}>
                        {u.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Votre budget total estimé pour la puériculture *
              </label>
              <div className="flex flex-wrap gap-2">
                {["Moins de 500 €", "500 – 1 000 €", "1 000 – 2 000 €", "Plus de 2 000 €", "Je ne sais pas encore"].map((b) => (
                  <button key={b} onClick={() => setField("budget", b)} className={chipCls(form.budget === b)}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Étape 3 · Votre message ── */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div className="bg-[#F0F4EE] border border-[#C8D9C2] rounded-2xl p-5">
              <p className="text-xs font-bold text-[#5A7A52] uppercase tracking-wide mb-1">On vous lit ! 💬</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Vos questions, vos doutes, vos envies… Partagez tout ce que vous voulez. Plus vous nous en dites, mieux on peut vous accompagner.
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Votre message libre</label>
              <textarea
                rows={6}
                placeholder={"Par exemple :\n• J'hésite entre deux poussettes et je ne sais pas laquelle choisir\n• Je cherche des conseils pour aménager une petite chambre\n• Je veux allaiter mais je ne sais pas comment m'équiper…"}
                value={form.message}
                onChange={(e) => setField("message", e.target.value)}
                className={`${inputCls} resize-none leading-relaxed`}
              />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs text-gray-400 leading-relaxed">
              🔒 Vos informations sont confidentielles et ne sont utilisées que pour personnaliser vos recommandations. Elles ne sont jamais partagées avec des tiers.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => setActiveStep((s) => s - 1)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-500 hover:border-gray-300 transition-all ${activeStep === 0 ? "invisible" : ""}`}
          >
            ← Retour
          </button>

          {activeStep < steps.length - 1 ? (
            <button
              onClick={() => { if (canNext()) setActiveStep((s) => s + 1); }}
              className="px-8 py-3 rounded-full text-sm font-bold transition-all"
              style={{
                backgroundColor: canNext() ? "#87A878" : "#f3f4f6",
                color: canNext() ? "#2D3A2A" : "#9ca3af",
                cursor: canNext() ? "pointer" : "not-allowed",
                opacity: canNext() ? 1 : 0.6,
              }}
            >
              Continuer →
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="px-8 py-3 rounded-full text-sm font-bold bg-[#87A878] hover:bg-[#6A9060] text-gray-900 transition-colors"
            >
              Envoyer mes informations ✓
            </button>
          )}
        </div>

        {/* Dots de progression */}
        <div className="flex justify-center gap-2 mt-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === activeStep ? 24 : 8,
                backgroundColor: i <= activeStep ? "#87A878" : "#e5e7eb",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CollapsibleSection ───────────────────────────────────────────────────────
function CollapsibleSection({
  id,
  emoji,
  title,
  subtitle,
  tag,
  index = 0,
  children,
}: {
  id?: string;
  emoji: string;
  title: string;
  subtitle: string;
  tag?: string;
  index?: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // Alternance : pair → charbon foncé / impair → vert pâle
  const isDark = index % 2 === 0;
  const headerBg   = isDark ? "#2D3A2A" : "#F0F4EE";
  const headerText  = isDark ? "#ffffff"  : "#2D3A2A";
  const accentBg   = isDark ? "#87A878"  : "#C8D9C2";
  return (
    <div id={id} className="border-b border-black/5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left transition-opacity hover:opacity-90"
        style={{ backgroundColor: headerBg }}
      >
        <span className="text-2xl flex-shrink-0">{emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            {tag && (
              null
            )}
          </div>
          <p className="font-black leading-tight" style={{ color: headerText, fontSize: "1.05rem" }}>
            {title}
          </p>
          <p className="text-xs mt-0.5 opacity-60" style={{ color: headerText }}>
            {subtitle?.replace(/\s*[·—]\s*4 univers produits/g, "")}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="hidden sm:inline-block text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
            style={{
              backgroundColor: open ? accentBg : "rgba(0,0,0,0.08)",
              color: open ? "#2D3A2A" : headerText,
            }}
          >
            {open ? "Réduire" : "Voir"}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
            style={{ backgroundColor: "rgba(0,0,0,0.08)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <ChevronDown size={16} style={{ color: headerText }} />
          </div>
        </div>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export function FutureMamanPage() {
  const [activeTrimester, setActiveTrimester] = useState(0);
  const t = trimesters[activeTrimester];

  return (
    <div className="bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="w-full px-4 py-2.5 flex items-center gap-1.5 text-xs text-gray-400">
          <Link to="/home" className="hover:text-[#5A7A52] transition-colors">Accueil</Link>
          <ChevronRight size={11} />
          <span className="text-gray-700">Future maman</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ minHeight: 420 }}>
        <img
          src="https://images.unsplash.com/photo-1624013599822-1faf520c67d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVnbmFudCUyMHdvbWFuJTIwaGFwcHklMjBtYXRlcm5pdHl8ZW58MXx8fHwxNzcyMTk5NjU0fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Future maman heureuse"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3A2A]/80 via-[#2D3A2A]/40 to-transparent" />
        <div className="relative w-full px-6 py-20 flex flex-col items-start justify-center" style={{ minHeight: 420 }}>
          <span
            className="inline-flex items-center gap-1.5 text-gray-900 text-xs px-3 py-1.5 rounded-full font-bold mb-4"
            style={{ backgroundColor: "#87A878" }}
          >
            <Heart size={11} fill="currentColor" /> Future maman
          </span>
          <h1
            className="text-white mb-4 max-w-lg drop-shadow"
            style={{ fontSize: "2.2rem", fontWeight: 900, lineHeight: 1.15 }}
          >
            Bienvenue dans le club des futures mamans 🌟
          </h1>
          <p className="text-white/70 text-base max-w-md mb-8 leading-relaxed">
            Guides, listes, conseils et produits essentiels — on vous accompagne de la grossesse aux premiers mois.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#liste"
              className="inline-flex items-center gap-2 bg-[#87A878] hover:bg-[#6A9060] text-gray-900 px-6 py-3 rounded-full text-sm font-bold transition-colors"
            >
              <Gift size={15} /> Créer ma liste
            </a>
            <a
              href="#valise"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-full text-sm font-semibold transition-colors backdrop-blur-sm"
            >
              Préparer ma valise
            </a>
          </div>
        </div>
      </div>

      {/* ── Encouragement Création de Compte ── */}
      <div className="w-full px-4 py-8 bg-white">
        <div className="max-w-5xl mx-auto rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#C8D9C2]" style={{ backgroundColor: "#F0F4EE" }}>
          <div className="flex items-start gap-4 md:gap-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm" style={{ backgroundColor: "#87A878" }}>
              <UserPlus size={24} color="#2D3A2A" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[#2D3A2A] mb-1.5" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                Créez votre compte Allobébé
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed max-w-xl">
                Bénéficiez d'un <strong>suivi entièrement personnalisé</strong> tout au long de votre grossesse et durant les premières années de vie de votre enfant. Retrouvez vos listes, favoris, et des recommandations expertes évolutives.
              </p>
            </div>
          </div>
          <button className="flex-shrink-0 bg-[#2D3A2A] hover:bg-[#3A5432] text-white px-7 py-3.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap shadow-md">
            Créer mon compte gratuit
          </button>
        </div>
      </div>

      {/* ── Sections accordéon ── */}
      <div>

        {/* Liste de naissance */}
        <CollapsibleSection
          id="liste"
          emoji="🎁"
          title="Liste de naissance"
          subtitle="Créez votre liste, partagez-la avec vos proches et cochez les essentiels — 4 univers produits"
          tag="Gratuit"
          index={0}
        >
      <section className="py-14 bg-[#2D3A2A]">
        <div className="w-full px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <span className="inline-block text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: "#87A878" }}>
                Liste de naissance
              </span>
              <h2 className="text-white mb-4" style={{ fontSize: "1.7rem", fontWeight: 800, lineHeight: 1.2 }}>
                Créez votre liste de naissance gratuitement
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Partagez-la en un lien avec vos proches. Ils contribuent à leur rythme, vous recevez exactement ce dont vous avez besoin.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Ajoutez les produits de votre choix depuis tout le catalogue",
                  "Partagez par email, SMS ou réseaux sociaux",
                  "Recevez des alertes en temps réel",
                  "Échangez facilement si besoin",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <Star size={13} className="flex-shrink-0 mt-0.5 text-[#87A878]" fill="#87A878" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#87A878] hover:bg-[#6A9060] text-gray-900 px-8 py-4 rounded-full font-bold text-sm transition-colors"
              >
                <Gift size={16} /> Créer ma liste maintenant
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🎁", label: "Catalogue complet", sub: "+40 000 références" },
                { icon: "📱", label: "Application mobile", sub: "iOS & Android" },
                { icon: "🚚", label: "Livraison gratuite", sub: "dès 59€ pour vos proches" },
                { icon: "↩️", label: "Retour facile", sub: "Sous 30 jours" },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-white text-xs font-bold mb-0.5">{item.label}</div>
                  <div className="text-gray-500 text-[11px]">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Nouvelles fonctionnalités ── */}
          <div className="border-t border-white/10 pt-10 mb-12">
            <h3 className="text-white mb-6" style={{ fontSize: "1.2rem", fontWeight: 800 }}>
              Plus qu'une simple liste de produits 🌟
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Services */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col relative hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: "#87A878" }}>
                  🧹
                </div>
                <h4 className="text-white font-bold text-base mb-2">Liste de services</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  Parfois, le meilleur cadeau, c'est du temps. Permettez à vos proches de s'engager à vous offrir des heures de ménage, des bons petits plats faits maison, ou de l'aide pour les courses.
                </p>
                <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2.5 px-5 rounded-full transition-colors w-fit border border-white/10">
                  Ajouter un service
                </button>
              </div>

              {/* Remboursement */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col relative hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: "#87A878" }}>
                  💶
                </div>
                <h4 className="text-white font-bold text-base mb-2">Cagnotte & Remboursement</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  Vous avez déjà craqué sur la poussette de vos rêves ou du mobilier d'occasion ? Ajoutez l'article à votre liste et demandez une participation financière libre à vos proches.
                </p>
                <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2.5 px-5 rounded-full transition-colors w-fit border border-white/10">
                  Demander une participation
                </button>
              </div>

              {/* Themes (A venir) */}
              <div className="bg-gradient-to-br from-[#87A878]/20 to-transparent border border-[#87A878]/30 rounded-2xl p-6 flex flex-col relative overflow-hidden">
                <span className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full text-[#2D3A2A] uppercase tracking-wider" style={{ backgroundColor: "#87A878" }}>
                  À venir
                </span>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl mb-4">
                  🎨
                </div>
                <h4 className="text-white font-bold text-base mb-2">Listes pré-conçues à thème</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                  En manque d'inspiration ? Bientôt, importez en un clic une liste complète et 100% personnalisable selon vos convictions.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-gray-300">🌱 Éco-responsable</span>
                  <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-gray-300">🇫🇷 Made in France</span>
                  <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-gray-300">✨ Design</span>
                  <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-gray-300">🪵 Bois</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── Ma check list ── */}
          <div className="border-t border-white/10 pt-10">
            <ListeNaissanceChecklist />
          </div>

        </div>
      </section>
        </CollapsibleSection>

        {/* Guide par trimestre */}
        <CollapsibleSection
          emoji="🌱"
          title="Guide par trimestre"
          subtitle="Conseils personnalisés semaine par semaine, du 1er au 3ème trimestre"
          index={1}
        >
      <section className="py-14 bg-[#F0F4EE]">
        <div className="w-full px-4">
          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-2" style={{ fontSize: "1.5rem", fontWeight: 800 }}>
              Votre grossesse semaine par semaine
            </h2>
            <p className="text-gray-500 text-sm">Sélectionnez votre trimestre pour des conseils adaptés</p>
          </div>

          {/* Onglets trimestres */}
          <div className="flex gap-2 justify-center mb-8">
            {trimesters.map((tr, i) => (
              <button
                key={i}
                onClick={() => setActiveTrimester(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTrimester === i
                    ? "bg-[#87A878] text-gray-900 shadow-md"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-[#87A878]"
                }`}
              >
                {tr.num} trimestre
              </button>
            ))}
          </div>

          {/* Contenu du trimestre actif */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Texte */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div
                  className="inline-block text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4 self-start"
                  style={{ backgroundColor: "#87A878" }}
                >
                  {t.weeks}
                </div>
                <h3 className="text-gray-900 mb-3" style={{ fontSize: "1.4rem", fontWeight: 800 }}>
                  {t.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{t.desc}</p>

                <h4 className="text-gray-900 text-xs font-bold uppercase tracking-wide mb-3">
                  Ce qu'il faut faire ce trimestre
                </h4>
                <ul className="space-y-2 mb-6">
                  {t.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#87A878] flex items-center justify-center mt-0.5">
                        <span className="text-[9px] font-black text-gray-900">✓</span>
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>

                <div>
                  <p className="text-xs text-gray-400 mb-2">Produits recommandés ce trimestre :</p>
                  <div className="flex flex-wrap gap-2">
                    {t.products.map((p) => (
                      <a
                        key={p}
                        href="#"
                        className="text-xs bg-[#F0F4EE] border border-[#C8D9C2] text-[#5A7A52] px-3 py-1.5 rounded-full hover:bg-[#87A878] hover:text-gray-900 hover:border-[#87A878] transition-all"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Illustration numérique */}
              <div
                className="relative hidden lg:flex items-center justify-center p-10"
                style={{ background: "linear-gradient(135deg, #F0F4EE 0%, #C8D9C2 100%)" }}
              >
                <div className="text-center">
                  <div
                    className="w-40 h-40 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl"
                    style={{ backgroundColor: "#87A878" }}
                  >
                    <span style={{ fontSize: "4rem" }}>
                      {activeTrimester === 0 ? "🌱" : activeTrimester === 1 ? "🌸" : "🌟"}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm font-bold">{t.num} trimestre</p>
                  <p className="text-gray-400 text-xs mt-1">{t.weeks}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </CollapsibleSection>

        {/* Valise de maternité */}
        <CollapsibleSection
          id="valise"
          emoji="🧳"
          title="Valise de maternité"
          subtitle="Checklist complète à cocher semaine par semaine — maman, bébé, administratif"
          index={2}
        >
      <section className="py-14 bg-white">
        <div className="w-full px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-3">
            <div>
              <h2 className="text-gray-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                La valise de maternité 🧳
              </h2>
              <p className="text-gray-500 text-sm">Cochez au fil des semaines — la liste se souvient de vous.</p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5A7A52] hover:underline self-start sm:self-auto"
            >
              <BookOpen size={14} /> Télécharger en PDF
            </a>
          </div>

          <div className="bg-[#F0F4EE] border border-[#C8D9C2] rounded-3xl p-6 sm:p-8">
            <Checklist />
          </div>
        </div>
      </section>
        </CollapsibleSection>

        {/* Guides conseils */}
        <CollapsibleSection
          emoji="📖"
          title="Nos guides conseils"
          subtitle="Sommeil, nutrition, mobilité, bien-être — des articles rédigés par nos experts"
          index={3}
        >
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="w-full px-4">
          <h2 className="text-gray-900 mb-8" style={{ fontSize: "1.4rem", fontWeight: 800 }}>
            Nos guides pour les futures mamans
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guides.map((guide) => (
              <a
                key={guide.title}
                href={guide.href}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md hover:border-[#87A878] transition-all flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={guide.img}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                  <span
                    className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-gray-900"
                    style={{ backgroundColor: "#87A878" }}
                  >
                    {guide.tag}
                  </span>
                </div>
                <div className="p-4 flex-1">
                  <p className="text-gray-800 text-sm leading-snug mb-1 group-hover:text-[#5A7A52] transition-colors" style={{ fontWeight: 700 }}>
                    {guide.title}
                  </p>
                  <p className="text-gray-400 text-xs leading-snug">{guide.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
        </CollapsibleSection>

        {/* Personal Shopper */}
        <CollapsibleSection
          emoji="🛍️"
          title="Réserver un Personal Shopper"
          subtitle="Rendez-vous gratuit · Conseils 1 pour 1 · 4 formules de 20 min à 1h30 · En magasin"
          tag="Nouveau"
          index={4}
        >
          <PersonalShopperSection />
        </CollapsibleSection>

        {/* Parlez-nous de vous */}
        <CollapsibleSection
          emoji="💛"
          title="Parlez-nous de vous"
          subtitle="Votre grossesse, votre famille, vos priorités — pour des conseils vraiment personnalisés"
          tag="Nouveau"
          index={5}
        >
          <ParleNousDeVousSection />
        </CollapsibleSection>

        {/* FAQ */}
        <CollapsibleSection
          emoji="💬"
          title="Questions fréquentes"
          subtitle="Toutes les réponses à vos questions sur la liste de naissance, les produits et la livraison"
          index={6}
        >
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-gray-900 mb-2 text-center" style={{ fontSize: "1.4rem", fontWeight: 800 }}>
            Questions fréquentes
          </h2>
          <p className="text-gray-400 text-sm text-center mb-8">Les réponses à vos questions les plus courantes</p>
          <div className="bg-[#F0F4EE] border border-[#C8D9C2] rounded-3xl px-6 py-2">
            <FAQ />
          </div>
        </div>
      </section>
        </CollapsibleSection>

        {/* Newsletter */}
        <CollapsibleSection
          emoji="💌"
          title="Newsletter hebdomadaire"
          subtitle="Conseils d'experts personnalisés selon votre stade de grossesse · +50 000 abonnées"
          index={7}
        >
      <section className="py-12 bg-[#87A878]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-3xl mb-3">💌</div>
          <h2 className="text-gray-900 mb-2" style={{ fontSize: "1.4rem", fontWeight: 800 }}>
            Recevez nos conseils chaque semaine
          </h2>
          <p className="text-gray-700 text-sm mb-6">
            Conseils d'experts, bons plans et nouveautés — personnalisés selon votre stade de grossesse.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-full text-sm outline-none text-gray-900 border-2 border-transparent focus:border-[#2D3A2A] bg-white shadow-sm"
            />
            <button className="bg-[#2D3A2A] hover:bg-[#3A5432] text-white px-6 py-3 rounded-full text-sm font-bold transition-colors whitespace-nowrap">
              Je m'abonne
            </button>
          </div>
          <p className="text-gray-600 text-xs mt-3">
            +50 000 futures mamans déjà abonnées · Désabonnement en un clic
          </p>
        </div>
      </section>
        </CollapsibleSection>

      </div>

    </div>
  );
}