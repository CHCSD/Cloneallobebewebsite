import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ChevronDown, ChevronRight, X, Heart, Star, SlidersHorizontal, Check, ShoppingCart } from "lucide-react";

// ── Mock products ──────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Poussette Trio Chrome 2 Graphite",
    brand: "Bébé Confort",
    price: 749.99,
    originalPrice: 899.99,
    rating: 5,
    reviews: 214,
    badge: "Coup de cœur",
    badgeColor: "#87A878",
    type: "Trio",
    age: "Naissance",
    image: "https://images.unsplash.com/photo-1766858771690-9ab7b9df31c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: "/produit/poussette-trio-chrome-2",
  },
  {
    id: 2,
    name: "Poussette Yoyo² 6+ Bleu Ciel",
    brand: "Babyzen",
    price: 529.00,
    originalPrice: undefined,
    rating: 5,
    reviews: 389,
    badge: "Bestseller",
    badgeColor: "#2D3A2A",
    type: "Légère",
    age: "6 mois+",
    image: "https://images.unsplash.com/photo-1739742465381-ea53b939ae8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 3,
    name: "Poussette Litetrax 4 Flex Noir",
    brand: "Chicco",
    price: 369.95,
    originalPrice: 449.95,
    rating: 4,
    reviews: 97,
    badge: "-18%",
    badgeColor: "#DC2626",
    type: "Combiné",
    age: "Naissance",
    image: "https://images.unsplash.com/photo-1760259202854-1e05da21fe29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 4,
    name: "Poussette Ypsi Bleu Nuit",
    brand: "Cybex",
    price: 899.00,
    originalPrice: undefined,
    rating: 5,
    reviews: 62,
    badge: "Nouveauté",
    badgeColor: "#7C3AED",
    type: "Poussette-canne",
    age: "6 mois+",
    image: "https://images.unsplash.com/photo-1706459773588-20591994dca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 5,
    name: "Poussette Soko Gris Mineral",
    brand: "Bébé Confort",
    price: 479.99,
    originalPrice: 549.99,
    rating: 4,
    reviews: 133,
    badge: undefined,
    badgeColor: undefined,
    type: "Combiné",
    age: "Naissance",
    image: "https://images.unsplash.com/photo-1766858771690-9ab7b9df31c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 6,
    name: "Poussette Metis+ Blanc Nacre",
    brand: "Cybex",
    price: 649.00,
    originalPrice: undefined,
    rating: 4,
    reviews: 45,
    badge: undefined,
    badgeColor: undefined,
    type: "Trio",
    age: "Naissance",
    image: "https://images.unsplash.com/photo-1739742465381-ea53b939ae8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 7,
    name: "Poussette Jogging Run 3.0 Graphite",
    brand: "Thule",
    price: 799.00,
    originalPrice: 899.00,
    rating: 5,
    reviews: 28,
    badge: "Spécial sport",
    badgeColor: "#059669",
    type: "Jogging",
    age: "6 mois+",
    image: "https://images.unsplash.com/photo-1760259202854-1e05da21fe29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 8,
    name: "Poussette Pack Duo Activ3 FlatFold",
    brand: "Graco",
    price: 299.99,
    originalPrice: 379.99,
    rating: 3,
    reviews: 76,
    badge: "-21%",
    badgeColor: "#DC2626",
    type: "Léger",
    age: "Naissance",
    image: "https://images.unsplash.com/photo-1706459773588-20591994dca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 9,
    name: "Poussette Zelia² Nomad Sand",
    brand: "Maxi-Cosi",
    price: 549.00,
    originalPrice: undefined,
    rating: 4,
    reviews: 108,
    badge: undefined,
    badgeColor: undefined,
    type: "Combiné",
    age: "Naissance",
    image: "https://images.unsplash.com/photo-1766858771690-9ab7b9df31c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 10,
    name: "Poussette Bugaboo Fox 5 Noir Complet",
    brand: "Bugaboo",
    price: 1299.00,
    originalPrice: undefined,
    rating: 5,
    reviews: 187,
    badge: "Premium",
    badgeColor: "#2D3A2A",
    type: "Trio",
    age: "Naissance",
    image: "https://images.unsplash.com/photo-1739742465381-ea53b939ae8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 11,
    name: "Poussette Canne Joolz Aer+ Gris",
    brand: "Joolz",
    price: 449.00,
    originalPrice: 499.00,
    rating: 4,
    reviews: 53,
    badge: undefined,
    badgeColor: undefined,
    type: "Légère",
    age: "6 mois+",
    image: "https://images.unsplash.com/photo-1760259202854-1e05da21fe29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 12,
    name: "Poussette Nacelle Cam Avio Avio Navy",
    brand: "CAM",
    price: 389.00,
    originalPrice: 429.00,
    rating: 3,
    reviews: 34,
    badge: undefined,
    badgeColor: undefined,
    type: "Nacelle",
    age: "Naissance",
    image: "https://images.unsplash.com/photo-1706459773588-20591994dca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 13,
    name: "Poussette Mios 3 Urban Nomad",
    brand: "Cybex",
    price: 749.00,
    originalPrice: undefined,
    rating: 5,
    reviews: 91,
    badge: "Coup de cœur",
    badgeColor: "#87A878",
    type: "Combiné",
    age: "Naissance",
    image: "https://images.unsplash.com/photo-1760259202854-1e05da21fe29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 14,
    name: "Poussette Step & Go Evo Gris Silex",
    brand: "Chicco",
    price: 249.95,
    originalPrice: 299.95,
    rating: 4,
    reviews: 58,
    badge: "-17%",
    badgeColor: "#DC2626",
    type: "Légère",
    age: "6 mois+",
    image: "https://images.unsplash.com/photo-1739742465381-ea53b939ae8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
  {
    id: 15,
    name: "Poussette Viper 4 Sport Noir Intense",
    brand: "Joolz",
    price: 599.00,
    originalPrice: 649.00,
    rating: 4,
    reviews: 43,
    badge: undefined,
    badgeColor: undefined,
    type: "Jogging",
    age: "6 mois+",
    image: "https://images.unsplash.com/photo-1766858771690-9ab7b9df31c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    href: undefined,
  },
];

