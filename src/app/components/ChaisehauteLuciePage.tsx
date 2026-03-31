import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductPurchaseEncart } from "./ProductPurchaseEncart";
import { ProductCard } from "./ProductCard";
import {
  ChevronRight, Star, Truck, ShieldCheck, Undo2, Heart,
  Minus, Plus, Info, Check, Package, RotateCcw, Clock,
  ArrowRight, Shield, Download, FileText, Camera, ThumbsUp, BookOpen, Utensils, Home, ShoppingCart, Gift
} from "lucide-react";

// --- Données Produits Similaires ---
const similarProducts = [
  {
    id: 1,
    name: "Chaise haute évolutive Beta+ naturelle",
    brand: "HAUCK",
    price: 119.90,
    originalPrice: 149.90,
    rating: 4.5,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1700786032675-2e96774127c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
  {
    id: 2,
    name: "Chaise haute pliante Sit N Fold",
    brand: "CHICCO",
    price: 79.90,
    originalPrice: 99.90,
    rating: 4.3,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1761891950950-43f6e457197e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
  {
    id: 3,
    name: "Chaise haute bois évolutive Threshold",
    brand: "STOKKE",
    price: 249.00,
    rating: 4.8,
    reviews: 211,
    image: "https://images.unsplash.com/photo-1714755685136-b4ba5804c618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
  {
    id: 4,
    name: "Réhausseur de chaise Pocket Snack",
    brand: "CHICCO",
    price: 34.90,
    rating: 4.6,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1622290319146-7b63df48a635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
  {
    id: 5,
    name: "Coussin réducteur pour chaise haute",
    brand: "BÉABA",
    price: 24.90,
    rating: 4.2,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
  {
    id: 6,
    name: "Chaise haute Up&Down",
    brand: "BÉABA",
    price: 189.90,
    originalPrice: 219.90,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1620875638370-8957e4dbd830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  }
];

// --- Accessoires / Compléments ---
const accessoriesData = [
  {
    id: 101,
    name: "Coussin d'assise confort Lucie",
    brand: "LUCIE",
    price: 29.90,
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1579737841108-888915152864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
  {
    id: 102,
    name: "Tablette amovible repas",
    brand: "LUCIE",
    price: 34.90,
    rating: 4.5,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1622290319146-7b63df48a635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
  {
    id: 103,
    name: "Harnais de sécurité 5 points",
    brand: "LUCIE",
    price: 19.90,
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
  {
    id: 104,
    name: "Bavoir silicone récupérateur",
    brand: "BÉABA",
    price: 12.90,
    rating: 4.9,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1522851239845-a764dcb27409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
];

// --- Avis Clients ---
const reviewsData = [
  {
    id: 1,
    author: "Sophie M.",
    date: "12 jan. 2026",
    rating: 5,
    title: "Parfaite pour débuter !",
    body: "Rapport qualité-prix imbattable. Ma fille de 8 mois l'adore, et le nettoyage est un jeu d'enfant. Je recommande vivement.",
    verified: true,
  },
  {
    id: 2,
    author: "Thomas L.",
    date: "3 fév. 2026",
    rating: 4,
    title: "Bien dans l'ensemble",
    body: "Solide et facile à monter. Le pliage est un peu raide au début mais ça se décoince avec le temps. Bon achat pour le prix.",
    verified: true,
  },
  {
    id: 3,
    author: "Camille D.",
    date: "18 jan. 2026",
    rating: 4,
    title: "Pratique et légère",
    body: "On l'emmène même chez les grands-parents. Poids plume et montage/démontage rapide. La tablette est vraiment pratique.",
    verified: false,
  }
];

// --- Expériences Parents ---
const parentExperiences = [
  {
    id: 1,
    name: "Aurélie T.",
    role: "Maman de Zoé",
    babyAge: "10 mois",
    date: "14 jan. 2026",
    rating: 5,
    verified: true,
    isExpert: false,
    avatar: "AT",
    avatarColor: "#E91E8C",
    text: "On l'a installée en 10 minutes chrono et Zoé adore ses repas dedans ! La tablette s'enlève facilement et passe au lave-vaisselle, un vrai bonheur. La chaise se plie bien, on la range dans un placard sans problème. Quelques traces au niveau des rivets mais rien de gênant. Je la recommande à toutes les jeunes mamans qui veulent un produit pratique sans se ruiner.",
    tags: ["Facile à nettoyer", "Pliage rapide", "Rapport qualité-prix"],
    photos: [
      "https://images.unsplash.com/photo-1758311849032-0f1eb48d3ee3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      "https://images.unsplash.com/photo-1548289227-b7d966b70003?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    ],
    helpful: 24,
  },
  {
    id: 2,
    name: "Claire L.",
    role: "Psychomotricienne & Experte Petite Enfance",
    babyAge: null,
    date: "27 jan. 2026",
    rating: 5,
    verified: true,
    isExpert: true,
    avatar: "CL",
    avatarColor: "#5A7A52",
    text: "La Tripp Trapp est un modèle que je recommande souvent en consultation. Sa capacité à offrir un soutien plantaire parfait et des angles à 90° (hanches, genoux, chevilles) est cruciale lors de la diversification alimentaire (DME) pour limiter les risques de fausse route. Son évolutivité en fait un investissement santé pérenne.",
    tags: ["Ergonomie validée", "Posturologie", "Sécurité DME"],
    photos: [],
    helpful: 89,
  },
];

const product = {
  id: "STK45678",
  brand: "STOKKE",
  name: "Chaise haute évolutive bois naturel - Tripp Trapp",
  price: 259.00,
  originalPrice: null,
  rating: 4.9,
  reviews: 412,
  description: "La chaise haute iconique qui grandit avec votre enfant. Conçue pour rapprocher votre bébé de la table familiale, la Tripp Trapp offre une assise ergonomique et confortable dès la naissance (avec accessoires) et tout au long de sa vie. Fabriquée en bois de hêtre européen robuste.",
  specs: [
    { label: "Âge", value: "Dès la naissance (avec newborn set) jusqu'à l'âge adulte" },
    { label: "Poids max", value: "136 kg" },
    { label: "Matériaux", value: "Bois de hêtre massif européen" },
    { label: "Dimensions", value: "49 x 46 x 79 cm" },
    { label: "Poids de la chaise", value: "7 kg" },
    { label: "Entretien", value: "Nettoyage facile avec un chiffon humide" }
  ],
  images: [
    "https://images.unsplash.com/photo-1552139118-812eaf0f7dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    "https://images.unsplash.com/photo-1648994517760-19afc8c7ba00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    "https://images.unsplash.com/photo-1714755685136-b4ba5804c618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
  ],
  colors: [
    { name: "Bois naturel", hex: "#D4C4B7", active: true },
    { name: "Blanc", hex: "#FFFFFF", active: false },
    { name: "Gris tempête", hex: "#8A8D8F", active: false },
    { name: "Noir", hex: "#2C2C2C", active: false }
  ]
};

function Accordion({ title, icon: Icon, children, defaultOpen = false }: { title: string, icon: any, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-6 last:border-0 first:pt-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group text-left"
      >
        <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
          <Icon size={20} className="text-[#87A878]" /> {title}
        </h2>
        <span className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-[#F0F4EE] transition-colors shrink-0 ml-4">
          {isOpen ? <Minus size={16} className="text-[#87A878]" /> : <Plus size={16} className="text-gray-400 group-hover:text-[#87A878]" />}
        </span>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ChaisehauteLuciePage() {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const cartButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Apparaît au moment exact où le haut du bouton touche le haut de l'écran (le scroll passe dessus)
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

  return (
    <div className="bg-white min-h-screen pb-28 lg:pb-0">
      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="w-full px-4 lg:px-8 py-3 flex items-center gap-2 text-xs font-medium text-gray-500 flex-wrap">
          <Link to="/home" className="hover:text-[#5A7A52] transition-colors">Accueil</Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="hover:text-[#5A7A52] cursor-pointer transition-colors">Repas</span>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="hover:text-[#5A7A52] cursor-pointer transition-colors">Chaises hautes</span>
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
                  </div>
                </div>
                
                {/* Couleurs */}
                <div className="mb-6 lg:mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-700">Couleur</span>
                    <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">{product.colors.find(c => c.active)?.name}</span>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color, idx) => (
                      <button 
                        key={idx}
                        className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${color.active ? 'border-gray-900 scale-110 shadow-sm' : 'border-transparent hover:scale-105 hover:border-gray-200'}`}
                        title={color.name}
                      >
                        <div className="w-full h-full rounded-full border border-gray-200" style={{ backgroundColor: color.hex }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prix (Mobile) & Quantité & Panier */}
                <div className="lg:hidden mb-4">
                  <span className="text-3xl font-black text-gray-900">{product.price.toFixed(2)} €</span>
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
            {/* Encart Location déplacé à gauche */}
            <div className="pt-2 lg:pt-0">
              <ProductPurchaseEncart type="location" className="shadow-sm border-dashed border-[#87A878]/40 bg-[#F4F7F4]/50" />
            </div>

            {/* Accessoires (Nouveau Carrousel Plus Haut) */}
            <div className="border-t border-gray-100 pt-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Plus size={20} className="text-[#87A878]" /> Complétez votre achat
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
                  {accessoriesData.map(acc => (
                    <div key={acc.id} className="px-2 pb-6">
                      <ProductCard product={acc} />
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

              <Accordion title="Caractéristiques" icon={Check}>
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
              
              <Accordion title="Documents utiles" icon={FileText}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a href="#" className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#87A878] hover:bg-[#F0F4EE] transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-white transition-colors">
                      <Download size={18} className="text-gray-500 group-hover:text-[#5A7A52]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Notice de montage</h3>
                      <p className="text-xs text-gray-500 mt-0.5">PDF - 2.4 Mo</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#87A878] hover:bg-[#F0F4EE] transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-white transition-colors">
                      <Download size={18} className="text-gray-500 group-hover:text-[#5A7A52]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Guide d'ergonomie</h3>
                      <p className="text-xs text-gray-500 mt-0.5">PDF - 1.8 Mo</p>
                    </div>
                  </a>
                </div>
              </Accordion>

              {/* ── Guides & Conseils (Arborescence) ── */}
              <Accordion title="Guides & Conseils associés" icon={BookOpen}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <ul className="space-y-6">
                    <li>
                      <div className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                        <Home size={18} className="text-[#87A878]" /> 
                        <span>Équipement de la maison</span>
                      </div>
                      <ul className="pl-6 border-l-2 border-gray-200 ml-[9px] space-y-2.5 text-sm">
                        <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Comment bien choisir sa chaise haute ? <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                        <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Chaise haute évolutive vs classique : le match <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                      </ul>
                    </li>
                    <li>
                      <div className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                        <Utensils size={18} className="text-[#87A878]" /> 
                        <span>Alimentation & Repas</span>
                      </div>
                      <ul className="pl-6 border-l-2 border-gray-200 ml-[9px] space-y-2.5 text-sm">
                        <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Diversification Menée par l'Enfant (DME) : par où commencer ? <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                        <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Les indispensables pour les premiers repas de bébé <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </Accordion>
            </div>
            
            {/* ── Avis et Témoignages ── */}
            <div className="border-t border-gray-100 pt-6 flex flex-col gap-8">
              
              {/* Expériences Parents (Images) */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Camera size={20} className="text-[#87A878]" /> En vrai, ça donne quoi ?
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {parentExperiences.map(exp => (
                    <div key={exp.id} className={`border rounded-2xl p-5 transition-colors shadow-sm relative mt-2 ${exp.isExpert ? 'bg-[#F4F7F4] border-[#87A878]/30 hover:border-[#87A878]/60' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
                      {exp.isExpert && (
                        <div className="absolute -top-3 right-5 bg-[#5A7A52] text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <ShieldCheck size={12} /> Avis d'expert
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: exp.avatarColor }}>
                            {exp.avatar}
                          </div>
                          <div>
                            <div className={`font-bold text-sm ${exp.isExpert ? 'text-[#3f5739]' : 'text-gray-900'}`}>
                              {exp.name} {exp.verified && !exp.isExpert && <Check size={12} className="inline text-green-500 bg-green-50 rounded-full p-0.5 ml-1" />}
                              {exp.verified && exp.isExpert && <Check size={12} className="inline text-white bg-[#87A878] rounded-full p-0.5 ml-1" />}
                            </div>
                            <div className="text-xs text-gray-500">
                              {exp.role} {exp.babyAge && `• Bébé de ${exp.babyAge}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < exp.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
                          ))}
                        </div>
                      </div>
                      <p className={`${exp.isExpert ? 'text-gray-700 font-medium' : 'text-gray-600'} text-sm leading-relaxed mb-4`}>"{exp.text}"</p>
                      {exp.photos && exp.photos.length > 0 && (
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                          {exp.photos.map((photo, i) => (
                            <img key={i} src={photo} alt="Utilisation produit" className="w-24 h-24 object-cover rounded-xl shrink-0" />
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex gap-2 flex-wrap">
                          {exp.tags.map((tag, i) => (
                            <span key={i} className={`text-[10px] px-2 py-1 rounded-md border ${exp.isExpert ? 'bg-white/60 text-[#5A7A52] border-[#87A878]/30 font-semibold' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                          <ThumbsUp size={14} /> {exp.helpful}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Liste des avis classiques */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-1">
                      <Star size={20} className="text-[#87A878] fill-[#87A878]" /> Avis clients vérifiés
                    </h2>
                    <p className="text-sm text-gray-500">Basé sur {product.reviews} avis collectés</p>
                  </div>
                  <button className="text-[#5A7A52] font-semibold text-sm hover:underline">
                    Écrire un avis
                  </button>
                </div>
                
                <div className="space-y-6">
                  {reviewsData.map(review => (
                    <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900 text-sm">{review.author}</span>
                            {review.verified && (
                              <span className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                <Check size={10} /> Achat vérifié
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{review.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 border border-gray-200 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Voir tous les avis
                </button>
              </section>

            </div>
          </div>

        </div>

        {/* ── Produits similaires (Full width) ── */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Les parents ont aussi regardé</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similarProducts.map((p, idx) => (
              <ProductCard key={idx} product={p} href="#" />
            ))}
          </div>
        </div>

      </div>

      {/* ── STICKY BOTTOM BAR (Mobile) ── */}
      {isStickyVisible && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/60 px-4 py-3 z-[100] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] animate-in slide-in-from-bottom-2 fade-in duration-200">
          <button className="w-full bg-[#5A7A52] hover:bg-[#466040] text-white py-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-[#5A7A52]/20 active:scale-[0.98] transition-all">
            <ShoppingCart size={20} />
            Ajouter au panier
          </button>
        </div>
      )}

    </div>
  );
}