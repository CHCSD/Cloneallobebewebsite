import { Truck, RotateCcw, CreditCard, Phone, Gift, ShieldCheck } from "lucide-react";

const usps = [
  { icon: Truck,       title: "Livraison offerte",         sub: "dès 59,90 € d'achat" },
  { icon: RotateCcw,   title: "Retour gratuit",            sub: "30 jours pour changer d'avis" },
  { icon: CreditCard,  title: "Paiement en plusieurs fois", sub: "dès 35 € sans frais" },
  { icon: Gift,        title: "Liste de naissance",        sub: "100 % en ligne & gratuite" },
  { icon: Phone,       title: "Conseillers disponibles",   sub: "7j/7 de 9h à 19h" },
  { icon: ShieldCheck, title: "Garantie constructeur",     sub: "sur tous nos produits" },
];

function UspItem({ icon: Icon, title, sub, separator }: { icon: React.ElementType; title: string; sub: string; separator?: boolean }) {
  return (
    <div className="flex items-center shrink-0">
      <div className="flex items-center gap-2.5 px-5 py-2.5">
        <Icon size={15} className="text-[#87A878] shrink-0" />
        <div className="text-left">
          <span className="block text-[12px] text-gray-900" style={{ fontWeight: 700 }}>{title}</span>
          <span className="block text-[11px] text-gray-400 leading-tight">{sub}</span>
        </div>
      </div>
      {separator && <span className="w-px h-6 bg-gray-200 shrink-0" />}
    </div>
  );
}

export function UspsBar() {
  return (
    <div className="w-full bg-white border-b border-gray-100 select-none">
      <div className="hidden lg:flex items-center justify-center w-full px-2 sm:px-4">
        {usps.map((usp, i) => (
          <UspItem key={i} icon={usp.icon} title={usp.title} sub={usp.sub} separator={i < usps.length - 1} />
        ))}
      </div>
      <div className="lg:hidden overflow-x-auto w-full" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <style>{`.usps-scroll-mobile::-webkit-scrollbar { display: none; }`}</style>
        <div className="usps-scroll-mobile flex">
          {usps.map((usp, i) => (
            <UspItem key={i} icon={usp.icon} title={usp.title} sub={usp.sub} separator={i < usps.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