const BRANDS = ["Bébé Confort", "Babyzen", "Chicco", "Cybex", "Thule", "Graco", "Maxi-Cosi", "Bugaboo", "Joolz", "CAM"];
const AGES = ["Naissance", "6 mois+", "12 mois+"];
const SORT_OPTIONS = [
  { label: "Pertinence", value: "pertinence" },
  { label: "Prix croissant", value: "price_asc" },
  { label: "Prix décroissant", value: "price_desc" },
  { label: "Mieux notés", value: "rating" },
  { label: "Nouveautés", value: "new" },
];

// ── Pushs sous-catégories ─────────────────────────────────────────────────────
const SUB_CATS = [
  { label: "Pack poussette",            to: "#" },
  { label: "Poussette compacte & canne",to: "#" },
  { label: "Poussette multiple",        to: "#" },
  { label: "Chancelière poussette",     to: "#" },
  { label: "Accessoire poussette",      to: "#" },
  { label: "Remorque de vélo",          to: "#" },
  { label: "Sac à langer",             to: "#" },
  { label: "Porte bébé",               to: "#" },
  { label: "Écharpe de portage",        to: "#" },
  { label: "Promotions",               to: "#", highlight: true },
  { label: "Outlet",                   to: "#", highlight: true },
  { label: "Nouveautés",               to: "#", highlight: true },
];

