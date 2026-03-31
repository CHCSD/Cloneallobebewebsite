import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ProductPurchaseEncart } from "./ProductPurchaseEncart";
import {
  ChevronRight, Star, Truck, ShieldCheck, Undo2, Heart,
  Minus, Plus, Info, Check, Package, RotateCcw, Clock,
  ArrowRight, Shield
} from "lucide-react";

const product = {
  id: "PAMP12345",
  brand: "PAMPERS",
  name: "Couches Premium Douceur Taille 2 (4-8 kg) - Pack 1 mois",
  price: 45.90,
  originalPrice: 59.90,
  discount: -23,
  rating: 4.8,
  reviews: 124,
  description: "Protégez la peau délicate de votre bébé avec nos couches ultra-douces et respirantes. Conçues sans lotion, sans parfum et avec des matériaux certifiés Oeko-Tex, elles offrent jusqu'à 12h de protection anti-fuites pour des nuits sereines.",
  specs: [
    { label: "Taille", value: "Taille 2 (4 à 8 kg)" },
    { label: "Quantité", value: "168 couches" },
    { label: "Durée", value: "Environ 1 mois" },
    { label: "Composition", value: "Sans parfum, certifié Oeko-Tex" }
  ],
  images: [
    "https://images.unsplash.com/photo-1738771977689-da69c7eb8317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    "https://images.unsplash.com/photo-1620875638370-8957e4dbd830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    "https://images.unsplash.com/photo-1762361962969-9e1484e8c8b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
  ]
};

