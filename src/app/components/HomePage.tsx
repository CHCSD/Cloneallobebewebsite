import { HeroBanner } from "./HeroBanner";
import { FeaturedProducts } from "./FeaturedProducts";
import { Incontournables } from "./Incontournables";
import { BrandsSection } from "./BrandsSection";
import { Link } from "react-router";
import { Tag, ArrowRight, Star, Flame, BookOpen, Clock, ChevronRight, Stethoscope, Baby, Car, ShieldCheck, Truck, CreditCard, Undo2, Headphones, Mail, Recycle } from "lucide-react";
import { LifeMomentSelector } from "./LifeMomentSelector";

// 8 category pushes — supprimé, remplacé par LifeMomentSelector
const CATEGORIES = [
  { label: "Poussettes",          to: "/poussettes" },
  { label: "Sièges auto",         to: "#" },
  { label: "Chambre & Mobilier",  to: "#" },
  { label: "Matelas",             to: "#" },
  { label: "Literie & Déco",      to: "#" },
  { label: "Éveil & Jouets",      to: "#" },
  { label: "Alimentation",        to: "#" },
  { label: "Bain & Soin",         to: "#" },
];

function CategoryPushes() {
  return (
    <section className="py-5 bg-white border-b border-gray-100">
      <div className="w-full px-2 sm:px-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide justify-start md:justify-center">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              to={cat.to}
              className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm whitespace-nowrap hover:border-[#87A878] hover:text-[#5A7A52] hover:bg-[#F0F4EE] transition-all duration-200"
              style={{ fontWeight: 500 }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Top promo cards (4 vertical cards)
function TopPromoBanners() {
  const cards = [
    {
      titlePart1: "Bébé ne dort pas ?",
      titlePart2: "Nos solutions",
      cta: "Voir la sélection",
      tag: "🌙 Sommeil",
      image: "https://images.unsplash.com/photo-1662368355359-830b331349ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2xlZXAlMjBuaWdodCUyMHRpcmVkJTIwcGFyZW50fGVufDF8fHx8MTc3MjEyMDE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      to: "/conseil/bebe-ne-dort-pas",
    },
    {
      titlePart1: "Diversification :",
      titlePart2: "La DME pas à pas",
      cta: "Voir la sélection",
      tag: "🥕 Repas",
      image: "https://images.unsplash.com/photo-1544829832-c8047d6b9d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwZm9vZCUyMGZpcnN0JTIwbWVhbCUyMHB1ciVDMyVBOWUlMjBzcG9vbnxlbnwxfHx8fDE3NzIxMjAxODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      to: "#",
    },
    {
      titlePart1: "Les sorties",
      titlePart2: "avec bébé",
      cta: "Voir la sélection",
      tag: "🚶 Sortie",
      image: "https://images.unsplash.com/photo-1633379205701-48b324e96a54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBiYWJ5JTIwY2FycmllciUyMG5hdHVyZXxlbnwxfHx8fDE3NzM4NDcwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      to: "#",
    },
    {
      titlePart1: "Découvrez",
      titlePart2: "CYBEX",
      cta: "Voir la sélection",
      tag: "⭐ Premium",
      image: "https://images.unsplash.com/photo-1755379858572-790c899811b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcmVtaXVtJTIwYmFieSUyMHN0cm9sbGVyJTIwdXJiYW4lMjBzbGVlayUyMGJsYWNrfGVufDF8fHx8MTc3MjgwNDE2MHww&ixlib=rb-4.1.0&q=80&w=1080",
      to: "#",
    },
  ];

  return (
    <section className="pt-6 pb-6 bg-white">
      <div className="w-full px-2 sm:px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {cards.map((card) => (
            <Link
              key={card.titlePart1 + card.titlePart2}
              to={card.to}
              className="group bg-white overflow-hidden flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                <img
                  src={card.image}
                  alt={`${card.titlePart1} ${card.titlePart2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {card.tag && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-white/50 text-[#4A6B41] text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-sm">
                      {card.tag}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="pt-4 pb-2 text-center flex flex-col items-center justify-between gap-3 flex-1">
                <h3 className="text-sm sm:text-base lg:text-lg leading-tight">
                  <span className="text-gray-900" style={{ fontWeight: 500 }}>
                    {card.titlePart1}{" "}
                  </span>
                  <span className="text-[#87A878]" style={{ fontWeight: 600 }}>
                    {card.titlePart2}
                  </span>
                </h3>
                
                <div
                  className="px-6 py-2 border border-gray-900 text-gray-900 text-xs sm:text-sm rounded-none hover:bg-gray-900 hover:text-white transition-colors duration-200 mt-auto uppercase tracking-wide"
                  style={{ fontWeight: 600 }}
                >
                  {card.cta}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Guides pratiques
function GuidesPratiques() {
  const mainGuides = [
    {
      title: "Comment bien choisir sa poussette ?",
      category: "Sortie",
      image: "https://images.unsplash.com/photo-1580639724233-04ed592f3ab0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      readTime: "5 min",
      href: "#"
    },
    {
      title: "Tout savoir sur la diversification alimentaire",
      category: "Repas",
      image: "https://images.unsplash.com/photo-1767348822650-06dc92575965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      readTime: "7 min",
      href: "#"
    },
    {
      title: "Le trousseau de naissance idéal : la liste complète",
      category: "Naissance",
      image: "https://images.unsplash.com/photo-1766299893004-b3753686cbbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      readTime: "4 min",
      href: "#"
    },
    {
      title: "Comment aménager la chambre de bébé ?",
      category: "Sommeil",
      image: "https://images.unsplash.com/photo-1770059706518-ece8f7264055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      readTime: "6 min",
      href: "#"
    },
    {
      title: "Les indispensables pour le bain de bébé",
      category: "Soin",
      image: "https://images.unsplash.com/photo-1537673156864-5d2c72de7824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      readTime: "4 min",
      href: "#"
    },
    {
      title: "Guide d'achat : les meilleurs sièges auto",
      category: "Sécurité",
      image: "https://images.unsplash.com/photo-1516309229383-2001fee59b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      readTime: "8 min",
      href: "#"
    }
  ];

  return (
    <section className="py-6 md:py-8 bg-white border-t border-gray-100">
      <div className="w-full px-2 sm:px-4">
        
        {/* En-tête de la section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#87A878]">
              <BookOpen size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Conseils d'experts</span>
            </div>
            <h2 className="text-gray-900 text-2xl font-bold">
              Guides pratiques & Conseils
            </h2>
          </div>
          <Link to="/future-maman" className="flex items-center gap-1.5 text-sm font-semibold text-[#5A7A52] hover:text-[#3f5739] transition-colors group">
            Tous nos articles 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Arborescence (Sidebar) */}
          <div className="w-full lg:w-1/4 flex-shrink-0">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-full">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Thématiques</h3>
              
              <ul className="space-y-6">
                <li>
                  <div className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                    <Stethoscope size={18} className="text-[#87A878]" /> 
                    <span>Grossesse & Maternité</span>
                  </div>
                  <ul className="pl-6 border-l-2 border-gray-200 ml-[9px] space-y-2.5 text-sm">
                    <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Suivi de grossesse <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                    <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Valise de maternité <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                    <li><Link to="/future-maman#liste" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Liste de naissance <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                  </ul>
                </li>

                <li>
                  <div className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                    <Baby size={18} className="text-[#87A878]" /> 
                    <span>Éveil & Développement</span>
                  </div>
                  <ul className="pl-6 border-l-2 border-gray-200 ml-[9px] space-y-2.5 text-sm">
                    <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Guide des tailles <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                    <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Diversification <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                    <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Jouets par âge <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                  </ul>
                </li>

                <li>
                  <div className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                    <ShieldCheck size={18} className="text-[#87A878]" /> 
                    <span>Sécurité & Santé</span>
                  </div>
                  <ul className="pl-6 border-l-2 border-gray-200 ml-[9px] space-y-2.5 text-sm">
                    <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Crash-tests auto <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                    <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Premiers secours <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                    <li><Link to="#" className="text-gray-600 hover:text-[#5A7A52] flex items-center justify-between group">Sommeil sécurisé <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Grille des articles principaux */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mainGuides.map((guide) => (
                <Link 
                  key={guide.title} 
                  to={guide.href}
                  className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                    <img 
                      src={guide.image} 
                      alt={guide.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-[#5A7A52] uppercase tracking-wider">
                      {guide.category}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-gray-900 font-bold text-base mb-3 line-clamp-2 group-hover:text-[#5A7A52] transition-colors">
                      {guide.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                      <Clock size={14} />
                      <span>Lecture : {guide.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact block
function ContactBlock() {
  return (
    <section className="py-6 md:py-8 bg-gray-100 border-t border-gray-200">
      <div className="w-full px-2 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { icon: <Truck size={36} strokeWidth={1.5} />, title: "Livraison gratuite", sub: "dès 59,90€ d'achat" },
            { icon: <CreditCard size={36} strokeWidth={1.5} />, title: "Payer en plusieurs fois", sub: "avec Klarna — dès 35€" },
            { icon: <Undo2 size={36} strokeWidth={1.5} />, title: "Changer d'avis", sub: "satisfait ou remboursé" },
            { icon: <Headphones size={36} strokeWidth={1.5} />, title: "Équipe d'experts", sub: "05 31 53 03 78" },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-2">
              <div className="text-[#87A878] mb-2">{item.icon}</div>
              <div className="text-[#5A7A52] font-bold text-sm">{item.title}</div>
              <div className="text-gray-500 text-xs md:text-sm">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter
function Newsletter() {
  return (
    <section className="py-6 md:py-8 bg-[#F8FAF8] border-t border-gray-100 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full opacity-60 pointer-events-none"></div>
      
      <div className="w-full px-2 sm:px-4 relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white text-[#5A7A52] mb-6 shadow-sm border border-gray-100">
          <Mail size={28} strokeWidth={1.5} />
        </div>
        <h2 className="text-gray-900 mb-3 text-center">
          <span className="text-[#5A7A52] font-black text-2xl md:text-3xl mr-2">10€ offerts</span>
          <span className="text-xl md:text-2xl font-medium">en vous abonnant à notre newsletter !</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base mb-8 text-center max-w-lg">
          Recevez avant tout le monde nos avantages, offres et nouveautés !
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
          <div className="relative flex-1">
            <input
              type="email"
              placeholder="Votre adresse email"
              required
              className="w-full px-5 py-4 rounded-xl text-sm border border-gray-200 bg-white focus:border-[#5A7A52] focus:ring-2 focus:ring-[#5A7A52]/20 outline-none transition-all shadow-sm"
            />
          </div>
          <button 
            type="submit" 
            className="bg-[#5A7A52] hover:bg-[#4a6543] text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all shadow-md whitespace-nowrap"
          >
            Je m'inscris
          </button>
        </form>
      </div>
    </section>
  );
}

// ── Opération saisonnière pleine largeur ──────────────────────
function OperationSaisonniere() {
  return (
    <section className="py-6 md:py-8 bg-white border-t border-gray-100">
      <div className="w-full px-2 sm:px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#87A878]">
              <Flame size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Opération du moment</span>
            </div>
            <h2 className="text-gray-900 text-2xl font-bold">
              Nos sélections de saison
            </h2>
          </div>
          <Link to="#" className="flex items-center gap-1.5 text-sm font-semibold text-[#5A7A52] hover:text-[#3f5739] transition-colors group">
            Tout voir <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: "360px" }}>
          <img
            src="https://images.unsplash.com/photo-1767687029572-61bf21d5faee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"
            alt="Printemps allobébé"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(45,58,42,0.90) 0%, rgba(45,58,42,0.55) 55%, transparent 100%)" }}
          />
          <div className="relative p-8 md:p-14 flex flex-col justify-center h-full max-w-2xl" style={{ minHeight: "360px" }}>
            <span
              className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-white/50 text-[#4A6B41] text-[10px] font-bold px-3 py-1 rounded-full mb-4 w-fit shadow-sm uppercase tracking-[0.1em]"
            >
              🌸 PRINTEMPS ALLOBÉBÉ
            </span>
            <h3 className="text-white mb-4" style={{ fontSize: "2.5rem", fontWeight: 900, lineHeight: 1.1 }}>
              La sélection<br />
              <span style={{ color: "#87A878" }}>de la saison</span>
            </h3>
            <p className="text-gray-200 text-base mb-8 leading-relaxed">
              Découvrez nos coups de cœur printemps-été : poussettes légères, portage et accessoires colorés.
            </p>
            <Link
              to="/poussettes"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold w-fit transition-all duration-300 shadow-lg"
              style={{ backgroundColor: "#87A878", color: "#2D3A2A" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#87A878";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Je découvre <ArrowRight size={16} />
            </Link>
          </div>

          <div className="absolute bottom-6 right-6 md:right-10 flex-col gap-3 hidden md:flex">
            {[
              { label: "−30% sur les poussettes", icon: "🛒" },
              { label: "Nouveautés printemps", icon: "✨" },
              { label: "Livraison offerte", icon: "🚚" },
            ].map((pill) => (
              <div
                key={pill.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs backdrop-blur-sm"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "white", fontWeight: 600 }}
              >
                <span>{pill.icon}</span>
                {pill.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Club Fidélité Ambitieux ──────────────────────
function ClubFidelite() {
  return (
    <section className="py-6 md:py-8 relative overflow-hidden">
      {/* Background avec dégradé subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D3A2A] via-[#3A4A36] to-[#2D3A2A]" />
      
      {/* Motifs décoratifs (cercles) */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full border border-white/5" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 rounded-full border border-[#87A878]/20" />

      <div className="w-full px-2 sm:px-4 relative z-10">
        <div className="w-full">
          
          {/* Header section */}
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-white/50 text-[#4A6B41] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm">
              <Star size={12} fill="currentColor" /> Nouveau programme
            </span>
            <h2 className="text-white text-3xl md:text-5xl font-black mb-4 leading-tight">
              Rejoignez <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#87A878] to-[#C8D9C2]">Le Cercle</span> Allobébé
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Bien plus qu'une simple carte de fidélité. Un accompagnement exclusif pour les parents exigeants, avec des avantages concrets tout au long de la vie de votre enfant.
            </p>
          </div>

          {/* Grid des avantages */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: "🌟",
                title: "Devenez Ambassadeur",
                desc: "Votre voix compte ! Cumulez des points exclusifs en partageant votre expérience @llobébé avec notre communauté."
              },
              {
                icon: "🎁",
                title: "Points fidélité",
                desc: "Avec chaque commande, cumulez des points de fidélité à utiliser sur vos prochains achats."
              },
              {
                icon: "🛍️",
                title: "Shopper VIP",
                desc: "Ligne directe et rendez-vous prioritaires avec nos experts."
              },
              {
                icon: "🧸",
                title: "Tests de produits",
                desc: "Rejoignez notre panel de parents testeurs et découvrez gratuitement les nouveautés en avant-première."
              }
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA & Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/le-cercle"
              className="px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-300 w-full sm:w-auto text-center"
              style={{ backgroundColor: "#87A878", color: "#2D3A2A" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#87A878";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Découvrir les privilèges
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Gain Second-Hand Section ──────────────────────
function GainSecondHandSection() {
  return (
    <section className="py-6 md:py-8 bg-[#F4F7F2] border-y border-[#87A878]/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#87A878]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#87A878]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="w-full px-2 sm:px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Texte et Valeurs */}
          <div className="flex flex-col items-start max-w-xl order-2 md:order-1">
            <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-[#87A878]/30 text-[#4A6B41] px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
              <Recycle size={14} className="text-[#87A878]" /> 
              Seconde Main
            </div>
            
            <h2 className="text-gray-900 text-3xl md:text-4xl font-black mb-5 leading-tight">
              Donnez une seconde vie à vos produits avec <span className="text-[#5A7A52]">@gain</span>
            </h2>
            
            <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
              Bébé grandit trop vite ? Ne laissez plus dormir vos équipements. Revendez-les facilement à la communauté, libérez de la place et récupérez du pouvoir d'achat.
            </p>

            <div className="space-y-4 w-full mb-8">
              {[
                { 
                  icon: "♻️", 
                  title: "Économie circulaire simplifiée", 
                  desc: "Revendez vos produits devenus inutiles en quelques clics depuis votre compte client." 
                },
                { 
                  icon: "💰", 
                  title: "Boostez votre pouvoir d'achat", 
                  desc: "Recevez du cash ou des bons d'achat abondés de +15% valables sur tout le site." 
                },
                { 
                  icon: "🌱", 
                  title: "Un geste pour la planète", 
                  desc: "Participez à une consommation plus responsable et aidez d'autres jeunes parents." 
                }
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-2xl bg-white/60 border border-white/50 shadow-sm backdrop-blur-sm hover:bg-white transition-colors">
                  <div className="text-2xl mt-0.5">{benefit.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{benefit.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-lg shadow-[#87A878]/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: "#5A7A52" }}
            >
              Découvrir @gain <ArrowRight size={16} />
            </Link>
          </div>

          {/* Image illustrant la seconde main */}
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/5] shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxiYWJ5JTIwY2xvdGhlcyUyMGVjb3xlbnwxfHx8fDE3MjU1MzQ3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Seconde main @gain"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Badge flottant sur l'image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E8F0E5] flex items-center justify-center text-[#5A7A52] shrink-0">
                  <Recycle size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Déjà +5000 parents conquis</div>
                  <div className="text-xs text-gray-500">Rejoignez le mouvement de l'occasion garantie !</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <main>
      <HeroBanner />
      <TopPromoBanners />
      <FeaturedProducts />
      <LifeMomentSelector />
      <OperationSaisonniere />
      <Incontournables />
      <BrandsSection />
      <ClubFidelite />
      <GuidesPratiques />
      <ContactBlock />
      <Newsletter />
    </main>
  );
}