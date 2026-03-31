import { useState } from "react";
import { Link } from "react-router";
import {
  ChevronRight,
  Clock,
  Star,
  Heart,
  Tag,
  CheckCircle2,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Baby,
  MapPin,
  Home,
  Zap,
} from "lucide-react";

// ── Produits sélection ────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "pd1",
    name: "Poussette double Atlantic Jumeaux Mélange Grey",
    brand: "HAUCK",
    price: 335.9,
    originalPrice: 479.9,
    discount: -30,
    rating: 4,
    reviews: 2,
    badge: "Destockage",
    badgeColor: "#DC2626",
    stock: true,
    image: "https://images.unsplash.com/photo-1648691176294-5f92f05654af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    features: ["Côte à côte", "Dès la naissance", "Pliage compact"],
  },
  {
    id: "pd2",
    name: "Poussette double Evalite Duo Capri Bleu",
    brand: "JOIE",
    price: 298.9,
    originalPrice: undefined,
    discount: undefined,
    rating: 4,
    reviews: 8,
    badge: undefined,
    badgeColor: undefined,
    stock: true,
    image: "https://images.unsplash.com/photo-1643986418207-7df6bab45d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    features: ["En ligne", "6 mois – 3 ans", "Léger 11 kg"],
  },
  {
    id: "pd3",
    name: "Poussette double Nipper Sport V5 Gris",
    brand: "OUT'N'ABOUT",
    price: 449.0,
    originalPrice: 529.0,
    discount: -15,
    rating: 5,
    reviews: 34,
    badge: "Coup de cœur",
    badgeColor: "#87A878",
    stock: true,
    image: "https://images.unsplash.com/photo-1760160639570-e682e4595f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    features: ["Côte à côte", "Tout-terrain", "Naissance+"],
  },
  {
    id: "pd4",
    name: "Poussette double Chicco Echo Twin Beige",
    brand: "CHICCO",
    price: 319.95,
    originalPrice: 379.95,
    discount: -16,
    rating: 4,
    reviews: 56,
    badge: "-16%",
    badgeColor: "#DC2626",
    stock: true,
    image: "https://images.unsplash.com/photo-1763925130471-f454109c4df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    features: ["En ligne", "Dès la naissance", "Compatible siège auto"],
  },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = [
  {
    q: "Quelle est la différence entre côte à côte et en ligne ?",
    a: "La poussette côte à côte place les enfants l'un à côté de l'autre. Elle offre une vue panoramique identique pour les deux mais est plus large (parfois difficile à passer dans les portes). La poussette en ligne dispose les enfants l'un derrière l'autre : elle reste compacte en largeur, idéale pour les espaces urbains.",
  },
  {
    q: "Peut-on utiliser une poussette double dès la naissance ?",
    a: "Oui, certains modèles sont conçus dès la naissance, notamment les versions avec nacelle intégrée ou siège plat à 170°. Pour les modèles \"6 mois+\", il faut prévoir l'achat séparé de nacelles ou sièges auto adaptateurs.",
  },
  {
    q: "Quelle largeur pour passer dans les portes ?",
    a: "La largeur standard d'une porte est de 80 à 90 cm. Les poussettes doubles côte à côte font généralement entre 72 et 82 cm. Les modèles en ligne font la largeur d'une poussette simple (~60 cm), ce qui est un avantage majeur en intérieur.",
  },
  {
    q: "Quel poids pour une poussette double ?",
    a: "Les poussettes doubles pèsent en moyenne entre 9 et 17 kg. Les modèles légers (moins de 12 kg) sont idéaux pour les déplacements fréquents en transports en commun. Les modèles tout-terrain sont plus lourds mais offrent une meilleure stabilité.",
  },
  {
    q: "Le prix des sièges auto est-il inclus ?",
    a: "Non. Les poussettes doubles utilisables dès la naissance nécessitent souvent l'achat séparé de nacelles ou de sièges auto ajustables (coques groupe 0+). Vérifiez la compatibilité avec les adaptateurs lors de votre achat.",
  },
];