export function CouchesBebePage() {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [purchaseMode, setPurchaseMode] = useState<"one-time" | "subscription">("subscription");
  const [wished, setWished] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const cartButtonRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="bg-white min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="w-full mx-auto px-4 py-3 flex items-center gap-2 text-xs font-medium text-gray-500 flex-wrap">
          <Link to="/home" className="hover:text-[#5A7A52] transition-colors">Accueil</Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="hover:text-[#5A7A52] cursor-pointer transition-colors">Change & Bain</span>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-gray-900 font-semibold">{product.brand}</span>
        </div>
      </div>

      <div className="w-full px-4 lg:px-8 pt-4 pb-10 lg:pt-6 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-10 items-start">
          
          {/* ── MOBILE ONLY : Titre & Prix ── */}
          <div className="lg:hidden flex flex-col mb-1">
            <div className="flex justify-between items-start mb-1.5">
              <p className="text-[#87A878] font-bold text-xs uppercase tracking-widest">
                {product.brand}
              </p>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className={s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
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
            <div className="lg:sticky lg:top-24 space-y-8">
              
              {/* Panneau Principal d'achat */}
              <div className="bg-white lg:border lg:border-gray-200 lg:rounded-3xl lg:p-8 lg:shadow-xl lg:shadow-gray-100/50">
                
                {/* ── DESKTOP ONLY : Titre & Prix ── */}
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
                        <Star key={s} size={14} className={s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                    <span className="text-sm text-gray-400 underline decoration-gray-300 underline-offset-2 cursor-pointer hover:text-gray-600">
                      ({product.reviews} avis)
                    </span>
                  </div>
                </div>

                {/* Prix (Mobile & Desktop) */}
                <div className="mb-6 lg:mb-8">
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

                <div className="flex items-end gap-3 mb-6">
                  <span className="text-4xl font-black text-gray-900">{product.price.toFixed(2)} €</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through mb-1">{product.originalPrice.toFixed(2)} €</span>
                  )}
                  {product.discount && (
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-md mb-1.5 ml-1">
                      {product.discount}%
                    </span>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Quantité</span>
                    <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                        disabled={qty <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-gray-900 font-bold w-4 text-center">{qty}</span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div ref={cartButtonRef}>
                  <button className="w-full bg-[#5A7A52] hover:bg-[#466040] text-white py-4 rounded-xl font-bold text-sm lg:text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] mb-4">
                    Ajouter au panier
                  </button>
                </div>
                </div>
              </div>

              {/* Encart d'abonnement (Sous le panier) */}
              <div className="bg-[#F0F4EE] border border-[#87A878]/30 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#87A878]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start gap-3 mb-4">
                  <Package size={24} className="text-[#5A7A52] shrink-0" />
                  <div>
                    <h3 className="text-gray-900 font-bold text-lg leading-tight">
                      Ne soyez jamais à court
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Abonnez-vous et économisez 10% sur chaque commande.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <button
                    onClick={() => setPurchaseMode("one-time")}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-colors text-left ${
                      purchaseMode === "one-time"
                        ? "border-gray-900 bg-white"
                        : "border-transparent hover:bg-white/60 text-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        purchaseMode === "one-time" ? "border-gray-900" : "border-gray-300"
                      }`}>
                        {purchaseMode === "one-time" && <div className="w-2 h-2 rounded-full bg-gray-900" />}
                      </div>
                      <span className={`text-sm ${purchaseMode === "one-time" ? "font-bold text-gray-900" : "font-medium"}`}>
                        Achat unique
                      </span>
                    </div>
                    <span className="text-sm font-semibold">{product.price.toFixed(2)} €</span>
                  </button>

                  <button
                    onClick={() => setPurchaseMode("subscription")}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-colors text-left ${
                      purchaseMode === "subscription"
                        ? "border-[#87A878] bg-white shadow-sm"
                        : "border-transparent hover:bg-white/60 text-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        purchaseMode === "subscription" ? "border-[#87A878]" : "border-gray-300"
                      }`}>
                        {purchaseMode === "subscription" && <div className="w-2 h-2 rounded-full bg-[#87A878]" />}
                      </div>
                      <span className={`text-sm ${purchaseMode === "subscription" ? "font-bold text-[#5A7A52]" : "font-medium"}`}>
                        S'abonner (-10%)
                      </span>
                    </div>
                    <span className={`text-sm font-bold text-[#5A7A52]`}>
                      {(product.price * 0.9).toFixed(2)} €
                    </span>
                  </button>
                </div>

                {purchaseMode === "subscription" && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-5">
                    <div className="bg-white rounded-lg px-3 py-2 flex justify-between items-center text-sm border border-gray-100">
                      <span className="text-gray-600 font-medium">Fréquence :</span>
                      <select className="font-bold text-gray-900 bg-transparent outline-none cursor-pointer">
                        <option>Toutes les 3 semaines</option>
                        <option>Tous les mois</option>
                        <option>Toutes les 6 semaines</option>
                      </select>
                    </div>
                  </div>
                )}

                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    purchaseMode === "subscription"
                      ? "bg-[#87A878] hover:bg-[#6A9060] text-white shadow-md"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={purchaseMode !== "subscription"}
                >
                  <RotateCcw size={16} /> Activer mon abonnement
                </button>
                <p className="text-center text-[10px] text-gray-500 mt-3 flex items-center justify-center gap-1">
                  <Shield size={10} /> Sans engagement, modifiable à tout moment.
                </p>
              </div>

              {/* Encart spécifique sous le bouton d'ajout au panier */}
              <ProductPurchaseEncart type={purchaseMode === "subscription" ? "subscription" : "classic"} />

              {/* Réassurance */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2 text-gray-600">
                  <Truck size={18} className="text-[#87A878] shrink-0" />
                  <div className="text-xs">
                    <strong className="block text-gray-900">Livraison 24/48h</strong>
                    Offerte dès 59€
                  </div>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <Undo2 size={18} className="text-[#87A878] shrink-0" />
                  <div className="text-xs">
                    <strong className="block text-gray-900">Retours 30 jours</strong>
                    Simples et gratuits
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── COLONNE GAUCHE (PARTIE 2) : Suite des détails ── */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2 flex flex-col gap-6 lg:gap-10 mt-6 lg:mt-0">
            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info size={20} className="text-[#87A878]" /> Description du produit
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Check size={20} className="text-[#87A878]" /> Caractéristiques
                </h2>
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
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY BOTTOM BAR (Mobile) ── */}
      {isStickyVisible && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/60 px-4 py-3 z-[100] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] animate-in slide-in-from-bottom-2 fade-in duration-200">
          <button className="w-full bg-[#5A7A52] hover:bg-[#466040] text-white py-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-[#5A7A52]/20 active:scale-[0.98] transition-all">
            <Package size={20} />
            Ajouter au panier
          </button>
        </div>
      )}

    </div>
  );
}
