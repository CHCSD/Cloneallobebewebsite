import React from "react";
import { Shield, RefreshCw, Truck, CreditCard, Star, Sparkles } from "lucide-react";

interface ProductPurchaseEncartProps {
  type: "classic" | "subscription" | "location";
  className?: string;
}

export function ProductPurchaseEncart({ type, className = "" }: ProductPurchaseEncartProps) {
  if (type === "location") {
    return (
      <div className={`bg-[#F4F7F2] border border-[#87A878]/30 rounded-3xl p-5 relative overflow-hidden ${className}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#5A7A52]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-[#5A7A52] text-white p-1.5 rounded-lg shrink-0 mt-0.5 shadow-sm">
            <RefreshCw size={18} />
          </div>
          <div>
            <h4 className="text-gray-900 font-black text-[15px] leading-tight mb-1">Louez ce produit avec <span className="text-[#5A7A52]">@gain</span></h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Dès 15,90 € / mois. Engagement minimal de 3 mois, sans caution.
            </p>
          </div>
        </div>
        <div className="space-y-3 relative z-10">
          <div className="flex items-start gap-3 text-gray-700">
            <Shield size={16} className="text-[#5A7A52] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-xs font-bold text-gray-900">Assurance incluse</strong>
              <span className="text-[11px] text-gray-600">Couverture contre les petits accidents du quotidien.</span>
            </div>
          </div>
          <div className="w-full h-px bg-[#87A878]/20" />
          <div className="flex items-start gap-3 text-gray-700">
            <RefreshCw size={16} className="text-[#5A7A52] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-xs font-bold text-gray-900">Évolutif</strong>
              <span className="text-[11px] text-gray-600">Renvoyez-le quand bébé grandit et stoppez les paiements.</span>
            </div>
          </div>
          
          <button className="w-full mt-2 bg-white border border-[#87A878]/50 text-[#5A7A52] py-2.5 rounded-xl text-xs font-bold hover:bg-[#E8F0E5] transition-colors shadow-sm">
            Voir les formules de location
          </button>
        </div>
      </div>
    );
  }

  if (type === "subscription") {
    return (
      <div className={`bg-[#F0F4EE] border border-[#87A878]/30 rounded-3xl p-5 relative overflow-hidden ${className}`}>
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#87A878]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3 mb-4">
          <Sparkles size={20} className="text-[#5A7A52] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-gray-900 font-bold text-[15px] leading-tight mb-1">L'esprit tranquille</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Ne soyez jamais à court. Votre abonnement est entièrement modulable selon vos besoins.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-gray-700">
            <RefreshCw size={18} className="text-[#5A7A52] shrink-0" />
            <div>
              <strong className="block text-xs font-bold text-gray-900">100% Flexible</strong>
              <span className="text-[11px] text-gray-600">Modifiez la date, mettez en pause ou annulez en 1 clic.</span>
            </div>
          </div>
          <div className="w-full h-px bg-[#87A878]/20" />
          <div className="flex items-start gap-3 text-gray-700">
            <Star size={18} className="text-[#5A7A52] shrink-0" />
            <div>
              <strong className="block text-xs font-bold text-gray-900">Tarif garanti</strong>
              <span className="text-[11px] text-gray-600">Profitez d'une remise exclusive de -10% à vie sur vos récurrences.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 border border-gray-100 rounded-3xl p-5 relative overflow-hidden ${className}`}>
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gray-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-start gap-3 mb-4">
        <Shield size={20} className="text-gray-700 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-gray-900 font-bold text-[15px] leading-tight mb-1">Achat en toute sérénité</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Nous vous accompagnons de la commande jusqu'à l'utilisation de votre produit.
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-start gap-3 text-gray-700">
          <CreditCard size={18} className="text-gray-500 shrink-0" />
          <div>
            <strong className="block text-xs font-bold text-gray-900">Paiement flexible</strong>
            <span className="text-[11px] text-gray-600">Possibilité de régler en 3x ou 4x sans frais par carte bancaire.</span>
          </div>
        </div>
        <div className="w-full h-px bg-gray-200/60" />
        <div className="flex items-start gap-3 text-gray-700">
          <Truck size={18} className="text-gray-500 shrink-0" />
          <div>
            <strong className="block text-xs font-bold text-gray-900">Retours facilités</strong>
            <span className="text-[11px] text-gray-600">Vous avez changé d'avis ? Retour gratuit sous 30 jours.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