// ── Checklist critères ────────────────────────────────────────────────────────
const CRITERIA = [
  { icon: Baby, label: "Usage dès la naissance", desc: "Vérifier la capacité à accueillir nacelle ou siège plat" },
  { icon: Home, label: "Gabarit et rangement", desc: "Largeur pour passer les portes, volume plié pour le coffre ou l'entrée" },
  { icon: MapPin, label: "Zone de vie", desc: "Trottoirs, transports, ascenseurs étroits ou chemins tout-terrain" },
  { icon: Zap, label: "Fréquence d'utilisation", desc: "Quotidienne intensive ou occasionnelle : poids et durabilité à pondérer" },
  { icon: ShoppingCart, label: "Budget global", desc: "Prévoir les accessoires : sièges auto, chancelières, manchons, sacs" },
];

// ── Comp carte produit ────────────────────────────────────────────────────────
function ProductCard({ p }: { p: typeof PRODUCTS[0] }) {
  const [wish, setWish] = useState(false);
  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group relative flex flex-col">
      {/* Badge */}
      {p.badge && (
        <span
          className="absolute top-3 left-3 z-10 text-[10px] px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: p.badgeColor ?? "#87A878",
            color: p.badgeColor === "#87A878" ? "#2D3A2A" : "#fff",
            fontWeight: 700,
          }}
        >
          {p.badge}
        </span>
      )}
      {/* Destockage banner */}
      {p.discount && p.discount <= -25 && (
        <div
          className="absolute top-0 left-0 right-0 z-10 text-center py-1 text-[10px]"
          style={{ backgroundColor: "#2D3A2A", color: "#87A878", fontWeight: 700, letterSpacing: "0.1em" }}
        >
          LE GRAND DÉSTOCKAGE {p.discount}%
        </div>
      )}
      {/* Wishlist */}
      <button
        onClick={() => setWish(!wish)}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-sm hover:shadow-md transition-all"
      >
        <Heart size={13} className={wish ? "fill-rose-500 text-rose-500" : "text-gray-300"} />
      </button>

      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">{p.brand}</p>
        <p className="text-xs text-gray-800 leading-snug line-clamp-2 flex-1" style={{ fontWeight: 700 }}>{p.name}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mt-1.5 mb-1">
          {p.features.map((f) => (
            <span
              key={f}
              className="text-[10px] px-2 py-0.5 rounded-full border"
              style={{ borderColor: "#87A878", backgroundColor: "#F0F4EE", color: "#5A7A52", fontWeight: 600 }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={10} className={s <= Math.round(p.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"} />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({p.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-gray-900 text-sm" style={{ fontWeight: 800 }}>
            {p.price.toFixed(2)} €
          </span>
          {p.originalPrice && (
            <>
              <span className="text-gray-400 line-through text-xs">{p.originalPrice.toFixed(2)} €</span>
              <span className="text-red-400 text-[10px]" style={{ fontWeight: 600 }}>
                -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>

        {/* CTA */}
        <button
          className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs text-white bg-[#87A878] hover:bg-[#6A9060] transition-colors"
          style={{ fontWeight: 600 }}
        >
          <ShoppingCart size={11} />
          Ajouter
        </button>
      </div>
    </div>
  );
}

// ── Accordéon FAQ ─────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-200"
      style={{ borderColor: open ? "#87A878" : "#e5e7eb" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        style={{ backgroundColor: open ? "#F0F4EE" : "white" }}
      >
        <span className="text-gray-800 text-sm pr-4" style={{ fontWeight: 700 }}>
          {q}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-[#5A7A52] shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-[#87A878]/30 pt-3" style={{ backgroundColor: "#F0F4EE" }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────
export function GuidePoussettDoublePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-2.5">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
            <Link to="/home" className="hover:text-[#996600] transition-colors">Accueil</Link>
            <ChevronRight size={11} />
            <Link to="/poussettes" className="hover:text-[#996600] transition-colors">Poussettes</Link>
            <ChevronRight size={11} />
            <span className="text-gray-700 font-medium">Guide d'achat poussette double</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="bg-[#2D3A2A] text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              {/* Meta */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[11px] px-3 py-1 rounded-full font-semibold"
                  style={{ backgroundColor: "#87A878", color: "#2D3A2A" }}
                >
                  Guide d'achat
                </span>
                <span className="flex items-center gap-1 text-gray-400 text-xs">
                  <Clock size={12} />
                  5 min de lecture
                </span>
              </div>

              <h1 className="text-white mb-3" style={{ fontSize: "2rem", fontWeight: 900, lineHeight: 1.1 }}>
                Guide d'achat<br />
                <span style={{ color: "#87A878" }}>Poussette double</span>
              </h1>

              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Jumeaux, naissances rapprochées ou garde multi-enfants : trouvez le modèle double
                qui combine confort, sécurité et praticité au quotidien.
              </p>
            </div>

            {/* Image hero */}
            <div className="md:w-80 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1648691176294-5f92f05654af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600"
                alt="Poussette double"
                className="w-full h-52 md:h-60 object-cover rounded-2xl"
                style={{ border: "3px solid #87A878" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Corps ── */}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-14">

        {/* ── Section 1 : Introduction ── */}
        <section>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-4" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
              La poussette double, indispensable du quotidien
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                La poussette double est l'indispensable des naissances jumelées, ou des enfants aux âges très rapprochés.
                Il faut envisager le <strong className="text-gray-800">confort</strong> et surtout la{" "}
                <strong className="text-gray-800">qualité</strong> pour assurer la sécurité des jeunes enfants transportés.
              </p>
              <p>
                Mais ces poussettes sont souvent considérées comme encombrantes et peuvent constituer un frein pour la
                gestion de l'installation de la poussette et pour la préparation des enfants en même temps. C'est pourquoi,
                aujourd'hui les modèles de poussette double répondent à une demande précise et viennent faciliter les
                promenades quotidiennes.
              </p>
              <p>
                Et c'est en pensant au confort et à la sécurité que les constructeurs facilitent la vie des adultes, dans
                l'installation et le rangement.
              </p>

              {/* Encart marques */}
              <div
                className="rounded-xl p-4 mt-4 flex items-start gap-3"
                style={{ backgroundColor: "#F0F4EE", border: "1px solid #87A878" }}
              >
                <Tag size={18} className="text-[#5A7A52] shrink-0 mt-0.5" />
                <p className="text-sm text-[#5A7A52]">
                  <strong>allobébé</strong> a sélectionné les poussettes doubles des plus grandes marques :{" "}
                  <strong>Chicco, Maclaren, Graco, Looping…</strong> pour un choix plus confortable qui répond aux
                  attentes de chacun.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2 : Bon investissement ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-1.5 rounded-full" style={{ backgroundColor: "#87A878" }} />
            <h2 className="text-gray-900" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
              Comment faire de ma poussette double un bon investissement ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                Il faut savoir que le <strong className="text-gray-800">prix d'une poussette double est conséquent.</strong>{" "}
                À partir de là, il est important de penser en terme de rentabilité et de savoir exactement l'utilité que
                l'acquéreur va en faire.
              </p>
              <p>
                Il est donc conseillé de choisir avec attention le modèle en déterminant les priorités d'utilisation.
              </p>
              <p>
                Il faut noter que pour les poussettes doubles utilisables dès la naissance, il faudra généralement compter
                le <strong className="text-gray-800">prix des sièges auto ajustables en plus.</strong>
              </p>
            </div>

            {/* Checklist questions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-4">
                Ces questions permettront de définir le modèle adapté à votre situation :
              </p>
              <div className="space-y-3">
                {[
                  { icon: Zap, text: "Utilisations quotidiennes ou occasionnelles" },
                  { icon: Home, text: "Habitat en appartement ou en maison" },
                  { icon: MapPin, text: "En zone urbaine ou en zone rurale" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "#F0F4EE" }}>
                    <item.icon size={16} className="text-[#5A7A52] shrink-0" />
                    <span className="text-sm text-gray-700" style={{ fontWeight: 600 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3 : Sélection produits ── */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1.5 rounded-full" style={{ backgroundColor: "#87A878" }} />
            <h2 className="text-gray-900" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
              La sélection allobébé de poussettes doubles à petits prix
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 ml-5">Des modèles sélectionnés par nos experts puériculture</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/poussettes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm transition-all duration-200"
              style={{ backgroundColor: "#2D3A2A", color: "#87A878", fontWeight: 700 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3A5432")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2D3A2A")}
            >
              Voir toutes les poussettes doubles
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>

        {/* ── Section 4 : Quel modèle choisir ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-1.5 rounded-full" style={{ backgroundColor: "#87A878" }} />
            <h2 className="text-gray-900" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
              La poussette double : quel modèle choisir ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Côte à côte vs en ligne */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-800 mb-4 text-sm" style={{ fontWeight: 800, fontSize: "1rem" }}>
                🔄 Deux formats distincts
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: "Côte à côte",
                    desc: "Vue panoramique identique pour les deux enfants. Plus large en façade, moins adaptée aux espaces étroits.",
                    color: "#F0F4EE",
                  },
                  {
                    title: "En ligne",
                    desc: "Enfants l'un derrière l'autre. Largeur similaire à une poussette simple — idéale pour les portes standard.",
                    color: "#EFF6FF",
                  },
                ].map((v) => (
                  <div key={v.title} className="rounded-xl p-4" style={{ backgroundColor: v.color }}>
                    <div className="text-sm font-bold text-gray-800 mb-1">{v.title}</div>
                    <div className="text-xs text-gray-600 leading-relaxed">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tranches d'âge */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-800 mb-4 text-sm" style={{ fontWeight: 800, fontSize: "1rem" }}>
                👶 Modèles par tranches d'âge
              </h3>
              <div className="space-y-2.5">
                {[
                  { label: "Modèle 0 – 3 ans", desc: "Dès la naissance pour les deux sièges", color: "#87A878" },
                  { label: "Modèle 6 mois – 3 ans", desc: "Enfants assis autonomes uniquement", color: "#e5e7eb" },
                  {
                    label: "Modèle mixte",
                    desc: "Siège avant 6 mois – 3 ans · Siège arrière 0 – 3 ans",
                    color: "#D1FAE5",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: item.color === "#87A878" ? "#F0F4EE" : item.color === "#D1FAE5" ? "#D1FAE5" : "#f9fafb" }}>
                    <CheckCircle2 size={15} className="text-[#5A7A52] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-gray-800">{item.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Texte complémentaire */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6 text-sm text-gray-600 leading-relaxed space-y-3">
            <p>
              <strong className="text-gray-800">Chacun et chacune trouvera la poussette qui correspond à ses besoins</strong> :
              si vous êtes parents de jumeaux, d'enfants en bas âge rapproché, ou encore nounou.
            </p>
            <p>
              De plus, il est important de prendre en considération l'environnement de vie pour envisager le rangement
              du matériel : qu'il soit plié ou non. Tout en sachant qu'aujourd'hui les{" "}
              <strong className="text-gray-800">systèmes de pliage sont très performants</strong> et permettent de réduire
              considérablement le matériel.
            </p>
          </div>
        </section>

        {/* ── Section 5 : Checklist critères ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-1.5 rounded-full" style={{ backgroundColor: "#87A878" }} />
            <h2 className="text-gray-900" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
              Les 5 critères essentiels avant d'acheter
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CRITERIA.map((c, i) => (
              <div
                key={c.label}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: "#F0F4EE" }}
                >
                  <c.icon size={18} className="text-[#5A7A52]" />
                </div>
                <div className="text-gray-800 text-xs mb-1" style={{ fontWeight: 700 }}>
                  {c.label}
                </div>
                <div className="text-gray-500 text-[11px] leading-snug">{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 6 : FAQ ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-1.5 rounded-full" style={{ backgroundColor: "#87A878" }} />
            <h2 className="text-gray-900" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* ── CTA final ── */}
        <section>
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg, #2D3A2A 0%, #3A5432 100%)" }}
          >
            <div className="text-[#87A878] text-xs font-semibold tracking-widest uppercase mb-2">allobébé</div>
            <h3 className="text-white mb-2" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
              Trouvez la poussette double idéale
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Nos conseillers puériculture sont disponibles pour vous accompagner dans votre choix.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/poussettes"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm transition-all duration-200"
                style={{ backgroundColor: "#87A878", color: "#2D3A2A", fontWeight: 700 }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6A9060")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#87A878")}
              >
                <ShoppingCart size={15} />
                Voir toutes les poussettes
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm border transition-all duration-200"
                style={{ borderColor: "#87A878", color: "#87A878", fontWeight: 600 }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(135,168,120,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                Contacter un conseiller
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}