const ADVICE_ARTICLES = [
  { label: "Comment choisir sa poussette ?",         to: "#" },
  { label: "Poussette trio ou combiné ?",            to: "#" },
  { label: "Top 10 poussettes 2025",                 to: "#" },
  { label: "Poussette : les critères essentiels",    to: "#" },
  { label: "Quel poids pour une poussette canne ?",  to: "#" },
  { label: "Guide poussette double",                 to: "#" },
];

function SubCatPushes() {
  return (
    <div className="bg-[#F0F4EE] border-b border-[#87A878]/30">
      <div className="w-full px-4 py-4 space-y-4">

        {/* Sous-catégories */}
        <div>
          <p className="text-[11px] text-[#5A7A52] uppercase tracking-widest font-semibold mb-2.5">
            Explorer par type
          </p>
          <div className="flex flex-wrap gap-2">
            {SUB_CATS.map((sc) => (
              <Link
                key={sc.label}
                to={sc.to}
                className="px-3 py-1.5 rounded-lg text-xs border transition-all duration-200 whitespace-nowrap"
                style={
                  sc.highlight
                    ? { backgroundColor: "#87A878", borderColor: "#6A9060", color: "white", fontWeight: 700 }
                    : { backgroundColor: "white", borderColor: "#e5e7eb", color: "#374151", fontWeight: 500 }
                }
                onMouseEnter={(e) => {
                  if (!sc.highlight) {
                    e.currentTarget.style.borderColor = "#87A878";
                    e.currentTarget.style.color = "#5A7A52";
                  } else {
                    e.currentTarget.style.backgroundColor = "#6A9060";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!sc.highlight) {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.color = "#374151";
                  } else {
                    e.currentTarget.style.backgroundColor = "#87A878";
                  }
                }}
              >
                {sc.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles conseils */}
        <div>
          <p className="text-[11px] text-[#5A7A52] uppercase tracking-widest font-semibold mb-2.5">
            Nos conseils
          </p>
          <div className="flex flex-wrap gap-2">
            {ADVICE_ARTICLES.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-dashed transition-all duration-200 whitespace-nowrap"
                style={{ backgroundColor: "white", borderColor: "#87A878", color: "#5A7A52", fontWeight: 500 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#87A878";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.fontWeight = "700";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#5A7A52";
                  e.currentTarget.style.fontWeight = "500";
                }}
              >
                <span style={{ fontSize: "10px" }}>✦</span>
                {a.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Bloc SEO ───────────────────────────────────────────────────────────────────
const SEO_LINKS = [
  "Poussette naissance", "Poussette légère", "Poussette trio", "Poussette canne",
  "Poussette double", "Poussette jogging", "Poussette Bugaboo", "Poussette Cybex",
  "Poussette Babyzen Yoyo", "Poussette Bébé Confort", "Poussette moins de 300€",
  "Meilleure poussette 2025",
];

function SeoBlock() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="w-full px-4 py-6 md:py-8">
        {/* Titre SEO + méta-stats */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
          <div className="flex-1">
            <h2 className="text-gray-900 mb-2" style={{ fontSize: "1.25rem", fontWeight: 800, lineHeight: 1.2 }}>
              Acheter une poussette en ligne — Toutes les grandes marques au meilleur prix
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Que vous cherchiez une <strong className="text-gray-700">poussette trio dès la naissance</strong>, une{" "}
              <strong className="text-gray-700">poussette canne légère</strong> pour voyager ou un{" "}
              <strong className="text-gray-700">système combiné</strong> évolutif, Allobébé vous propose une sélection de{" "}
              <strong className="text-gray-700">+120 modèles</strong> issus des marques leaders :{" "}
              Bugaboo, Cybex, Bébé Confort, Babyzen, Maxi-Cosi et bien d'autres.
            </p>
            {expanded && (
              <div className="mt-3 text-gray-500 text-sm leading-relaxed space-y-2">
                <p>
                  Nos conseillers experts sélectionnent chaque modèle selon des critères stricts : sécurité homologuée,
                  maniabilité, poids du châssis, confort du siège et facilité de pliage. Chaque fiche produit inclut
                  des photos détaillées, un comparatif technique et les avis vérifiés de parents.
                </p>
                <p>
                  Vous hésitez entre plusieurs modèles ? Profitez de notre service de <strong className="text-gray-700">reprise & échange</strong> et
                  de la livraison gratuite dès 59,90 € pour commander sereinement. Retrouvez également nos{" "}
                  <Link to="#" className="text-[#5A7A52] hover:underline font-medium">guides d'achat poussette</Link>{" "}
                  et nos comparatifs rédigés par des experts puériculture.
                </p>
              </div>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-xs text-[#5A7A52] hover:underline font-semibold flex items-center gap-1"
            >
              {expanded ? "Lire moins" : "Lire plus"}
              <ChevronDown size={12} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Méta-stats */}
          <div className="flex md:flex-col gap-3 md:gap-2 flex-shrink-0 flex-wrap">
            {[
              { value: "+120", label: "modèles" },
              { value: "10", label: "marques" },
              { value: "4.4★", label: "note moyenne" },
            ].map((s) => (
              null
            ))}
          </div>
        </div>

        {/* Garanties */}
        

        {/* Mots-clés SEO / liens populaires */}
        <div>
          
          
        </div>
      </div>
    </div>
  );
}

// ── Petit composant carte produit inline ────────────────────────────────────────
function ProdCard({ p }: { p: typeof ALL_PRODUCTS[0] }) {
  const [wish, setWish] = useState(false);
  const inner = (
    <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group relative flex flex-col h-full">
      {/* Badge */}
      {p.badge && (
        <span
          className="absolute top-2 left-2 z-10 text-[10px] px-2 py-0.5 rounded-full"
          style={{ backgroundColor: p.badgeColor, color: p.badgeColor === "#87A878" ? "#2D3A2A" : "#fff", fontWeight: 700 }}
        >
          {p.badge}
        </span>
      )}
      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWish(!wish); }}
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
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={10} className={s <= Math.round(p.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"} />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({p.reviews})</span>
        </div>
        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-gray-900 text-sm" style={{ fontWeight: 800 }}>{p.price.toFixed(2)} €</span>
          {p.originalPrice && (
            <>
              <span className="text-gray-400 line-through text-xs">{p.originalPrice.toFixed(2)} €</span>
              {p.originalPrice && (
                <span className="text-red-400 text-[10px]" style={{ fontWeight: 600 }}>
                  -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                </span>
              )}
            </>
          )}
        </div>
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

  if (p.href) return <Link to={p.href} className="block h-full">{inner}</Link>;
  return inner;
}

// ── Page principale ────────────────────────────────────────────────────────────
export function PoussettesPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(1500);
  const [sort, setSort] = useState("pertinence");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 15;

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ferme dropdown au clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const filtered = ALL_PRODUCTS.filter((p) => {
    if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
    if (selectedAges.length && !selectedAges.includes(p.age)) return false;
    if (p.price > priceMax) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const activeCount = selectedBrands.length + selectedAges.length + (priceMax < 1500 ? 1 : 0);

  const clearAll = () => {
    setSelectedBrands([]); setSelectedAges([]); setPriceMax(1500); setCurrentPage(1);
  };

  // ── Bouton filtre avec dropdown ────────────────────────────────────────────
  function FilterBtn({
    id, label, count, children,
  }: { id: string; label: string; count?: number; children: React.ReactNode }) {
    const isOpen = openDropdown === id;
    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs transition-all duration-150"
          style={{
            backgroundColor: count ? "#87A878" : "white",
            borderColor: count ? "#6A9060" : "#e5e7eb",
            color: count ? "#2D3A2A" : "#374151",
            fontWeight: count ? 700 : 600,
          }}
        >
          {label}
          {count ? (
            <span className="bg-[#2D3A2A] text-[#87A878] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
              {count}
            </span>
          ) : null}
          <ChevronDown size={12} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div className="absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-30 min-w-[200px] p-3">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="w-full px-4 py-2.5">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link to="/home" className="hover:text-[#5A7A52] transition-colors">Accueil</Link>
            <ChevronRight size={11} />
            <span className="text-gray-700 font-medium">Poussettes</span>
          </nav>
        </div>
      </div>

      {/* Hero catégorie */}
      <div className="bg-[#2D3A2A] text-white">
        <div className="w-full px-4 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <div className="text-[#FFCC00] text-xs mb-1 tracking-widest uppercase font-semibold">Mobilité</div>
              <h1 className="text-white mb-2" style={{ fontSize: "1.8rem", fontWeight: 900, lineHeight: 1.1 }}>
                Poussettes
              </h1>
              <p className="text-gray-300 text-sm max-w-xl">
                Du trio naissance à la poussette-canne ultra-légère : trouvez la poussette idéale pour vos aventures du quotidien.
              </p>
            </div>
            <div className="text-[#FFCC00] text-sm font-semibold whitespace-nowrap">
              {filtered.length} produit{filtered.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Bloc SEO */}
      <SeoBlock />

      {/* Pushs sous-catégories */}
      <SubCatPushes />

      {/* ── Barre de filtres horizontale sticky ── */}
      <div className="sticky top-[52px] z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full px-4 py-2.5" ref={dropdownRef}>
          <div className="flex items-center gap-2 flex-wrap">

            {/* Label */}
            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold mr-1 shrink-0">
              <SlidersHorizontal size={13} />
              Filtres
            </span>

            {/* Dropdown Marque */}
            <FilterBtn id="marque" label="Marque" count={selectedBrands.length || undefined}>
              <div className="space-y-1 max-h-52 overflow-y-auto">
                {BRANDS.map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1.5 hover:bg-[#F0F4EE] transition-colors group">
                    <div
                      className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        backgroundColor: selectedBrands.includes(b) ? "#87A878" : "white",
                        borderColor: selectedBrands.includes(b) ? "#6A9060" : "#d1d5db",
                      }}
                    >
                      {selectedBrands.includes(b) && <Check size={10} color="#2D3A2A" strokeWidth={3} />}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selectedBrands.includes(b)}
                      onChange={() => setSelectedBrands(toggle(selectedBrands, b))}
                    />
                    <span className="text-xs text-gray-700 group-hover:text-[#5A7A52]">{b}</span>
                  </label>
                ))}
              </div>
            </FilterBtn>

            {/* Dropdown Âge */}
            <FilterBtn id="age" label="Âge" count={selectedAges.length || undefined}>
              <div className="space-y-1">
                {AGES.map((a) => (
                  <label key={a} className="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1.5 hover:bg-[#F0F4EE] transition-colors group">
                    <div
                      className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        backgroundColor: selectedAges.includes(a) ? "#87A878" : "white",
                        borderColor: selectedAges.includes(a) ? "#6A9060" : "#d1d5db",
                      }}
                    >
                      {selectedAges.includes(a) && <Check size={10} color="#2D3A2A" strokeWidth={3} />}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selectedAges.includes(a)}
                      onChange={() => setSelectedAges(toggle(selectedAges, a))}
                    />
                    <span className="text-xs text-gray-700 group-hover:text-[#5A7A52]">{a}</span>
                  </label>
                ))}
              </div>
            </FilterBtn>

            {/* Dropdown Budget */}
            <FilterBtn id="prix" label="Budget" count={priceMax < 1500 ? 1 : undefined}>
              <div className="px-1 py-1 w-52">
                <div className="flex justify-between text-xs text-gray-500 mb-3">
                  <span>0 €</span>
                  <span className="text-[#5A7A52] font-bold">{priceMax} €</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1500}
                  step={50}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#87A878]"
                />
                <div className="flex justify-between mt-2 gap-2">
                  {[300, 600, 1000].map((v) => (
                    <button
                      key={v}
                      onClick={() => setPriceMax(v)}
                      className="flex-1 py-1 text-[10px] rounded border transition-colors"
                      style={{
                        borderColor: priceMax === v ? "#87A878" : "#e5e7eb",
                        backgroundColor: priceMax === v ? "#F0F4EE" : "white",
                        color: priceMax === v ? "#5A7A52" : "#6b7280",
                        fontWeight: priceMax === v ? 700 : 500,
                      }}
                    >
                      ≤ {v} €
                    </button>
                  ))}
                </div>
              </div>
            </FilterBtn>

            {/* Chips filtres actifs */}
            {selectedBrands.map((b) => (
              <span key={b} className="flex items-center gap-1 bg-[#F0F4EE] border border-[#87A878] text-[#5A7A52] text-[10px] px-2 py-1 rounded-full font-semibold">
                {b}
                <button onClick={() => setSelectedBrands(toggle(selectedBrands, b))} className="hover:text-red-500 transition-colors">
                  <X size={9} />
                </button>
              </span>
            ))}
            {selectedAges.map((a) => (
              <span key={a} className="flex items-center gap-1 bg-[#F0F4EE] border border-[#87A878] text-[#5A7A52] text-[10px] px-2 py-1 rounded-full font-semibold">
                {a}
                <button onClick={() => setSelectedAges(toggle(selectedAges, a))} className="hover:text-red-500 transition-colors">
                  <X size={9} />
                </button>
              </span>
            ))}
            {priceMax < 1500 && (
              <span className="flex items-center gap-1 bg-[#F0F4EE] border border-[#87A878] text-[#5A7A52] text-[10px] px-2 py-1 rounded-full font-semibold">
                Max {priceMax} €
                <button onClick={() => setPriceMax(1500)} className="hover:text-red-500 transition-colors">
                  <X size={9} />
                </button>
              </span>
            )}

            {/* Effacer tout */}
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="text-[11px] text-gray-400 hover:text-red-500 underline transition-colors ml-1"
              >
                Tout effacer
              </button>
            )}

            {/* Sort — poussé à droite */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-gray-400 hidden sm:inline shrink-0">Trier par :</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg text-xs pl-3 pr-7 py-2 text-gray-700 cursor-pointer focus:outline-none focus:border-[#87A878]"
                  style={{ fontWeight: 600 }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <span className="text-xs text-gray-400 hidden sm:inline shrink-0 ml-1">
                — {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-4 py-6">
        {/* Grille produits */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🛒</div>
            <div className="text-sm font-semibold text-gray-500">Aucun produit ne correspond à vos filtres</div>
            <button onClick={clearAll} className="mt-4 text-xs text-[#5A7A52] hover:underline font-semibold">
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginated.map((p) => (
              <ProdCard key={p.id} p={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-10">
            {/* Précédent */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 h-8 rounded-lg text-xs border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ borderColor: "#e5e7eb", color: "#6b7280", backgroundColor: "white" }}
            >
              ←
            </button>

            {/* Numéros de pages */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className="w-8 h-8 rounded-lg text-xs border transition-all"
                style={{
                  backgroundColor: n === currentPage ? "#87A878" : "white",
                  borderColor: n === currentPage ? "#6A9060" : "#e5e7eb",
                  color: n === currentPage ? "#2D3A2A" : "#6b7280",
                  fontWeight: n === currentPage ? 700 : 500,
                }}
              >
                {n}
              </button>
            ))}

            {/* Suivant */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 h-8 rounded-lg text-xs border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ borderColor: "#e5e7eb", color: "#6b7280", backgroundColor: "white" }}
            >
              →
            </button>

            {/* Info */}
            <span className="ml-2 text-xs text-gray-400 hidden sm:inline">
              Page {currentPage} / {totalPages} — {filtered.length} produit{filtered.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}