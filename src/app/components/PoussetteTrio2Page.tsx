import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductPurchaseEncart } from "./ProductPurchaseEncart";
import { ProductCard } from "./ProductCard";
import { Accordion } from "./Accordion";
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Check,
  Truck,
  RotateCcw,
  Shield,
  Package,
  ZoomIn,
  Quote,
  BookOpen,
  ArrowRight,
  Lightbulb,
  Baby,
  AlertCircle,
  ThumbsUp,
  Camera,
  MessageSquare,
  X,
  Upload,
  ImageIcon,
  Navigation,
  Wind,
  Weight,
  Plus,
  Minus,
  Info,
  FileText,
  Gift,
  Home,
  Download
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// ─── Données produit ────────────────────────────────────────────────────────
const product = {
  name: "Poussette Trio Chrome 2",
  brand: "BÉBÉ CONFORT",
  price: 549.90,
  originalPrice: 699.90,
  discount: -21,
  badge: "Nouveau",
  rating: 4.6,
  reviews: 214,
  stock: 8,
  description:
    "La Poussette Trio Chrome 2 de Bébé Confort est le système de mobilité complet pour accompagner bébé de la naissance jusqu'à 3,5 ans. Ce pack 3-en-1 inclut un siège auto groupe 0+ (0-13 kg), une nacelle confortable pour les premiers mois et un siège poussette évolutif. La structure aluminium ultra-légère (seulement 9,9 kg) se plie en un seul geste, et le châssis robuste s'adapte à tous les terrains grâce à ses grandes roues pivotantes.",
  colors: [
    { label: "Gris Graphite", value: "graphite", hex: "#4b5563", active: true },
    { label: "Bleu Nuit", value: "midnight", hex: "#1e3a5f" },
    { label: "Sable Doux", value: "sand", hex: "#c4a882" },
  ],
  images: [
    "https://images.unsplash.com/photo-1770060635985-fcbb00b5285d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    "https://images.unsplash.com/photo-1768580859790-bf5a89fdbedc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    "https://images.unsplash.com/photo-1600563093202-337471bde37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    "https://images.unsplash.com/photo-1582601636383-5a37c4748791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  ],
  features: [
    "Pack 3-en-1 : siège auto + nacelle + siège poussette",
    "Siège auto groupe 0+ compatible Isofix (base vendue séparément)",
    "Châssis aluminium ultra-léger : 9,9 kg",
    "Pliage en 1 geste, tient debout replié",
    "Grandes roues pivotantes avec blocage 4 roues",
    "Poignée réglable en hauteur (5 positions)",
    "Nacelle homologuée pour dormir la nuit (EN 1888)",
    "Siège réversible face aux parents ou face à la route",
    "Protection UV 50+ intégrée sur la capote",
    "Compatible de 0 à 22 kg (nacelle : jusqu'à 9 kg)",
    "Panier de rangement XXL sous la nacelle (15 kg max)",
    "Certifié EN 1888-2 et R44",
  ],
  specs: [
    { label: "Marque", value: "BÉBÉ CONFORT" },
    { label: "Modèle", value: "Trio Chrome 2" },
    { label: "Âge", value: "De la naissance à 3,5 ans" },
    { label: "Poids max nacelle", value: "9 kg" },
    { label: "Poids max siège", value: "22 kg" },
    { label: "Poids châssis", value: "9,9 kg" },
    { label: "Dimensions ouvert", value: "97 × 62 × 106 cm" },
    { label: "Dimensions replié", value: "75 × 62 × 36 cm" },
    { label: "Matière châssis", value: "Aluminium" },
    { label: "Harnais", value: "5 points réglable" },
    { label: "Norme", value: "EN 1888-2 / R44" },
    { label: "Garantie", value: "2 ans" },
  ],
};

// ─── Documents produit ───────────────────────────────────────────────────────
const productDocs = [
  {
    id: "notice-trio2-fr",
    type: "notice",
    label: "Notice d'utilisation Trio Chrome 2",
    description: "Mode d'emploi complet : montage châssis, fixation nacelle, siège auto, réglages et entretien.",
    filename: "Notice_TrioChrome2_BC_FR.pdf",
    size: "6,8 Mo",
  },
];

// ─── Produits similaires ────────────────────────────────────────────────────
const similarProducts = [
  {
    id: 1,
    name: "Poussette Yoyo² 6+ Babyzen",
    brand: "BABYZEN",
    price: 549.00,
    originalPrice: 599.00,
    rating: 4.8,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1548142640-825a9601f0f9?w=300&q=80",
    slug: "/produit/poussette-yoyo2-babyzen",
  },
  {
    id: 2,
    name: "Poussette Bugaboo Bee 6",
    brand: "BUGABOO",
    price: 749.00,
    rating: 4.7,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1770060635985-fcbb00b5285d?w=300&q=80",
    slug: "/produit/poussette-bugaboo-bee-6",
  },
  {
    id: 3,
    name: "Poussette Cybex Eezy S Twist 2",
    brand: "CYBEX",
    price: 379.90,
    originalPrice: 449.90,
    rating: 4.5,
    reviews: 93,
    image: "https://images.unsplash.com/photo-1768580859790-bf5a89fdbedc?w=300&q=80",
    slug: "/produit/poussette-cybex-eezy-s-twist-2",
  },
  {
    id: 4,
    name: "Poussette Joie Mytrax Flex",
    brand: "JOIE",
    price: 299.90,
    originalPrice: 349.90,
    rating: 4.3,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=300&q=80",
    slug: "/produit/poussette-joie-mytrax-flex",
  },
];

// ─── Avis clients ───────────────────────────────────────────────────────────
const reviewsData = [
  {
    id: 1,
    author: "Élodie M.",
    date: "18 jan. 2026",
    rating: 5,
    title: "La meilleure poussette trio du marché !",
    body: "On l'a depuis 4 mois et c'est vraiment une merveille. Le pliage est ultra rapide, la nacelle est confortable et bébé y dort parfaitement. Légère malgré la taille. Je recommande à 100 %.",
    verified: true,
  },
  {
    id: 2,
    author: "Antoine B.",
    date: "2 fév. 2026",
    rating: 4,
    title: "Très bien, quelques petits détails à améliorer",
    body: "Excellente poussette dans l'ensemble. Le pliage est vraiment simple comme annoncé. Seul bémol : la base Isofix vendue séparément aurait pu être incluse. Mais le produit est de grande qualité.",
    verified: true,
  },
  {
    id: 3,
    author: "Sarah K.",
    date: "28 jan. 2026",
    rating: 5,
    title: "Investissement largement rentabilisé",
    body: "On l'a utilisée depuis la naissance (nacelle) et maintenant notre fils de 14 mois est dans le siège. La qualité de fabrication est irréprochable, les roues pivotent vraiment bien en ville.",
    verified: true,
  },
];

// ─── Expériences de parents ─────────────────────────────────────────────────
const parentExperiences = [
  {
    id: 1,
    name: "Laura & Julien",
    role: "Parents de Tom",
    babyAge: "4 mois",
    date: "20 jan. 2026",
    rating: 5,
    verified: true,
    avatar: "LJ",
    avatarColor: "#E91E8C",
    text: "On a hésité longtemps avant d'investir dans ce modèle, et on ne regrette absolument pas. La nacelle est vraiment bien coussinée, Tom y dort ses siestes comme un charme. Le siège auto s'installe et se retire en 2 secondes du châssis. Et le pliage… on l'a chronométré : 4 secondes ! La poignée réglable en hauteur est un vrai plus pour mon mari qui fait 1m90. À recommander les yeux fermés.",
    tags: ["Pliage ultra-rapide", "Nacelle confortable", "Châssis léger"],
    photos: [
      "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=400&q=80",
    ],
    helpful: 38,
  },
  {
    id: 2,
    name: "Nadia R.",
    role: "Maman de Sofia",
    babyAge: "11 mois",
    date: "5 fév. 2026",
    rating: 5,
    verified: true,
    avatar: "NR",
    avatarColor: "#FF6B35",
    text: "Sofia a commencé dans la nacelle à la naissance et on vient de passer au siège. La transition est simple et le siège réversible permet à Sofia de nous voir pendant les promenades — elle adore ça ! Les grandes roues passent vraiment partout, même sur les pavés de notre quartier ancien. Le panier est énorme, je fais presque mes courses à pied désormais.",
    tags: ["Siège réversible", "Grandes roues", "Panier XXL"],
    photos: [
      "https://images.unsplash.com/photo-1770060635985-fcbb00b5285d?w=400&q=80",
      "https://images.unsplash.com/photo-1768580859790-bf5a89fdbedc?w=400&q=80",
    ],
    helpful: 27,
  },
  {
    id: 3,
    name: "Pierre D.",
    role: "Papa de Léa & Noa",
    babyAge: "8 mois",
    date: "14 fév. 2026",
    rating: 4,
    verified: true,
    avatar: "PD",
    avatarColor: "#2D3A2A",
    text: "Deuxième enfant, deuxième poussette trio — mais cette fois on a choisi la Chrome 2 et quelle différence ! Le châssis aluminium est vraiment rigide, on sent la qualité. L'attache du siège auto est bien sécurisée, j'ai testé dans tous les sens. Un seul regret : j'aurais aimé que la base Isofix soit incluse dans le pack. Mais dans l'ensemble, excellente poussette.",
    tags: ["Qualité châssis", "Sécurité siège auto", "Polyvalent"],
    photos: [],
    helpful: 15,
  },
];

// ─── Composants utilitaires ─────────────────────────────────────────────────

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((count / total) * 100);
  return (
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <span className="w-12 text-right shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-right text-gray-400">{count}</span>
    </div>
  );
}

function PhotoModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        onClick={onClose}
      >
        <X size={20} className="text-white" />
      </button>
      <img
        src={src}
        alt="Photo agrandie"
        className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
      />
    </div>
  );
}

function ParentExperienceCard({
  exp,
  onPhotoClick,
}: {
  exp: typeof parentExperiences[0];
  onPhotoClick: (src: string) => void;
}) {
  const [helpfulCount, setHelpfulCount] = useState(exp.helpful);
  const [voted, setVoted] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
            style={{ backgroundColor: exp.avatarColor }}
          >
            {exp.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-900 text-sm font-bold">{exp.name}</span>
              {exp.verified && (
                <span className="flex items-center gap-0.5 text-[9px] font-bold text-[#5A7A52] bg-[#F0F4EE] px-1.5 py-0.5 rounded-full">
                  <Check size={8} /> Achat vérifié
                </span>
              )}
            </div>
            <div className="text-gray-400 text-[11px]">
              {exp.role} · {exp.babyAge} · {exp.date}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={12}
              className={s <= exp.rating ? "fill-[#87A878] text-[#87A878]" : "fill-gray-200 text-gray-200"}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {exp.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-4">{exp.text}</p>

      {exp.photos.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {exp.photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => onPhotoClick(photo)}
              className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-200 hover:border-[#87A878] transition-colors"
            >
              <img src={photo} alt={`Photo ${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-2">
        <button
          onClick={() => {
            if (!voted) {
              setHelpfulCount((c) => c + 1);
              setVoted(true);
            }
          }}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
            voted ? "text-[#5A7A52]" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <ThumbsUp size={14} className={voted ? "fill-[#5A7A52]" : ""} />
          Utile ({helpfulCount})
        </button>
        <button className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1.5">
          <MessageSquare size={14} /> Répondre
        </button>
      </div>
    </div>
  );
}

// ─── Page principale ─────────────────────────────────────────────────────────

export function PoussetteTrio2Page() {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [modalPhoto, setModalPhoto] = useState<string | null>(null);
  const cartButtonRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, hasListeNaissance, user } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top <= 0 && !entry.isIntersecting) {
          setIsStickyVisible(true);
        } else {
          setIsStickyVisible(false);
        }
      },
      { threshold: 1.0 }
    );

    if (cartButtonRef.current) {
      observer.observe(cartButtonRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const ratingDist = [
    { label: "5 ★", count: 108 },
    { label: "4 ★", count: 72 },
    { label: "3 ★", count: 21 },
    { label: "2 ★", count: 8 },
    { label: "1 ★", count: 5 },
  ];
  const totalReviews = ratingDist.reduce((s, r) => s + r.count, 0);

  return (
    <div className="bg-white min-h-screen pb-28 lg:pb-0">
      {modalPhoto && <PhotoModal src={modalPhoto} onClose={() => setModalPhoto(null)} />}

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="w-full px-4 lg:px-8 py-3 flex items-center gap-2 text-xs font-medium text-gray-500 flex-wrap">
          <Link to="/home" className="hover:text-[#5A7A52] transition-colors">Accueil</Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="hover:text-[#5A7A52] cursor-pointer transition-colors">Mobilité</span>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="hover:text-[#5A7A52] cursor-pointer transition-colors">Poussettes trio</span>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-gray-900 font-semibold">{product.brand}</span>
        </div>
      </div>

      <div className="w-full px-4 lg:px-8 pt-4 pb-10 lg:pt-6 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-10 items-start">
          
          {/* ── MOBILE ONLY : Titre & Prix ── */}
          <div className="lg:hidden flex flex-col mb-1">
            <div className="flex justify-between items-start mb-1.5">
              <div>
                <p className="text-[#87A878] font-bold text-[11px] uppercase tracking-widest mb-0.5">{product.brand}</p>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">{product.name}</h1>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                  <span className="text-xs text-gray-500 underline decoration-gray-300 underline-offset-2">({product.reviews} avis)</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">En stock</span>
            </div>
          </div>

          {/* ── COLONNE GAUCHE (PARTIE 1) : Galerie ── */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <div className="flex flex-col-reverse md:flex-row gap-4 -mx-4 lg:mx-0">
              <div className="flex md:flex-col gap-3 overflow-x-auto px-4 lg:px-0 md:w-20 lg:w-24 shrink-0 scrollbar-hide">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all shrink-0 w-20 md:w-full ${
                      activeImage === i ? "border-[#87A878] ring-2 ring-[#87A878]/20" : "border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <img src={src} alt={`Vue ${i+1}`} className="w-full h-full object-cover mix-blend-multiply" />
                  </button>
                ))}
              </div>
              <div className="flex-1 bg-[#F8FAF8] lg:rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-square relative flex items-center justify-center lg:border lg:border-gray-100">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover animate-in fade-in duration-500 mix-blend-multiply"
                />
                <button
                  onClick={() => setWished(!wished)}
                  className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-sm hover:scale-105 transition-transform"
                >
                  <Heart size={20} className={wished ? "fill-red-400 text-red-400" : "text-gray-400"} />
                </button>
              </div>
            </div>
          </div>

          {/* ── COLONNE DROITE : Panneau d'achat collant ── */}
          <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 mt-2 lg:mt-0">
            <div className="lg:sticky lg:top-24 space-y-6 lg:space-y-8">
              
              {/* Panneau Principal d'achat */}
              <div className="bg-white lg:border lg:border-gray-200 lg:rounded-3xl lg:p-8 lg:shadow-xl lg:shadow-gray-100/50">
                
                {/* ── DESKTOP ONLY : Titre & Prix (Masqué sur mobile) ── */}
                <div className="hidden lg:block">
                  <p className="text-[#87A878] font-bold text-xs uppercase tracking-widest mb-2">
                    {product.brand}
                  </p>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          className={s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                    <span className="text-sm text-gray-400 underline decoration-gray-300 underline-offset-2 cursor-pointer hover:text-gray-600">
                      ({product.reviews} avis)
                    </span>
                  </div>

                  <div className="flex items-end gap-3 mb-8">
                    <span className="text-4xl font-black text-gray-900">{product.price.toFixed(2)} €</span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through mb-1.5">{product.originalPrice.toFixed(2)} €</span>
                    )}
                  </div>
                </div>
                
                {/* Couleurs */}
                <div className="mb-6 lg:mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-700">Couleur</span>
                    <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">{product.colors.find(c => c.active)?.label}</span>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color, idx) => (
                      <button 
                        key={idx}
                        className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${color.active ? 'border-gray-900 scale-110 shadow-sm' : 'border-transparent hover:scale-105 hover:border-gray-200'}`}
                        title={color.label}
                      >
                        <div className="w-full h-full rounded-full border border-gray-200" style={{ backgroundColor: color.hex }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prix (Mobile) & Quantité & Panier */}
                <div className="lg:hidden mb-4">
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-black text-gray-900">{product.price.toFixed(2)} €</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through mb-1">{product.originalPrice.toFixed(2)} €</span>
                    )}
                  </div>
                </div>
                <div ref={cartButtonRef} className="flex flex-col sm:flex-row gap-4 mb-4 lg:mb-6">
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-full px-4 py-3 sm:py-2 lg:py-3 w-full sm:w-32 shrink-0">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-gray-500 hover:text-gray-900 p-1">
                      <Minus size={18} />
                    </button>
                    <span className="font-semibold text-gray-900 w-8 text-center">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="text-gray-500 hover:text-gray-900 p-1">
                      <Plus size={18} />
                    </button>
                  </div>
                  <button className="flex-1 bg-[#5A7A52] hover:bg-[#466040] text-white py-4 sm:py-3 lg:py-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#5A7A52]/20 active:scale-[0.98]">
                    <ShoppingCart size={20} />
                    Ajouter au panier
                  </button>
                </div>
                
                {/* Liste de naissance */}
                <button className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                  <Gift size={18} />
                  Ajouter à une liste de naissance
                </button>
              </div>

              {/* Encart spécifique sous le bouton d'ajout au panier */}
              <div className="pt-6 lg:pt-0">
                <ProductPurchaseEncart type="classic" />
              </div>
            </div>
          </div>

          {/* ── COLONNE GAUCHE (PARTIE 2) : Suite des détails ── */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2 flex flex-col gap-6 lg:gap-10">
            {/* Encart Location */}
            <div className="pt-2 lg:pt-0">
              <ProductPurchaseEncart type="location" className="shadow-sm border-dashed border-[#87A878]/40 bg-[#F4F7F4]/50" />
            </div>

            {/* Produits Similaires */}
            <div className="border-t border-gray-100 pt-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Plus size={20} className="text-[#87A878]" /> Vous aimerez aussi
              </h2>
              
              <style>{`
                .slick-dots li button:before { color: #87A878 !important; opacity: 0.25; }
                .slick-dots li.slick-active button:before { opacity: 1; }
              `}</style>

              <div className="mx-[-8px]">
                <Slider 
                  dots={true} 
                  infinite={false} 
                  speed={500} 
                  slidesToShow={3} 
                  slidesToScroll={1}
                  arrows={false}
                  responsive={[
                    { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, dots: true } },
                    { breakpoint: 480, settings: { slidesToShow: 1.5, slidesToScroll: 1, dots: false } }
                  ]}
                >
                  {similarProducts.map(p => (
                    <div key={p.id} className="px-2 pb-6">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            {/* Description & Caractéristiques en Accordéons */}
            <div className="border-t border-gray-100 pt-4">
              <Accordion title="Description du produit" icon={Info} defaultOpen={true}>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </Accordion>

              <Accordion title="Points forts" icon={Star}>
                <ul className="space-y-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-gray-700">
                      <Check size={16} className="text-[#5A7A52] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Accordion>

              <Accordion title="Caractéristiques" icon={FileText}>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden">
                  <ul className="divide-y divide-gray-100">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex px-5 py-4 text-sm hover:bg-white transition-colors">
                        <span className="w-1/3 text-gray-500 font-medium">{spec.label}</span>
                        <span className="w-2/3 text-gray-900 font-semibold">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Accordion>
              
              <Accordion title="Documents utiles" icon={Download}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {productDocs.map((doc, i) => (
                    <a key={i} href="#" className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#87A878] hover:bg-[#F0F4EE] transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-white transition-colors shrink-0">
                        <FileText size={18} className="text-gray-500 group-hover:text-[#5A7A52]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{doc.label}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">PDF - {doc.size}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </Accordion>

              {/* Guides & Conseils */}
              <Accordion title="Guides & Conseils associés" icon={BookOpen}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <ul className="space-y-6">
                    <li>
                      <div className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                        <Navigation size={18} className="text-[#87A878]" /> 
                        <span>Mobilité et Poussettes</span>
                      </div>
                      <ul className="pl-6 border-l-2 border-gray-200 ml-[9px] space-y-2.5 text-sm">
                        <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Comment bien choisir sa poussette trio ? <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                        <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Poussette de ville vs poussette tout-terrain <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                      </ul>
                    </li>
                  </ul>
                  
                  <div className="mt-6 pt-5 border-t border-gray-200">
                    <Link to="/guides" className="text-[#5A7A52] font-semibold text-sm flex items-center gap-1.5 hover:underline">
                      Voir tous nos guides <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Accordion>
            </div>

            {/* ── AVIS CLIENTS ET EXPÉRIENCES PARENTS ── */}
            <div className="border-t border-gray-100 pt-8" id="reviews">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Avis clients</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold text-gray-900">{product.rating}</span>
                      <Star size={18} className="fill-[#87A878] text-[#87A878]" />
                    </div>
                    <span className="text-sm text-gray-500">Basé sur {totalReviews} avis</span>
                  </div>
                </div>
                <button className="hidden sm:block px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors">
                  Rédiger un avis
                </button>
              </div>

              {/* Répartition des notes */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-8 items-center border border-gray-100">
                <div className="w-full md:w-1/2 space-y-2">
                  {ratingDist.map((r, i) => (
                    <RatingBar key={i} label={r.label} count={r.count} total={totalReviews} />
                  ))}
                </div>
                <div className="w-full md:w-1/2 md:border-l border-gray-200 md:pl-8">
                  <div className="text-center md:text-left">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm mb-3 text-[#5A7A52]">
                      <MessageSquare size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Partagez votre expérience</h3>
                    <p className="text-sm text-gray-500 mb-4">Aidez d'autres parents à faire le bon choix en donnant votre avis.</p>
                    <button className="sm:hidden w-full px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors">
                      Rédiger un avis
                    </button>
                  </div>
                </div>
              </div>

              {/* Photos partagées */}
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Camera size={18} className="text-[#87A878]" /> Photos de notre communauté
              </h3>
              <div className="flex gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {parentExperiences.flatMap((exp) => exp.photos).map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setModalPhoto(photo)}
                    className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-gray-200 hover:border-[#87A878] group"
                  >
                    <img src={photo} alt="Communauté" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={14} className="text-gray-700" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Expériences détaillées */}
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ThumbsUp size={18} className="text-[#87A878]" /> Les avis les plus utiles
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                {parentExperiences.map((exp) => (
                  <ParentExperienceCard key={exp.id} exp={exp} onPhotoClick={setModalPhoto} />
                ))}
              </div>
              <div className="text-center">
                <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-full font-bold text-sm hover:border-gray-900 hover:text-gray-900 transition-colors">
                  Voir tous les avis
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── MOBILE STICKY BOTTOM BUY BAR ── */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 lg:hidden transition-transform duration-300 ${isStickyVisible ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <div className="flex-1">
            <div className="text-xs text-gray-500 font-medium mb-0.5">Total</div>
            <div className="text-xl font-black text-gray-900 leading-none">{(product.price * qty).toFixed(2)} €</div>
          </div>
          <button className="flex-[2] bg-[#5A7A52] text-white py-3.5 px-6 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-[#5A7A52]/20 active:scale-[0.98] transition-transform">
            <ShoppingCart size={18} />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}